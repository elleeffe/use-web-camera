import React, {useCallback, useState} from 'react';

interface StartPageProps {
  handleStream: (stream: MediaStream, type: 'image' | 'video') => void;
}

export default function StartPage({handleStream}: StartPageProps) {
  const [popup, setPopup] = useState<boolean>(false);

  const handlePermission = useCallback(
    async (type: 'image' | 'video') => {
      try {
        if (type === 'video') {
          const permission = await window.navigator.permissions.query({
            // @ts-expect-error
            name: 'microphone',
          });

          if (permission.state === 'denied') {
            return setPopup(true);
          }
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: type === 'video',
          video: {
            width: {ideal: 1080},
            height: {ideal: 720},
            facingMode: 'user',
          },
        });
        handleStream(stream, type);
      } catch (e) {
        setPopup(true);
      }
    },
    [handleStream]
  );

  return (
    <>
      <h1 className="text-center is-marginless">Use camera from web</h1>
      <p className="text-center">
        Prima di iniziare, ti verranno chiesti i permessi per accedere alla
        camera.
      </p>
      <div className="row">
        <button
          className="button primary outline"
          onClick={() => handlePermission('image')}
        >
          Image
        </button>
        <button
          className="button primary outline"
          onClick={() => handlePermission('video')}
        >
          Video
        </button>
      </div>
      {popup && (
        <h5 className="text-center text-red text-error">
          Ops, non ho il permesso di accedere alla camera.
          <br />
          Abilita i permessi per poterla utilizzare.
        </h5>
      )}
    </>
  );
}
