import {useCallback, useEffect, useRef} from 'react';

interface SelfiePageProps {
  stream: MediaStream;
  handleMediaUrl: (mediaUrl: string, type: 'image' | 'video') => void;
}

export default function SelfiePage({stream, handleMediaUrl}: SelfiePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getPhotoUrl = useCallback(async () => {
    if (!(canvasRef.current && videoRef.current)) {
      return;
    }
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    canvasRef.current
      .getContext('2d')
      ?.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    const photoUrl = canvasRef.current.toDataURL('image/png');
    handleMediaUrl(photoUrl, 'image');
  }, [canvasRef, videoRef, handleMediaUrl]);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

  return (
    <>
      <h1 className="text-center is-marginless">Image</h1>
      <video autoPlay ref={videoRef} playsInline controls={false} muted />
      <button onClick={getPhotoUrl} className="button success">
        Scatta
      </button>
      <canvas className="hidden" ref={canvasRef} />
    </>
  );
}
