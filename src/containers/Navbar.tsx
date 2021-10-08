import styled, { keyframes } from "styled-components";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { colors } from "../utils/styled";
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { useEffect } from "react";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 25px;
  background: white;
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 9999;

  box-shadow: 0px 4px 70px 0px rgba(0, 0, 0, 0.07);
  -webkit-box-shadow: 0px 4px 70px 0px rgba(0, 0, 0, 0.07);
  -moz-box-shadow: 0px 4px 70px 0px rgba(0, 0, 0, 0.07);
`;

const Logo = styled.h1`
  color: white;
  margin: 0;
  font-weight: 600 !important;
  font-size: 1.2rem;
  color: ${colors.darkBlue};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > span {
    font-size: 1.4rem;
    margin-right: 7px;
  }
`;

const CurrentNetwork = styled.div`
  display: flex;
  align-items: center;

  & img {
    border-radius: 50%;
    width: 22px;
    height: 22px;
    margin-right: 5px;
  }
`;

const blinking = keyframes`
  0% {
    background: #F95738;
  }

  50% {
    background: #ee964b;
  }
  
  100% {
    background: #F95738;
  }
`;
const Address = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid transparent;
  border-radius: 7px;
  padding: 3px 7px;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${colors.lightBlue};
  }

  & > span:nth-child(2) {
    text-align: center;
    background: ${colors.blue};
    color: white;
    width: 22px;
    height: 22px;
    display: inline-block;
    border-radius: 50%;
    animation: ${blinking} 1s linear infinite;
    margin-left: 7px;
  }
`;

const Menubar = styled.div`
  display: flex;
  align-items: center;
`;

declare global {
  interface Window {
    keplr: any;
    getOfflineSigner: any;
  }
}

const Navbar = () => {
  const { dispatch } = useModalContext();

  const suggestCosmosChain = async () => {
    if (window.keplr.experimentalSuggestChain) {
      try {
        // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
        // cosmoshub-3 is integrated to Keplr so the code should return without errors.
        // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
        // If the user approves, the chain will be added to the user's Keplr extension.
        // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
        // If the same chain id is already registered, it will resolve and not require the user interactions.
        await window.keplr.experimentalSuggestChain({
          // Chain-id of the Cosmos SDK chain.
          chainId: "chunzachain",
          // The name of the chain to be displayed to the user.
          chainName: "CHUNZACHAIN",
          // RPC endpoint of the chain.
          rpc: "https://node-cosmoshub-3.keplr.app/rpc",
          // REST endpoint of the chain.
          rest: "https://node-cosmoshub-3.keplr.app/rest",
          // Staking coin information
          stakeCurrency: {
            // Coin denomination to be displayed to the user.
            coinDenom: "ATOM",
            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
            coinMinimalDenom: "uatom",
            // # of decimal points to convert minimal denomination to user-facing denomination.
            coinDecimals: 6,
            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
            // coinGeckoId: ""
          },
          // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
          // The 'stake' button in Keplr extension will link to the webpage.
          // walletUrlForStaking: "",
          // The BIP44 path.
          bip44: {
            // You can only set the coin type of BIP44.
            // 'Purpose' is fixed to 44.
            coinType: 118,
          },
          // Bech32 configuration to show the address to user.
          // This field is the interface of
          // {
          //   bech32PrefixAccAddr: string;
          //   bech32PrefixAccPub: string;
          //   bech32PrefixValAddr: string;
          //   bech32PrefixValPub: string;
          //   bech32PrefixConsAddr: string;
          //   bech32PrefixConsPub: string;
          // }
          bech32Config: {
            bech32PrefixAccAddr: "cosmos",
            bech32PrefixAccPub: "cosmospub",
            bech32PrefixValAddr: "cosmosvaloper",
            bech32PrefixValPub: "cosmosvaloperpub",
            bech32PrefixConsAddr: "cosmosvalcons",
            bech32PrefixConsPub: "cosmosvalconspub",
          },
          // List of all coin/tokens used in this chain.
          currencies: [
            {
              // Coin denomination to be displayed to the user.
              coinDenom: "ATOM",
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: "uatom",
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 6,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
          ],
          // List of coin/tokens used as a fee token in this chain.
          feeCurrencies: [
            {
              // Coin denomination to be displayed to the user.
              coinDenom: "ATOM",
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: "uatom",
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 6,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
          ],
          // (Optional) The number of the coin type.
          // This field is only used to fetch the address from ENS.
          // Ideally, it is recommended to be the same with BIP44 path's coin type.
          // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
          // So, this is separated to support such chains.
          coinType: 118,
          // (Optional) This is used to set the fee of the transaction.
          // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
          // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
          // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
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
  };

  useEffect(() => {
    setTimeout(() => {
      if (!window.getOfflineSigner || !window.keplr) {
        console.log("Keplr wallet not found");
        return;
      }

      suggestCosmosChain();
    }, 1000);
  }, []);

  return (
    <NavbarContainer>
      <Logo>Rosen Bridge</Logo>
      <Menubar>
        <CurrentNetwork>
          <img src="https://polygon.technology/media-kit/matic-token-icon.png" />
          <span>Polygon Mainnet</span>
        </CurrentNetwork>
        <Address
          onClick={() => {
            dispatch({
              type: ModalActionType.SET_ACCOUNT_MODAL_STATE,
              payload: true,
            });
          }}
        >
          <span>0x68fc...C1a5</span>
          <span>
            <div>1</div>
          </span>
        </Address>
      </Menubar>
    </NavbarContainer>
  );
};

export default Navbar;
