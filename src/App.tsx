import React from 'react';
import useApp from './hooks/useApp';
import PreviewPage from './pages/PreviewPage';
import SelfiePage from './pages/SelfiePage';
import StartPage from './pages/StartPage';
import VideoPage from './pages/VideoPage';
import loader from './assets/loader.svg';

export default function App() {
  const {step, stream, handleStream, mediaUrl, handleMediaUrl, retry} =
    useApp();

  return (
    <div className="main-wrapper">
      {step === 'start' && <StartPage handleStream={handleStream} />}
      {step === 'image' && stream && (
        <SelfiePage stream={stream} handleMediaUrl={handleMediaUrl} />
      )}
      {step === 'video' && stream && (
        <VideoPage stream={stream} handleMediaUrl={handleMediaUrl} />
      )}
      {(step === 'video-preview' || step === 'image-preview') && mediaUrl && (
        <PreviewPage mediaUrl={mediaUrl} onRetry={retry} type={step} />
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
