import Modal from "react-modal";
import { useModalContext } from "../context/modal/modalContext";
import styled from "styled-components";
import { ModalActionType } from "../context/modal/modalReducer";
import {
  blueTemplate,
  colors,
  darkBlueTemplate,
  withOpacity,
} from "../utils/styled";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CloseOutlined,
  CopyOutlined,
  FieldTimeOutlined,
  LinkOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Timeline } from "antd";

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
const Container = styled.div`
  width: 400px;
`;
const Header = styled.h1`
  margin: 0;
  color: ${colors.darkBlue};
  font-weight: 500;
  padding: 0 10px;
  padding-top: 10px;

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
const Padding = styled.div`
  padding: 10px;
`;
const AccountDetail = styled.div`
  border: 1px solid ${withOpacity(blueTemplate, 0.3)};
  border-radius: 16px;
  padding: 15px;

  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;

    & > div:nth-child(1) {
      color: ${colors.fadedBlue};
    }

    & > div:nth-child(2) {
      cursor: pointer;
      color: ${colors.pink};
      border: 1px solid ${colors.fadedPink};
      border-radius: 10px;
      padding: 0 7px;
    }
  }

  & > div:nth-child(2) {
    font-size: 1rem;
    padding: 7px 0;
  }

  & > div:nth-child(3) {
    font-size: 0.8rem;
    & a {
      margin-right: 15px;
      color: ${colors.fadedBlue};
    }
  }
`;
const TransactionHistoryContainer = styled.div`
  background: ${colors.lightBlue};

  & h2 {
    font-size: 0.8rem;
    color: ${colors.darkBlue};
    display: block;
    margin-bottom: 7px;
  }
`;
const Transaction = styled.div`
  cursor: pointer;
  border-radius: 12px;
  background: white;
  border: 1px solid ${withOpacity(blueTemplate, 0.1)};
  padding: 10px;
  margin-top: 5px;

  &:hover {
    border: 1px solid ${withOpacity(blueTemplate, 0.3)};
  }

  & > h3 {
    margin: 0;
    font-size: 0.8rem;
    color: ${colors.darkBlue};

    display: flex;
    justify-content: space-between;
    & > div {
      font-size: 0.65rem;
    }
  }
  & > div {
    font-size: 0.65rem;
    color: ${colors.fadedBlue};
  }
`;
const TimelineContainer = styled.div`
  padding: 15px;
  padding-bottom: 0;
  margin-top: 15px;
`;
const TransactionDetail = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  border-radius: 16px;
  padding: 15px;

  & > h2 {
    margin: 0;
    font-size: 1rem;
  }
  & > div {
    font-size: 0.8rem;
    margin-top: 7px;
    color: ${colors.fadedBlue};
  }
  & > p {
    margin: 0;
    border-top: 1px solid ${withOpacity(blueTemplate, 0.1)};
    margin-top: 15px;
    padding-top: 15px;
  }
`;

const ProcessingStatus = () => (
  <>
    <LoadingOutlined style={{ color: colors.blue, marginRight: 2 }} />{" "}
    <span style={{ color: colors.blue }}>Processing...</span>
  </>
);

const AccountModal = () => {
  const { state, dispatch } = useModalContext();
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={state.isAccountModalOpen}
        contentLabel="Account"
      >
        <>
          <Header>
            {isOpenDetail && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setIsOpenDetail(false)}
              >
                <ArrowLeftOutlined /> Transaction Details
              </span>
            )}
            {!isOpenDetail && <span>Account</span>}
            <span
              onClick={() => {
                dispatch({
                  type: ModalActionType.SET_ACCOUNT_MODAL_STATE,
                  payload: false,
                });
              }}
            >
              <CloseOutlined />
            </span>
          </Header>
          {isOpenDetail && (
            <Container>
              <Padding>
                <TransactionDetail>
                  <h2>Transfer 10.5213 USDT</h2>
                  <div>
                    <span style={{ marginRight: 5 }}>
                      <FieldTimeOutlined /> 10:30, 15 Sep 2021
                    </span>
                    <br />
                    Ethereum Mainnet <ArrowRightOutlined /> Polygon Mainnet
                  </div>
                  <p>
                    <ProcessingStatus />
                  </p>
                </TransactionDetail>
                <TimelineContainer>
                  <Timeline pending="Recording...">
                    <Timeline.Item>
                      Create a services site 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>
                      Solve initial network problems 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                  </Timeline>
                </TimelineContainer>
              </Padding>
            </Container>
          )}
          {!isOpenDetail && (
            <Container>
              <Padding>
                <AccountDetail>
                  <div>
                    <div>Connected with MetaMask</div>
                    <div>Disconnect</div>
                  </div>
                  <div>0x68fc...C1a5</div>
                  <div>
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "0x79A375feFbF90878502eADBA4A89697896B60c4d"
                        );
                      }}
                    >
                      <CopyOutlined /> Copy Address
                    </a>
                    <a
                      target="_blank"
                      href="https://etherscan.io/address/0x79A375feFbF90878502eADBA4A89697896B60c4d"
                    >
                      <LinkOutlined /> View on Explorer
                    </a>
                  </div>
                </AccountDetail>
              </Padding>
              <TransactionHistoryContainer>
                <Padding>
                  <h2>Transaction History</h2>
                  <Transaction onClick={() => setIsOpenDetail(true)}>
                    <h3>
                      <span>Transfer 100.23 USDT</span>
                      <div>
                        <ProcessingStatus />
                      </div>
                    </h3>
                    <div>
                      <span style={{ marginRight: 5 }}>10:30, 15 Sep 2021</span>{" "}
                      Ethereum Mainnet <ArrowRightOutlined /> Polygon Mainnet
                    </div>
                  </Transaction>
                  <Transaction>
                    <h3>
                      <span>Transfer 100.23 USDT</span>
                      <div>
                        <CheckCircleTwoTone twoToneColor={colors.green} />{" "}
                        <span style={{ color: colors.green }}>Transfered</span>
                      </div>
                    </h3>
                    <div>
                      <span style={{ marginRight: 5 }}>10:30, 15 Sep 2021</span>{" "}
                      Ethereum Mainnet <ArrowRightOutlined /> Polygon Mainnet
                    </div>
                  </Transaction>
                  <Transaction>
                    <h3>
                      <span>Transfer 100.23 USDT</span>
                      <div>
                        <CloseCircleTwoTone twoToneColor={colors.pink} />{" "}
                        <span style={{ color: colors.pink }}>Failed</span>
                      </div>
                    </h3>
                    <div>
                      <span style={{ marginRight: 5 }}>10:30, 15 Sep 2021</span>{" "}
                      Ethereum Mainnet <ArrowRightOutlined /> Polygon Mainnet
                    </div>
                  </Transaction>
                </Padding>
              </TransactionHistoryContainer>
            </Container>
          )}
        </>
      </Modal>
    </>
  );
};

export default AccountModal;
