import {useCallback, useEffect, useState} from 'react';

type Steps =
  | 'loading'
  | 'not-supported'
  | 'start'
  | 'image'
  | 'video'
  | 'video-preview'
  | 'image-preview';

export default function useApp() {
  const [step, setStep] = useState<Steps>('loading');
  const [stream, setStream] = useState<MediaStream>();
  const [mediaUrl, setMediaUrl] = useState<string>();

  const handleStream = useCallback(
    (stream: MediaStream, type: 'image' | 'video') => {
      setStream(stream);
      setStep(type);
    },
    []
  );

  const handleMediaUrl = useCallback((url: string, type: 'image' | 'video') => {
    setMediaUrl(url);
    setStep(`${type}-preview`);
  }, []);

  const retry = useCallback(async (type: 'image-preview' | 'video-preview') => {
    setMediaUrl(undefined);
    setStep('loading');
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: type === 'video-preview',
      video: {
        width: {ideal: 1080},
        height: {ideal: 720},
        facingMode: 'user',
      },
    });
    setStream(stream);
    setStep(type === 'image-preview' ? 'image' : 'video');
  }, []);

  useEffect(() => {
    if (step === 'image-preview' && stream) {
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
    mediaUrl,
    handleMediaUrl,
    retry,
  };
}
