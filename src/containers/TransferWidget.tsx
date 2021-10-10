import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { DownOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { DisabledButton, PrimaryBlockButton } from "../common/buttons";
import { colors, darkBlueTemplate, withOpacity } from "../utils/styled";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { useERC20 } from "../hooks/useERC20";
import { ICE } from "../constants/Token";
import { BRIDGE } from "../constants/Contract";
import {
  mapChainNameToChainId,
  formatWalletAddress,
  formatAddress,
} from "../utils/helper";
import BridgeABI from "../constants/abi/Bridge.json";
import { useAppContext } from "../context/app/appContext";
import { WalletType } from "../types/wallet";

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 12px;

  box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.03);
  -webkit-box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.03);

  & > h2 {
    font-size: 1rem;
    margin: 0;
  }
`;
const GasPrice = styled.div`
  margin: 12px;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${colors.darkBlue};
`;
const TransactionDetails = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 16px;
  color: ${colors.darkBlue};

  & > h3 {
    font-size: 0.8rem;
    font-weight: 400;
    padding-bottom: 3px;
    border-bottom: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  }

  & > div {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;

    & > div:nth-child(1) {
      font-weight: 400;
    }
    & > div:nth-child(2) {
      font-weight: 600;
    }
  }
`;
const Grid = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(2, 1fr);
`;
const SelectChain = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  border-radius: 12px;
  color: ${colors.darkBlue};
  padding: 7px 12px;
  cursor: pointer;

  & > span {
    font-weight: 400;
    font-size: 0.8rem;
  }
  & > div {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 7px;

    & > div:nth-child(1) {
      display: flex;
      align-items: center;
    }

    & img {
      width: 22px;
      height: 22px;
      margin-right: 7px;
      border-radius: 50%;
    }
  }
`;
const TokenAmount = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  border-radius: 12px;
  color: ${colors.darkBlue};
  padding: 7px 12px;
  margin: 12px 0;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;

    & div {
      font-weight: 400;
    }
  }
`;
const SelectToken = styled.div`
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 3px 7px;
  border-radius: 5rem;
  transition: 0.25s;

  &:hover {
    background: #f9f9f9;
  }

  & img {
    width: 22px;
    height: 22px;
    margin-right: 5px;
    border-radius: 50%;
  }

  box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.03);
  -webkit-box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.03);
`;
const TokenAmountInput = styled.input`
  border: 0;
  background: transparent;
  text-align: right;
  outline: none;
  font-size: 1.2rem;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const EditButton = styled.div`
  display: inline-block;
  cursor: pointer;
  color: rgb(24, 144, 255);
  margin-right: 7px;
`;
const RecipientInput = styled.div`
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  border-radius: 16px;
  margin-bottom: 12px;
  padding: 7px 12px;

  & > div {
    font-size: 0.8rem;
    font-weight: 400;
  }

  & > input {
    border: 0;
    outline: none;
    text-align: right;
    width: 100%;
    font-size: 1rem;
  }
`;

