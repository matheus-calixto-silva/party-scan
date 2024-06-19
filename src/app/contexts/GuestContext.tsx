import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { IGuest } from '@app/interfaces/IGuest';
import guestsService from '@app/services/guests';

interface IGuestContextProps {
  guests: IGuest[];
  fetchGuests: () => void;
}

const GuestContext = createContext<IGuestContextProps | undefined>(undefined);

export const GuestProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [guests, setGuests] = useState<IGuest[]>([]);

  const formatDate = (date: string) => {
    const [datePart, timePart] = date.split('T');
    const formattedDate = datePart.replace(
      /(\d{4})-(\d{2})-(\d{2})/,
      '$3/$2/$1',
    );
    const formattedTime = timePart.split('Z')[0];
    return `${formattedDate} às ${formattedTime}`;
  };

  const fetchGuests = useCallback(async () => {
    try {
      const response = await guestsService.getAllGuests();
      const formattedResponse = response.map((guest: IGuest) => ({
        ...guest,
        createdAt: formatDate(guest.createdAt),
        authorizedAt: guest.authorizedAt
          ? formatDate(guest.authorizedAt)
          : null,
      }));
      setGuests(formattedResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  const contextValue = useMemo(
    () => ({
      guests,
      fetchGuests,
    }),
    [guests],
  );

  return (
    <GuestContext.Provider value={contextValue}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuests = (): IGuestContextProps => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error('useGuests must be used within a GuestProvider');
  }
  return context;
};
