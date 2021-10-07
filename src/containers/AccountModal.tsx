import Modal from "react-modal";
import { useModalContext } from "../context/modal/modalContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { ModalActionType } from "../context/modal/modalReducer";
import { blueTemplate, colors, withOpacity } from "../utils/styled";
import { CloseOutlined, CopyOutlined, LinkOutlined } from "@ant-design/icons";

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
    font-size: 1rem;
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
    font-size: 1.2rem;
    padding: 7px 0;
  }

  & > div:nth-child(3) {
    & a {
      margin-right: 15px;
      color: ${colors.fadedBlue};
    }
  }
`;

const AccountModal = () => {
  const { state, dispatch } = useModalContext();

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={state.isAccountModalOpen}
        contentLabel="Account"
      >
        <>
          <Header>
            <span>Account</span>
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
          </Container>
        </>
      </Modal>
    </>
  );
};

export default AccountModal;
