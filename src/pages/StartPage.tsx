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
      <h1>Selfie Time!</h1>
      <p className="text-gray-500 text-lg text-center t mb-8">
        Scatta un selfie ed entra in azione! <br />
        Prima di iniziare ti verranno chiesti i permessi per accedere alla
        fotocamera.
      </p>
      <button className="button" onClick={handlePermission}>
        Richiedi i permessi
      </button>
      {popup && (
        <div className="bg-white px-5 py-10 border-gray-200 max-w-5xl w-full">
          <h3>Permessi obbligatori</h3>
          <p>
            <strong>Hai accidentalmente bloccato i permessi?</strong>
            <br />
            Quando ti è stato chiesto per la prima volta il permesso di accedere
            alla tua fotocamera, potresti aver scelto "Blocca" invece di
            "Consenti" per errore.
          </p>
          <p>
            In questo caso, premi l'icona della fotocamera nella barra degli
            indirizzi del browser per annullare il blocco, quindi premere
            "Riprova". L'icona sembra leggermente diversa sui vari browser, ma
            ecco qui alcuni esempi:
          </p>
        </div>
      )}
    </>
  );
}
