import React, {useCallback, useRef} from 'react';

interface PreviewPageProps {
  onRetry: () => void;
  photoUrl: string;
}

export default function PreviewPage({photoUrl, onRetry}: PreviewPageProps) {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = useCallback(() => {
    if (!downloadRef.current) {
      return;
    }
    downloadRef.current.href = photoUrl;
  }, [downloadRef, photoUrl]);

  return (
    <>
      <h1 className="text-center is-marginless">Ti piace la foto?</h1>
      <div>
        <img src={photoUrl} alt="Preview" id="preview" />
      </div>
      <div>
        <a
          className="button success"
          onClick={handleDownload}
          ref={downloadRef}
          download="simply-selfie"
        >
          Download
        </a>
        <button onClick={onRetry}>Riprova</button>
      </div>
    </>
  );
}
