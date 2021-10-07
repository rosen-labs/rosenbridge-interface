import React from "react";
import { ModalContextAction, modalContextReducer } from "./modalReducer";

export interface ModalContextState {
  isAddressModalOpen: boolean;
}
const initialState: ModalContextState = {
  isAddressModalOpen: false,
};

interface ModalContextProviderProps {
  children: React.ReactNode;
}
const ModalContext = React.createContext<
  | { state: ModalContextState; dispatch: (action: ModalContextAction) => void }
  | undefined
>(undefined);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [state, dispatch] = React.useReducer(modalContextReducer, initialState);
  const value = { state, dispatch };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider"
    );
  }
  return context;
};
