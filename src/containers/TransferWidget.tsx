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
`;
const TransactionDetails = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 16px;

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

const TransferWidget = () => {
  return (
    <Container>
      <h2>Transfer Token</h2>
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
          <div>Recipient</div>
          <div>0x68fc...C1a5</div>
        </div>
      </TransactionDetails>
      <PrimaryBlockButton>Confirm Transaction</PrimaryBlockButton>
    </Container>
  );
};

export default TransferWidget;
