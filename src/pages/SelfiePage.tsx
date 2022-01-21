import React, {useCallback, useEffect, useRef, useState} from 'react';

interface SelfiePageProps {
  stream: MediaStream;
  handlePhotoUrl: (photoUrl: string) => void;
}

export default function SelfiePage({stream, handlePhotoUrl}: SelfiePageProps) {
  const [error, setError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getPhotoUrl = useCallback(async () => {
    if (!(canvasRef.current && videoRef.current)) {
      return;
    }
    setError(false);
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
    handlePhotoUrl(photoUrl);
  }, [canvasRef, videoRef, handlePhotoUrl]);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

  return (
    <div>
      <h1>Scatta un selfie</h1>
      <p>
        In posa, sorridi... Scatta!
        <br />
        Niente paura, puoi provare tutti gli scatti che vuoi prima di mandare
        quello che preferisci.
      </p>
      <div>
        <div>
          <video
            autoPlay
            ref={videoRef}
            playsInline
            controls={false}
            muted
          ></video>
          <button onClick={getPhotoUrl}>Scatta</button>
        </div>
      </div>
      <canvas className="hidden" ref={canvasRef} />
      {error && <p>Ops, qualcosa è andato storto. Per favore, riprova.</p>}
    </div>
  );
}
