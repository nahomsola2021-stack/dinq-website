import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface BookingContextType {
  isOpen: boolean;
  selectedTour: string;
  openBooking: (tourTitle?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState('');

  const openBooking = useCallback((tourTitle?: string) => {
    setSelectedTour(tourTitle || '');
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, selectedTour, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
