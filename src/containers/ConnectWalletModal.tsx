import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import styled from "styled-components";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { colors, darkBlueTemplate, withOpacity } from "../utils/styled";

const ModalStyle = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 99999,
  },
  content: {
    border: 0,
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "16px",
    marginRight: "calc(-50% + 30px)",
    transform: "translate(-50%, -50%)",
    background: "white",
  },
};
const Header = styled.h1`
  margin: 0;
  color: ${colors.darkBlue};
  font-weight: 500;
  padding: 0 12px;
  padding-top: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & span:nth-child(1) {
    font-size: 0.8rem;
  }
  & span:nth-child(2) {
    font-size: 0rem;
    cursor: pointer;
  }
`;
const Container = styled.div`
  width: 350px;
  padding: 15px;
`;
const WalletItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.3s;
  padding: 10px 15px;
  border-radius: 12px;
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  margin-bottom: 7px;

  &:hover {
    background: ${colors.lightBlue};
  }

  & > img {
    width: 28px;
    height: 28px;
    margin-right: 15px;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    & h5 {
      margin: 0;
      font-weight: normal;
      font-size: 1rem;
      color: ${colors.darkBlue};
    }
  }
`;

const ConnectWalletModal = () => {
  const { state, dispatch } = useModalContext();

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={state.isConnectWalletModalOpen}
        contentLabel="Select Chain"
      >
        <Header>
          <span>Connect to a wallet</span>
          <span
            onClick={() => {
              dispatch({
                type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
                payload: false,
              });
            }}
          >
            <CloseOutlined />
          </span>
        </Header>
        <Container>
          <WalletItem>
            <div>
              <h5>MetaMask</h5>
            </div>
            <img
              src="https://app.uniswap.org/static/media/metamask.02e3ec27.png"
              alt="MetaMask"
            />
          </WalletItem>
          <WalletItem>
            <div>
              <h5>Keplr</h5>
            </div>
            <img src="https://wallet.keplr.app/assets/icon.svg" alt="Keplr" />
          </WalletItem>
          <WalletItem
            style={{ cursor: "not-allowed", background: colors.lightBlue }}
          >
            <div>
              <h5>WalletConnect</h5>
            </div>
            <img
              src="https://app.uniswap.org/static/media/walletConnectIcon.304e3277.svg"
              alt="WalletConnect"
            />
          </WalletItem>
          <WalletItem
            style={{ cursor: "not-allowed", background: colors.lightBlue }}
          >
            <div>
              <h5>Coinbase Wallet</h5>
            </div>
            <img
              src="https://app.uniswap.org/static/media/coinbaseWalletIcon.a3a7d7fd.svg"
              alt="Coinbase Wallet"
            />
          </WalletItem>
        </Container>
      </Modal>
    </>
  );
};

export default ConnectWalletModal;
