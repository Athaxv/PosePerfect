"use client";
import { useState, useRef, useEffect } from "react";
import { ExerciseType, estimatePose, analyzePosture, Pose } from "@/lib/posture-utils";

interface WebcamViewProps {
  exerciseType: ExerciseType;
}

const WebcamView = ({ exerciseType }: WebcamViewProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"correct" | "warning" | "incorrect">("correct");
  const [score, setScore] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize webcam
  const startWebcam = async () => {
    try {
      console.log("Starting webcam...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 520 },
          facingMode: "user",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
          setIsCameraReady(true);
          console.log("Camera is active");
          adjustCanvasSize();
        };
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setFeedback("Unable to access camera. Please check permissions.");
      setFeedbackType("incorrect");
    }
  };

  // Adjust canvas to match video size dynamically
  const adjustCanvasSize = () => {
    if (videoRef.current && canvasRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
    }
  };

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
        setFeedbackType(result.score > 70 ? "warning" : "incorrect");
      } else {
        setFeedback("Good form!");
        setFeedbackType("correct");
      }

      drawPose(pose);
    }

    // Continue the loop
    requestAnimationFrame(processFrame);
  };

  // Draw the pose on the canvas
  const drawPose = (pose: Pose) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;

    adjustCanvasSize();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    pose.keypoints.forEach((keypoint) => {
      if (keypoint.confidence > 0.5) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle =
          feedbackType === "correct"
            ? "#34C759"
            : feedbackType === "warning"
            ? "#FF9500"
            : "#FF3B30";
        ctx.fill();
      }
    });
  };

  // Toggle webcam analysis
  const toggleAnalysis = () => {
    if (!isActive) {
      setIsActive(true);
      requestAnimationFrame(processFrame);
    } else {
      setIsActive(false);
    }
  };

  // Initialize webcam when component mounts
  useEffect(() => {
    startWebcam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(processFrame);
    }
  }, [isActive, exerciseType]);

  return (
    <div className="relative w-full max-w-screen-lg mx-auto rounded-2xl overflow-hidden shadow-xl bg-black">
      {/* Camera loading state */}
      {!isCameraReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-sm">Initializing camera...</p>
          </div>
        </div>
      )}

      {/* Video element (now responsive) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-auto object-cover opacity-50"
        onLoadedData={adjustCanvasSize}
      />

      {/* Canvas for pose visualization (now responsive) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-auto object-cover" />

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAnalysis}
              className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors ${
                isActive ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isActive ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <rect x="6" y="6" width="12" height="12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
            <div>
              <p className="text-white text-sm font-medium">
                {isActive ? "Analyzing posture..." : "Start analysis"}
              </p>
              <p className="text-white/70 text-xs">{isActive ? "Click to stop" : "Click to begin"}</p>
            </div>
          </div>

          {isActive && (
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-28 bg-white/20 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${feedbackType === "correct" ? "bg-posture-correct" : feedbackType === "warning" ? "bg-posture-warning" : "bg-posture-incorrect"}`} style={{ width: `${score}%` }} />
              </div>
              <span className="text-white text-sm font-medium">{score}%</span>
            </div>
          )}
        </div>

        {isActive && feedback && (
          <div className="mt-3 p-2.5 rounded-lg bg-black/40 backdrop-blur-sm animate-slide-up">
            <p className={`text-sm ${feedbackType === "correct" ? "text-posture-correct" : feedbackType === "warning" ? "text-posture-warning" : "text-posture-incorrect"}`}>{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamView;
