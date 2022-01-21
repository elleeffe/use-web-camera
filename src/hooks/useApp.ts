import {useCallback, useEffect, useState} from 'react';

type Steps = 'loading' | 'not-supported' | 'start' | 'selfie' | 'preview';

export default function useApp() {
  const [step, setStep] = useState<Steps>('loading');
  const [stream, setStream] = useState<MediaStream>();
  const [photoUrl, setPhotoUrl] = useState<string>();

  const handleStream = useCallback(
    (stream: MediaStream) => setStream(stream),
    []
  );

  const handlePhotoUrl = useCallback((photoUrl: string) => {
    setPhotoUrl(photoUrl);
    setStep('preview');
  }, []);

  const retryShooting = useCallback(async () => {
    setPhotoUrl(undefined);
    setStep('loading');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: {ideal: 1080},
        height: {ideal: 720},
        facingMode: 'user',
      },
    });
    console.log({stream});
    setStream(stream);
  }, []);

  useEffect(() => {
    if (stream) {
      setStep('selfie');
    }
  }, [stream]);

  useEffect(() => {
    if (step === 'preview' && stream) {
      stream.getTracks().forEach((item) => item.stop());
      setStream(undefined);
    }
  }, [step, stream]);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setStep('not-supported');
    } else {
      setStep('start');
    }
  }, []);

  return {
    step,
    stream,
    handleStream,
    photoUrl,
    handlePhotoUrl,
    retryShooting,
  };
}
