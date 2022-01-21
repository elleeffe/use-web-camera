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
      <h1>Ti piace la foto?</h1>
      <p>
        Se la foto ti piace conferma la tua scelta, altrimenti, prova con un
        nuovo scatto.
      </p>
      <div>
        <img src={photoUrl} alt="Preview" id="preview" />
      </div>
      <div>
        <a onClick={handleDownload} ref={downloadRef} download="simply-selfie">
          Download
        </a>
        <button onClick={onRetry}>Riprova</button>
      </div>
    </>
  );
}
