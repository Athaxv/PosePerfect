import { useState } from 'react';
import { ExerciseType } from '@/lib/posture-utils';
import { useWebcam } from '@/hooks/useWebcam';
import { usePoseAnalysis } from '@/hooks/usePoseAnalysis';
import WebcamControls from './WebcamControls';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface WebcamViewProps {
  exerciseType: ExerciseType;
}

const WebcamView = ({ exerciseType }: WebcamViewProps) => {
  const [isActive, setIsActive] = useState(false);
  
  // Use custom hooks
  const { videoRef, isCameraReady, error, retry } = useWebcam();
  const { canvasRef, feedback, feedbackType, score } = usePoseAnalysis(videoRef, isActive, exerciseType);
  
  // Toggle webcam analysis
  const toggleAnalysis = () => {
    setIsActive(!isActive);
  };
  
  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-black">
      {/* Camera loading state */}
      {!isCameraReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-sm">Initializing camera...</p>
          </div>
        </div>
      )}
      
      {/* Camera error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center gap-4 max-w-md text-center p-6">
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-white text-lg font-medium">Camera Access Required</h3>
            <p className="text-white/70 text-sm">{error}</p>
            <Button 
              onClick={retry} 
              variant="outline" 
              className="mt-2 bg-white/10 hover:bg-white/20 text-white border-none"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Camera Access
            </Button>
          </div>
        </div>
      )}
      
      {/* Video element (hidden) */}
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        muted 
        className="w-full h-full object-cover"
        style={{ display: 'none' }}
      />
      
      {/* Canvas for pose visualization */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />
      
      {/* Controls overlay */}
      <WebcamControls 
        isActive={isActive}
        onToggle={toggleAnalysis}
        score={score}
        feedbackType={feedbackType}
        feedback={feedback}
      />
    </div>
  );
};

export default WebcamView;
