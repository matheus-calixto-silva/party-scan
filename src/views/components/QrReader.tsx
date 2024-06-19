/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-no-comment-textnodes */
import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';

import guestsService from '@app/services/guests';

interface IQrReaderProps {
  onScanSuccess: (result: string) => void;
  fetchGuests: () => void;
}

const QrReader: React.FC<IQrReaderProps> = ({ onScanSuccess, fetchGuests }) => {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  const updateGuestStatus = async (id: string) => {
    const authorizedAt = new Date().toISOString();
    try {
      await guestsService.updateGuestById(id, {
        status: 'autorizado',
        authorizedAt,
      });
      console.log(
        `Guest ${id} status updated to autorizado at ${authorizedAt}`,
      );
      fetchGuests(); // Chama fetchGuests para atualizar a lista de convidados
    } catch (error) {
      console.error(`Error updating guest ${id} status:`, error);
    }
  };

  const handleScanSuccess = async (result: QrScanner.ScanResult) => {
    if (result.data) {
      await updateGuestStatus(result.data);
      onScanSuccess(result.data);
    }
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, handleScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.',
      );
  }, [qrOn]);

  return (
    <div className="w-4/5 h-96 mx-auto relative">
      <video ref={videoEl} className="w-full h-full object-cover" />
    </div>
  );
};

export default QrReader;
