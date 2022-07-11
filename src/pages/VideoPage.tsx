import React, {useCallback, useEffect, useRef, useState} from 'react';

interface VideoPageProps {
  stream: MediaStream;
  handleMediaUrl: (mediaUrl: string, type: 'image' | 'video') => void;
}

export default function VideoPage({stream, handleMediaUrl}: VideoPageProps) {
  const [recorder, setRecorder] = useState<MediaRecorder>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const startRecording = useCallback(async () => {
    let recorder = new MediaRecorder(stream);
    setRecorder(recorder);
    let data: Blob[] = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event) => reject(event);
    });

    await Promise.all([stopped]).then(() => {
      const recordedBlob = new Blob(data, {type: 'video/webm'});
      handleMediaUrl(URL.createObjectURL(recordedBlob), 'video');
    });
  }, [handleMediaUrl, stream]);

  const stopRecording = useCallback(() => {
    recorder?.stop();
    stream.getTracks().forEach((track) => track.stop());
  }, [recorder, stream]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

  return (
    <>
      <h1 className="text-center is-marginless">Video</h1>
      <video autoPlay ref={videoRef} playsInline controls={false} muted />
      <div className="row">
        <button onClick={startRecording} className="button primary">
          Play
        </button>
        <button onClick={stopRecording} className="button secondary">
          Stop
        </button>
      </div>
    </>
  );
}
