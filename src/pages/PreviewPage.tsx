import React, {useCallback, useRef} from 'react';

interface PreviewPageProps {
  onRetry: (type: 'video-preview' | 'image-preview') => void;
  mediaUrl: string;
  type: 'video-preview' | 'image-preview';
}

export default function PreviewPage({
  mediaUrl,
  onRetry,
  type,
}: PreviewPageProps) {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = useCallback(() => {
    if (!downloadRef.current) {
      return;
    }
    downloadRef.current.href = mediaUrl;
  }, [downloadRef, mediaUrl]);

  return (
    <>
      <h1 className="text-center is-marginless">
        {type === 'image-preview' ? 'La tua foto' : 'Il tuo video'}
      </h1>
      <div>
        {type === 'image-preview' ? (
          <img src={mediaUrl} alt="Preview" id="preview" />
        ) : (
          <video
            id="preview"
            width="160"
            height="120"
            controls
            muted
            src={mediaUrl}
          />
        )}
      </div>
      <div>
        <a
          className="button primary"
          onClick={handleDownload}
          ref={downloadRef}
          download="your-media"
        >
          Download
        </a>
        <button onClick={() => onRetry(type)}>Riprova</button>
      </div>
    </>
  );
}
