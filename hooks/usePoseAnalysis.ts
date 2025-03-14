import { useState, useRef, useEffect } from 'react';
import { ExerciseType, estimatePose, analyzePosture, Pose } from '@/lib/posture-utils';

export const usePoseAnalysis = (videoRef: React.RefObject<HTMLVideoElement | null>, isActive: boolean, exerciseType: ExerciseType) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'warning' | 'incorrect'>('correct');
  const [score, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Process frames for pose estimation
  const processFrame = async () => {
    if (!isActive || !videoRef.current || !canvasRef.current) return;
    
    // Get pose
    const pose = await estimatePose(videoRef.current);
    
    // Analyze posture
    if (pose) {
      const result = analyzePosture(pose, exerciseType);
      setScore(result.score);
      
      if (!result.isCorrect) {
        setFeedback(result.mainIssue || result.feedback[0]);
        setFeedbackType(result.score > 70 ? 'warning' : 'incorrect');
      } else {
        setFeedback('Good form!');
        setFeedbackType('correct');
      }
      
      drawPose(pose);
    }
    
    // Continue the loop
    requestAnimationFrame(processFrame);
  };
  
  // Draw the pose on the canvas
  const drawPose = (pose: Pose) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Set canvas dimensions to match video
    if (videoRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
    }
    
    // Draw keypoints
    pose.keypoints.forEach(keypoint => {
      if (keypoint.confidence > 0.5) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = feedbackType === 'correct' ? '#34C759' : 
                      feedbackType === 'warning' ? '#FF9500' : '#FF3B30';
        ctx.fill();
      }
    });
    
    // Draw skeleton (connecting the keypoints)
    const skeleton = [
      // Face
      ['nose', 'leftEye'], ['nose', 'rightEye'],
      ['leftEye', 'leftEar'], ['rightEye', 'rightEar'],
      
      // Upper body
      ['leftShoulder', 'rightShoulder'],
      ['leftShoulder', 'leftElbow'], ['rightShoulder', 'rightElbow'],
      ['leftElbow', 'leftWrist'], ['rightElbow', 'rightWrist'],
      
      // Torso
      ['leftShoulder', 'leftHip'], ['rightShoulder', 'rightHip'],
      ['leftHip', 'rightHip'],
      
      // Lower body
      ['leftHip', 'leftKnee'], ['rightHip', 'rightKnee'],
      ['leftKnee', 'leftAnkle'], ['rightKnee', 'rightAnkle']
    ];
    
    ctx.strokeStyle = feedbackType === 'correct' ? '#34C759' : 
                      feedbackType === 'warning' ? '#FF9500' : '#FF3B30';
    ctx.lineWidth = 2;
    
    skeleton.forEach(([a, b]) => {
      const pointA = pose.keypoints.find(p => p.name === a);
      const pointB = pose.keypoints.find(p => p.name === b);
      
      if (pointA && pointB && pointA.confidence > 0.5 && pointB.confidence > 0.5) {
        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);
        ctx.stroke();
      }
    });
  };
  
  // Start processing frames when active
  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(processFrame);
    }
  }, [isActive, exerciseType]);
  
  return {
    canvasRef,
    feedback,
    feedbackType,
    score
  };
};
