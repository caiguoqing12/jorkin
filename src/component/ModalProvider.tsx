'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalParams = Record<string, unknown>;
type ModalState = {
  [key: string]: {
    open: boolean;
    params?: ModalParams;
  };
};

type ModalContextType = {
  modals: ModalState;
  openModal: (key: string, params?: ModalParams) => void;
  closeModal: (key: string) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalState>({});

  const openModal = (key: string, params?: ModalParams) => {
    setModals(prev => ({
      ...prev,
      [key]: { open: true, params }
    }));
  };

  const closeModal = (key: string) => {
    setModals(prev => ({
      ...prev,
      [key]: { ...prev[key], open: false }
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModal(key: string) {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  const { modals, openModal, closeModal } = ctx;
  return {
    open: !!modals[key]?.open,
    params: modals[key]?.params,
    openModal: (params?: ModalParams) => openModal(key, params),
    closeModal: () => closeModal(key),
  };
} 