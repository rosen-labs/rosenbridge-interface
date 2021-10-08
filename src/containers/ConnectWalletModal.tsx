import {useState, useEffect} from "react"
import { CloseOutlined } from "@ant-design/icons";
import { SigningStargateClient, coins } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { useWeb3React } from "@web3-react/core"
import Modal from "react-modal";
import styled from "styled-components";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { WalletType } from "../types/wallet";
import { colors, darkBlueTemplate, withOpacity } from "../utils/styled";
import { MsgSendMsgMintRequest } from "../protos/tx";
import useEagerConnect from "../hooks/useEagerConnect";
import useInactiveListener from "../hooks/useInactiveListener";
import {injected} from "../constants/connectors"

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

const COSMOS_CHAIN_ID = "cosmos:ice-chain";
const ConnectWalletModal = () => {
  const modalContext = useModalContext();
  const appContext = useAppContext();
  const { activate, error } = useWeb3React()

  const connectToKepler = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
      // TODO: Display error message to user
      return;
    }

    if (window.keplr.experimentalSuggestChain) {
      try {
        await window.keplr.experimentalSuggestChain({
          chainId: COSMOS_CHAIN_ID,
          chainName: "ICE Chain",
          rpc: "http://0.0.0.0:26657",
          rest: "http://0.0.0.0:1317",
          stakeCurrency: {
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
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
              coinDenom: "ICE",
              coinMinimalDenom: "token",
              coinDecimals: 6,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: "ICE",
              coinMinimalDenom: "token",
              coinDecimals: 6,
            },
          ],
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
          coinType: 118,
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

    console.log(accounts, offlineSigner);

    const registry = new Registry();
    registry.register(
      "/rosenlabs.xchain.xchain.MsgSendMsgMintRequest",
      MsgSendMsgMintRequest
    );
    const options = {
      registry: registry,
      prefix: "xchain",
    };
    const client = await SigningStargateClient.connectWithSigner(
      "http://0.0.0.0:26657",
      offlineSigner,
      options
    );

    const value: MsgSendMsgMintRequest = {
      sender: accounts[0].address,
      port: "bridge",
      channelID: "channel-1",
      timeoutTimestamp: 100,
      reciever: "cosmos184n5ltlkjt3dmwk29cwhxgqkwhlgr7lssyxv3z",
      amount: 123,
      fee: 1,
      tokenId: 0,
      srcChainId: 0,
      destChainId: 1,
    };

    const msg = {
      typeUrl: "/rosenlabs.xchain.xchain.MsgSendMsgMintRequest",
      value,
    };
    const fee = {
      amount: coins(1, "token"),
      gas: "180000",
    };

    const seq = await client.signAndBroadcast(
      accounts[0].address,
      [msg],
      fee,
      "TODO: Change This"
    );
    console.log({ seq });
    // const a = await client.sendTokens(
    //   accounts[0].address,
    //   "cosmos1qqae7949a97krudpg2nq299rlp449z0qc2989e",
    //   coins(10, "token"),
    //   fee
    // );
    // console.log({ a });

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

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>()

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  useEffect(() => {
    if (error && error.name === "UnsupportedChainIdError") {
      //TODO error when not support chain
    }
  }, [error])

  const connectToMetamask = async () => {
    setActivatingConnector(injected)
    activate(injected)
    modalContext.dispatch({
      type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
      payload: false,
    });
  }

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
          <WalletItem onClick={connectToMetamask}>
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
