import React from "react";
import { SelectedChain, SelectedToken } from "../../types/transferWidget";
import { WalletInfo } from "../../types/wallet";
import { AppAction, appReducer } from "./appReducer";

export interface AppContextState {
  walletInfo: WalletInfo | null;
  selectedToken: SelectedToken | null;
  selectedFromChain: SelectedChain | null;
  selectedToChain: SelectedChain | null;
}
const initialState: AppContextState = {
  walletInfo: null,
  selectedFromChain: null,
  selectedToChain: null,
  selectedToken: {
    icon: "https://i.pinimg.com/originals/eb/7f/9f/eb7f9f8bd8116d1bf489a199402c25fd.png",
    symbol: "ICE",
  },
};

interface AppContextProviderProps {
  children: React.ReactNode;
}
const AppContext = React.createContext<
  { state: AppContextState; dispatch: (action: AppAction) => void } | undefined
>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationContext must be used within a ApplicationContextProvider"
    );
  }
  return context;
};
