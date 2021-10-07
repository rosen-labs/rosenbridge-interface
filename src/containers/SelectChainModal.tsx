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
const SearchInput = styled.input`
  border: 0;
  outline: none;
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 1rem;
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${withOpacity(darkBlueTemplate, 0.1)};
  }

  &:focus {
    background: ${withOpacity(darkBlueTemplate, 0.07)};
  }
`;
const Scrollable = styled.div`
  height: 300px;
  overflow: scroll;
`;
const ChainItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.3s;
  padding: 5px 15px;
  border-radius: 12px;
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  margin-bottom: 7px;

  &:hover {
    background: ${colors.lightBlue};
  }

  & > img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
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
    & span {
      font-size: 0.8rem;
      color: ${colors.fadedBlue};
      display: block;
      font-weight: 400;
      margin-top: -3px;
    }

    &:nth-child(2) {
      color: ${colors.fadedBlue};
      font-size: 1rem;
    }
  }
`;

const SelectChainModal = () => {
  const { state, dispatch } = useModalContext();

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={state.isSelectFromChainModalOpen}
        contentLabel="Select Chain"
      >
        <Header>
          <span>Select Chain</span>
          <span
            onClick={() => {
              dispatch({
                type: ModalActionType.SET_SELECT_FROM_CHAIN_MODAL_STATE,
                payload: false,
              });
            }}
          >
            <CloseOutlined />
          </span>
        </Header>
        <Container>
          <Scrollable>
            <ChainItem>
              <img
                src="https://vee.finance/static/media/ETH.df265e36.svg"
                alt="ETH"
              />
              <div>
                <div>
                  <h5>Ethereum</h5>
                  <span>Ethereum Mainnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem>
              <img
                src="https://vee.finance/static/media/ETH.df265e36.svg"
                alt="ETH"
              />
              <div>
                <div>
                  <h5>Ethereum</h5>
                  <span>Ethereum Mainnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem>
              <img
                src="https://vee.finance/static/media/ETH.df265e36.svg"
                alt="ETH"
              />
              <div>
                <div>
                  <h5>Ethereum</h5>
                  <span>Ethereum Mainnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem>
              <img
                src="https://vee.finance/static/media/ETH.df265e36.svg"
                alt="ETH"
              />
              <div>
                <div>
                  <h5>Ethereum</h5>
                  <span>Ethereum Mainnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem>
              <img
                src="https://vee.finance/static/media/ETH.df265e36.svg"
                alt="ETH"
              />
              <div>
                <div>
                  <h5>Ethereum</h5>
                  <span>Ethereum Mainnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem>
              <img
                src="https://vee.finance/static/media/ETH.df265e36.svg"
                alt="ETH"
              />
              <div>
                <div>
                  <h5>Ethereum</h5>
                  <span>Ethereum Mainnet</span>
                </div>
              </div>
            </ChainItem>
          </Scrollable>
        </Container>
      </Modal>
    </>
  );
};

export default SelectChainModal;
