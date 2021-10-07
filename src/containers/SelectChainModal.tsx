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
                src="https://www.scbtechx.io/wp-content/uploads/2021/07/logo-social.png"
                alt="XYZ Network"
              />
              <div>
                <div>
                  <h5>XYZ Network</h5>
                  <span>Mocked chain for demonstrating</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem>
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
            <ChainItem>
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
