import styled, { keyframes } from "styled-components";
import { colors } from "../utils/styled";

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
  border-radius: 5px;
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

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>Rosen Bridge</Logo>
      <Menubar>
        <CurrentNetwork>
          <img src="https://polygon.technology/media-kit/matic-token-icon.png" />
          <span>Polygon Mainnet</span>
        </CurrentNetwork>
        <Address>
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
