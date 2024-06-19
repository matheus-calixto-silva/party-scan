import { useEffect, useState } from 'react';

import LogoDark from '@views/assets/party-scan-dark.svg';
import LogoWhite from '@views/assets/party-scan-white.svg';

import { useGuests } from '@app/contexts/GuestContext';
import QrReader from './QrReader';
import { ThemeSwitcher } from './ThemeSwitcher';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const Header = () => {
  const [logo, setLogo] = useState(LogoDark);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState('');
  const { fetchGuests } = useGuests(); // Usar o contexto para obter a função fetchGuests
  console.log(scannedResult);

  useEffect(() => {
    const htmlElement = document.documentElement;

    const updateLogo = () => {
      if (htmlElement.classList.contains('light')) {
        setLogo(LogoDark);
      } else {
        setLogo(LogoWhite);
      }
    };

    updateLogo();

    const observer = new MutationObserver(() => {
      updateLogo();
    });

    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleScanSuccess = (result: string) => {
    setScannedResult(result);
    setQrModalOpen(false);
    setConfirmationModalOpen(true);
  };

  return (
    <nav className="flex items-between px-4 border-b p-6 mb-10 justify-between">
      <div className="flex items-center space-x-6">
        <AlertDialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
          <AlertDialogTrigger>
            <button type="button">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      src={logo}
                      alt="Logotipo do App"
                      className="w-10 h-10"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Escanear QR Code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Escaneie o QR Code abaixo</AlertDialogTitle>
              <AlertDialogDescription>
                <QrReader
                  onScanSuccess={handleScanSuccess}
                  fetchGuests={fetchGuests}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={confirmationModalOpen}
          onOpenChange={setConfirmationModalOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Entrada Autorizada</AlertDialogTitle>
              <AlertDialogDescription>
                O QR Code foi escaneado com sucesso!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <button onClick={() => setConfirmationModalOpen(false)}>
                Fechar
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <ThemeSwitcher />
    </nav>
  );
};

export default Header;
