import React, {useCallback, useState} from 'react';

interface StartPageProps {
  handleStream: (stream: MediaStream) => void;
}

export default function StartPage({handleStream}: StartPageProps) {
  const [popup, setPopup] = useState<boolean>(false);

  const handlePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: {ideal: 1080},
          height: {ideal: 720},
          facingMode: 'user',
        },
      });
      handleStream(stream);
    } catch (e) {
      setPopup(true);
    }
  }, [handleStream]);

  return (
    <>
      <h1 className="text-center is-marginless">Simply Selfie</h1>
      <p className="text-center">
        Prima di iniziare, ti verranno chiesti i permessi per accedere alla
        fotocamera.
      </p>
      <button className="button success" onClick={handlePermission}>
        Richiedi i permessi
      </button>
      {popup && (
        <h5 className="text-center text-red text-error">
          Ops, non ho il permesso di accedere alla fotocamera.
          <br />
          Abilita i permessi per poter utilizzare Simply Selfie.
        </h5>
      )}
    </>
  );
}
