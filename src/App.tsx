import React from 'react';
import useApp from './hooks/useApp';
import PreviewPage from './pages/PreviewPage';
import SelfiePage from './pages/SelfiePage';
import StartPage from './pages/StartPage';

export default function App() {
  const {step, stream, handleStream, photoUrl, handlePhotoUrl, retryShooting} =
    useApp();

  if (step === 'start') {
    return <StartPage handleStream={handleStream} />;
  }

  if (step === 'selfie' && stream) {
    return <SelfiePage stream={stream} handlePhotoUrl={handlePhotoUrl} />;
  }

  if (step === 'preview' && photoUrl) {
    return <PreviewPage photoUrl={photoUrl} onRetry={retryShooting} />;
  }

  if (step === 'not-supported') {
    return <h1>Ops, your browser not support camera</h1>;
  }

  return <h1>Loading</h1>;
}
