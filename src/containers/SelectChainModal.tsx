import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import styled from "styled-components";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";
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
const Scrollable = styled.div`
  min-height: 300px;
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
  const modalContext = useModalContext();
  const appContext = useAppContext();

  const closeModal = () => {
    modalContext.dispatch({
      type: ModalActionType.SET_SELECT_FROM_CHAIN_MODAL_STATE,
      payload: false,
    });
    modalContext.dispatch({
      type: ModalActionType.SET_SELECT_TO_CHAIN_MODAL_STATE,
      payload: false,
    });
  };

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={
          modalContext.state.isSelectFromChainModalOpen ||
          modalContext.state.isSelectToChainModalOpen
        }
        contentLabel="Select Chain"
      >
        <Header>
          <span>Select Chain</span>
          <span onClick={closeModal}>
            <CloseOutlined />
          </span>
        </Header>
        <Container>
          <Scrollable>
            <ChainItem
              onClick={() => {
                const payload = {
                  id: "0",
                  icon: "https://i.pinimg.com/originals/eb/7f/9f/eb7f9f8bd8116d1bf489a199402c25fd.png",
                  name: "ICE Chain",
                };

                if (modalContext.state.isSelectFromChainModalOpen) {
                  appContext.dispatch({
                    type: AppActionType.SET_FROM_CHAIN,
                    payload,
                  });
                } else {
                  appContext.dispatch({
                    type: AppActionType.SET_TO_CHAIN,
                    payload,
                  });
                }
                closeModal();
              }}
            >
              <img
                src="https://i.pinimg.com/originals/eb/7f/9f/eb7f9f8bd8116d1bf489a199402c25fd.png"
                alt="ICE Chain"
              />
              <div>
                <div>
                  <h5>ICE Chain</h5>
                  <span>Mocked chain for demonstrating</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem
              onClick={() => {
                const payload = {
                  id: "80001",
                  icon: "https://polygon.technology/media-kit/matic-token-icon.png",
                  name: "Polygon",
                };

                if (modalContext.state.isSelectFromChainModalOpen) {
                  appContext.dispatch({
                    type: AppActionType.SET_FROM_CHAIN,
                    payload,
                  });
                } else {
                  appContext.dispatch({
                    type: AppActionType.SET_TO_CHAIN,
                    payload,
                  });
                }
                closeModal();
              }}
            >
              <img
                src="https://polygon.technology/media-kit/matic-token-icon.png"
                alt="Polygon"
              />
              <div>
                <div>
                  <h5>Polygon</h5>
                  <span>Polygon Testnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem
              onClick={() => {
                const payload = {
                  id: "99999",
                  icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/3945.png",
                  name: "Harmony One",
                };

                if (modalContext.state.isSelectFromChainModalOpen) {
                  appContext.dispatch({
                    type: AppActionType.SET_FROM_CHAIN,
                    payload,
                  });
                } else {
                  appContext.dispatch({
                    type: AppActionType.SET_TO_CHAIN,
                    payload,
                  });
                }
                closeModal();
              }}
            >
              <img
                src="https://s2.coinmarketcap.com/static/img/coins/200x200/3945.png"
                alt="Harmony One"
              />
              <div>
                <div>
                  <h5>Harmony One</h5>
                  <span>Harmony One Testnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem
              style={{ cursor: "not-allowed", background: colors.lightBlue }}
            >
              <img
                src="https://pbs.twimg.com/profile_images/1384182565154611201/XFFjq4v1_400x400.jpg"
                alt="Optimism"
              />
              <div>
                <div>
                  <h5>Optimism</h5>
                  <span>Optimism Ethereum Layer 2 Mainnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem
              style={{ cursor: "not-allowed", background: colors.lightBlue }}
            >
              <img
                src="https://solana.com/branding/new/exchange/exchange-black.png"
                alt="Solana"
              />
              <div>
                <div>
                  <h5>Solana</h5>
                  <span>Solana Mainnet</span>
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
