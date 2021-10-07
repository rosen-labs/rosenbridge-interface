import { ModalContextState } from "./modalContext";

export enum ModalActionType {
  SET_ADDRESS_MODAL_STATE = "SET_ADDRESS_MODAL_STATE",
}

export type ModalContextAction = {
  type: ModalActionType.SET_ADDRESS_MODAL_STATE;
  payload: boolean;
};

export const modalContextReducer = (
  state: ModalContextState,
  action: ModalContextAction
): ModalContextState => {
  switch (action.type) {
    case ModalActionType.SET_ADDRESS_MODAL_STATE: {
      return { ...state, isAddressModalOpen: action.payload };
    }
  }
};
