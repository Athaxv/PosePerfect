import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export const useWebcam = () => {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Initialize webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
      
      // Clear any previous errors when the camera starts successfully
      setError(null);
    } catch (err) {
      console.error('Error accessing webcam:', err);
      
      // Handle specific error types
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          const errorMsg = 'Camera access denied. Please allow camera permissions in your browser settings.';
          setError(errorMsg);
          toast.error(errorMsg);
        } else if (err.name === 'NotFoundError') {
          const errorMsg = 'No camera detected. Please connect a camera and try again.';
          setError(errorMsg);
          toast.error(errorMsg);
        } else {
          const errorMsg = `Camera error: ${err.message}`;
          setError(errorMsg);
          toast.error(errorMsg);
        }
      } else {
        const errorMsg = 'An unexpected error occurred while accessing the camera.';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };
  
  // Cleanup function for webcam
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };
  
  // Initialize webcam when hook is used
  useEffect(() => {
    startWebcam();
    
    // Cleanup function
    return () => {
      stopWebcam();
    };
  }, []);
  
  return {
    videoRef,
    isCameraReady,
    error,
    retry: startWebcam
  };
};
