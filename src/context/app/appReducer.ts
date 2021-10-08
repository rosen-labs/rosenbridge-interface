import { WalletInfo } from "../../types/wallet";
import { AppContextState } from "./appContext";

export enum AppActionType {
  SET_WALLET_INFO = "SET_WALLET_INFO",
}

export type AppAction = {
  type: AppActionType.SET_WALLET_INFO;
  payload: WalletInfo | null;
};

export const appReducer = (
  state: AppContextState,
  action: AppAction
): AppContextState => {
  switch (action.type) {
    case AppActionType.SET_WALLET_INFO: {
      return { ...state, walletInfo: action.payload };
    }
  }
  return state;
};
