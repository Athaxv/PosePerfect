import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export const useWebcam = () => {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize webcam
  const startWebcam = async () => {
    try {
      console.log("Requesting webcam access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user", // Front camera for mobile
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
          console.log("Camera feed loaded");
          setIsCameraReady(true);
          adjustCanvasSize(); // Ensure canvas resizes properly
        };
      }

      setError(null);
    } catch (err) {
      console.error("Error accessing webcam:", err);

      if (err instanceof DOMException) {
        let errorMsg = "";
        if (err.name === "NotAllowedError") {
          errorMsg = "Camera access denied. Please allow camera permissions.";
        } else if (err.name === "NotFoundError") {
          errorMsg = "No camera found. Please connect a camera and try again.";
        } else if (err.name === "NotReadableError") {
          errorMsg = "Camera is already in use by another application.";
        } else {
          errorMsg = `Camera error: ${err.message}`;
        }

        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = "An unexpected error occurred while accessing the camera.";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  // Adjust canvas size to match video dimensions
  const adjustCanvasSize = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.getElementById("poseCanvas") as HTMLCanvasElement;
    if (canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
  };

  // Stop webcam
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      console.log("Webcam stopped");
    }
  };

  useEffect(() => {
    startWebcam();

    return () => {
      stopWebcam();
    };
  }, []);

  return {
    videoRef,
    isCameraReady,
    error,
    retry: startWebcam,
  };
};