const TransferWidget = () => {
  const { account, library, chainId }: any = useWeb3React();
  const [isEditRecipient, setIsEditRecipient] = useState(false);
  const [isBridgeApproved, setIsBridgeApproved] = useState(false);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const modalContext = useModalContext();
  const appContext = useAppContext();
  const tokenContract = useERC20(
    chainId ? ICE[chainId] : null,
    account,
    library
  );

  useEffect(() => {
    const { selectedFromChain, selectedToChain } = appContext.state;
    if (
      (selectedFromChain?.name == "Polygon" ||
        selectedFromChain?.name == "Harmony One") &&
      (selectedToChain?.name == "Polygon" ||
        selectedToChain?.name == "Harmony One")
    ) {
      setRecipient(appContext.state.walletInfo?.address);
    } else {
      setRecipient(null);
    }
  }, [appContext.state.selectedFromChain, appContext.state.selectedToChain]);

  useEffect(() => {
    if (!tokenContract || !account) return;
    const getTokenApprove = async () => {
      const allowance = await tokenContract.allowance(
        chainId ? BRIDGE[chainId] : null
      );
      if (parseFloat(allowance) > 0) {
        setIsBridgeApproved(true);
        return;
      }
      setIsBridgeApproved(false);
    };
    getTokenApprove();
  }, [tokenContract, account]);

  const onTokenApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.approve(chainId ? BRIDGE[chainId] : null);
      setLoading(true);
      await tx.wait();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [tokenContract, account]);

  const onSubmitToBridge = useCallback(async () => {
    try {
      const desChainId =
        appContext.state.selectedToChain &&
        mapChainNameToChainId(appContext.state.selectedToChain.name);
      const bridgeContract = new ethers.Contract(
        BRIDGE[chainId],
        BridgeABI,
        library.getSigner()
      );
      const tx = await bridgeContract.sendToChain(
        chainId ? ICE[chainId] : null,
        recipient,
        desChainId,
        ethers.utils.parseEther(tokenAmount?.toString())
      );
      setLoading(true);
      await tx.wait();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [tokenContract, tokenAmount]);

  return (
    <Container>
      <h2>Transfer Token</h2>
      <TokenAmount>
        <div style={{ marginBottom: 5 }}>
          <SelectToken
            onClick={() => {
              if (appContext.state.walletInfo) {
                modalContext.dispatch({
                  type: ModalActionType.SET_SELECT_TOKEN_MODAL_STATE,
                  payload: true,
                });
              }
            }}
          >
            {!appContext.state.selectedToken && (
              <>
                <span>Select a token</span>
              </>
            )}
            {appContext.state.selectedToken && (
              <>
                <img src={appContext.state.selectedToken.icon} />
                <span>{appContext.state.selectedToken.symbol}</span>
              </>
            )}
            <span style={{ marginLeft: 7, fontSize: "0.8rem" }}>
              <DownOutlined />
            </span>
          </SelectToken>
          <div>
            {appContext.state.selectedToken && (
              <TokenAmountInput
                value={tokenAmount}
                onChange={(e) => setTokenAmount(+(e.target.value || 0))}
                type="number"
                placeholder="0.0"
              />
            )}
          </div>
        </div>
        <div>
          <div>
            Balance:{" "}
            {(appContext.state.selectedToken &&
              tokenContract?.balance.toFixed(2)) ||
              0}
          </div>
          <div>
            ~{" "}
            {(appContext.state.selectedToken &&
              tokenContract?.balance.toFixed(2)) ||
              0}
            $
          </div>
        </div>
      </TokenAmount>
      <Grid>
        <SelectChain
          onClick={() => {
            if (appContext.state.walletInfo) {
              modalContext.dispatch({
                type: ModalActionType.SET_SELECT_FROM_CHAIN_MODAL_STATE,
                payload: true,
              });
            }
          }}
        >
          <span>From</span>
          <div>
            {appContext.state.selectedFromChain && (
              <div>
                <img src={appContext.state.selectedFromChain.icon} />{" "}
                {appContext.state.selectedFromChain.name}
              </div>
            )}
            {!appContext.state.selectedFromChain && <div>Select Chain</div>}
            <div>
              <RightOutlined />
            </div>
          </div>
        </SelectChain>
        <SelectChain
          onClick={() => {
            if (appContext.state.walletInfo) {
              modalContext.dispatch({
                type: ModalActionType.SET_SELECT_TO_CHAIN_MODAL_STATE,
                payload: true,
              });
            }
          }}
        >
          <span>To</span>
          <div>
            {appContext.state.selectedToChain && (
              <div>
                <img src={appContext.state.selectedToChain.icon} />{" "}
                {appContext.state.selectedToChain.name}
              </div>
            )}
            {!appContext.state.selectedToChain && <div>Select Chain</div>}
            <div>
              <RightOutlined />
            </div>
          </div>
        </SelectChain>
      </Grid>
      <GasPrice>
        Current Gas Price: 0.001{" "}
        {appContext.state.selectedToChain &&
        appContext.state.selectedToChain.name === "Polygon"
          ? "Matic"
          : "One"}{" "}
        (~ 10.23$)
      </GasPrice>
      <TransactionDetails>
        <h3>Tranasction Details</h3>
        <div>
          <div>Estimated Fees</div>
          <div>0 {tokenContract?.symbol} (~ 0$)</div>
        </div>
        <div>
          <div>Estimated Received</div>
          <div>
            {Number(tokenAmount)} {tokenContract?.symbol}
          </div>
        </div>
        <div>
          <div>Sender</div>
          <div>{formatAddress(appContext.state.walletInfo?.address)}</div>
        </div>
        <div>
          <div>Recipient</div>
          <div>
            {!isEditRecipient && (
              <EditButton
                onClick={() => {
                  if (appContext.state.walletInfo) {
                    setIsEditRecipient(true);
                  }
                }}
              >
                <EditOutlined /> Edit
              </EditButton>
            )}
            {formatAddress(recipient)}
          </div>
        </div>
      </TransactionDetails>
      {isEditRecipient && (
        <RecipientInput>
          <div>Recipient Address</div>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x0000000000000000000000000000000000000000"
          />
        </RecipientInput>
      )}
      {appContext.state.walletInfo && (
        <>
          {!isBridgeApproved ? (
            <>
              {appContext.state.selectedToken && (
                <PrimaryBlockButton onClick={onTokenApprove}>
                  Approve {tokenContract?.symbol} {loading && "..."}
                </PrimaryBlockButton>
              )}
              {!appContext.state.selectedToken && (
                <DisabledButton>Confirm Transaction</DisabledButton>
              )}
            </>
          ) : (
            <>
              {appContext.state.selectedFromChain &&
              appContext.state.selectedToChain &&
              recipient ? (
                <PrimaryBlockButton onClick={onSubmitToBridge}>
                  Confirm Transaction
                </PrimaryBlockButton>
              ) : (
                <DisabledButton>Confirm Transaction</DisabledButton>
              )}
            </>
          )}
        </>
      )}
      {!appContext.state.walletInfo && (
        <PrimaryBlockButton
          onClick={() => {
            modalContext.dispatch({
              type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
              payload: true,
            });
          }}
        >
          Connect to a wallet
        </PrimaryBlockButton>
      )}
    </Container>
  );
};

export default TransferWidget;
