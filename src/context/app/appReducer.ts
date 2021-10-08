import { AppContextState } from "./appContext";

export enum AppActionType {
  RESET_TOKEN_LIST = "RESET_TOKEN_LIST",
  RESET_PAIR = "RESET_PAIR",
  SWAP_CURRENT_PAIR = "SWAP_CURRENT_PAIR",
  UPDATE_OUT_OF_RANGE_PERCENTAGE = "UPDATE_OUT_OF_RANGE_PERCENTAGE",
  UPDATE_PRICE_RANGE = "UPDATE_PRICE_RANGE",
  UPDATE_DEPOSIT_AMOUNT = "UPDATE_DEPOSIT_AMOUNT",
  UPDATE_PRICE_ASSUMPTION_VALUE = "UPDATE_PRICE_ASSUMPTION_VALUE",
}
export type AppAction =
  | { type: AppActionType.SWAP_CURRENT_PAIR }
  | { type: AppActionType.UPDATE_OUT_OF_RANGE_PERCENTAGE; payload: number }
  | { type: AppActionType.UPDATE_PRICE_ASSUMPTION_VALUE; payload: number }
  | { type: AppActionType.UPDATE_PRICE_RANGE; payload: number[] }
  | { type: AppActionType.UPDATE_DEPOSIT_AMOUNT; payload: number };

export const appReducer = (
  state: AppContextState,
  action: AppAction
): AppContextState => {
  return state;
};
