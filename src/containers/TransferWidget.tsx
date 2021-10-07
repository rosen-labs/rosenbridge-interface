import { DownOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";
import { PrimaryBlockButton } from "../common/buttons";
import { colors, darkBlueTemplate, withOpacity } from "../utils/styled";

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
  const [isEditRecipient, setIsEditRecipient] = useState(false);

  return (
    <Container>
      <h2>Transfer Token</h2>
      <TokenAmount>
        <div style={{ marginBottom: 5 }}>
          <SelectToken>
            <img src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png" />
            <span>DAI</span>
            <span style={{ marginLeft: 7, fontSize: "0.8rem" }}>
              <DownOutlined />
            </span>
          </SelectToken>
          <div>
            <TokenAmountInput type="number" placeholder="0.0" />
          </div>
        </div>
        <div>
          <div>Balance: 512.2342 USDT</div>
          <div>~ 100.6231$</div>
        </div>
      </TokenAmount>
      <Grid>
        <SelectChain>
          <span>From</span>
          <div>
            <div>
              <img src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png" />{" "}
              Ethereum
            </div>
            <div>
              <RightOutlined />
            </div>
          </div>
        </SelectChain>
        <SelectChain>
          <span>To</span>
          <div>
            <div>
              <img src="https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912" />{" "}
              Polygon
            </div>
            <div>
              <RightOutlined />
            </div>
          </div>
        </SelectChain>
      </Grid>
      <GasPrice>Current Gas Price: 0.001 ETH (~ 10.23$)</GasPrice>
      <TransactionDetails>
        <h3>Tranasction Details</h3>
        <div>
          <div>Estimated Fees</div>
          <div>0.135 ETH (~ 214.56$)</div>
        </div>
        <div>
          <div>Estimated Received</div>
          <div>100.5123 USDT</div>
        </div>
        <div>
          <div>Sender</div>
          <div>0x68fc...C1a5</div>
        </div>
        <div>
          <div>Recipient</div>
          <div>
            {!isEditRecipient && (
              <EditButton
                onClick={() => {
                  setIsEditRecipient(true);
                }}
              >
                <EditOutlined /> Edit
              </EditButton>
            )}
            0x68fc...C1a5
          </div>
        </div>
      </TransactionDetails>
      {isEditRecipient && (
        <RecipientInput>
          <div>Recipient Address</div>
          <input placeholder="0x0000000000000000000000000000000000000000" />
        </RecipientInput>
      )}
      <PrimaryBlockButton>Confirm Transaction</PrimaryBlockButton>
    </Container>
  );
};

export default TransferWidget;
