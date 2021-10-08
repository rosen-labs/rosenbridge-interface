import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import styled from "styled-components";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { WalletType } from "../types/wallet";
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

declare global {
  interface Window {
    keplr: any;
    getOfflineSigner: any;
  }
}

const COSMOS_CHAIN_ID = "testza";
const ConnectWalletModal = () => {
  const modalContext = useModalContext();
  const appContext = useAppContext();

  const connectToKepler = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
      // TODO: Display error message to user
      return;
    }

    if (window.keplr.experimentalSuggestChain) {
      try {
        await window.keplr.experimentalSuggestChain({
          chainId: COSMOS_CHAIN_ID,
          chainName: "testza",
          rpc: "https://node-cosmoshub-3.keplr.app/rpc",
          rest: "https://node-cosmoshub-3.keplr.app/rest",
          stakeCurrency: {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
          },
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: "cosmos",
            bech32PrefixAccPub: "cosmospub",
            bech32PrefixValAddr: "cosmosvaloper",
            bech32PrefixValPub: "cosmosvaloperpub",
            bech32PrefixConsAddr: "cosmosvalcons",
            bech32PrefixConsPub: "cosmosvalconspub",
          },
          currencies: [
            {
              coinDenom: "ATOM",
              coinMinimalDenom: "uatom",
              coinDecimals: 6,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: "ATOM",
              coinMinimalDenom: "uatom",
              coinDecimals: 6,
            },
          ],
          coinType: 118,
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
        });
      } catch (e) {
        console.error("Failed to suggest the chain", e);
      }
    } else {
      console.error("Please use the recent version of keplr extension");
    }

    // enable user wallet
    await window.keplr.enable(COSMOS_CHAIN_ID);
    const offlineSigner = window.getOfflineSigner(COSMOS_CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();

    if (accounts.length > 0) {
      const account = accounts[0];

      appContext.dispatch({
        type: AppActionType.SET_WALLET_INFO,
        payload: {
          address: account.address,
          type: WalletType.KEPLR,
        },
      });
      modalContext.dispatch({
        type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
        payload: false,
      });
    }
  };

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={modalContext.state.isConnectWalletModalOpen}
        contentLabel="Select Chain"
      >
        <Header>
          <span>Connect to a wallet</span>
          <span
            onClick={() => {
              modalContext.dispatch({
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
          <WalletItem onClick={connectToKepler}>
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
