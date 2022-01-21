import React from 'react';
import useApp from './hooks/useApp';
import PreviewPage from './pages/PreviewPage';
import SelfiePage from './pages/SelfiePage';
import StartPage from './pages/StartPage';
import loader from './assets/loader.svg';

export default function App() {
  const {step, stream, handleStream, photoUrl, handlePhotoUrl, retryShooting} =
    useApp();

  return (
    <div className="main-wrapper">
      {step === 'start' && <StartPage handleStream={handleStream} />}
      {step === 'selfie' && stream && (
        <SelfiePage stream={stream} handlePhotoUrl={handlePhotoUrl} />
      )}
      {step === 'preview' && photoUrl && (
        <PreviewPage photoUrl={photoUrl} onRetry={retryShooting} />
      )}
      {step === 'not-supported' && (
        <h1 className="text-error text-center is-marginless">
          Ops, your browser not support camera
        </h1>
      )}
      {step === 'loading' && (
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
      )}
    </div>
  );
}
