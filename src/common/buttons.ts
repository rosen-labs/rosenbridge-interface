import styled from "styled-components";
import { blueTemplate, colors, withOpacity } from "../utils/styled";

const ButtonStyle = styled.button`
  border: 0;
  color: #ccc;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.25s;
  cursor: pointer;
`;

export const Button = styled(ButtonStyle)`
  color: white;
  background: ${colors.blue};
  border-radius: 7px;
  padding: 3px 12px;

  &:hover {
    background: ${withOpacity(blueTemplate, 0.9)};
  }
`;

export const DisabledButton = styled(ButtonStyle)`
  background: ${colors.lightBlue};
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;
  border-radius: 16px;
`;

export const PrimaryButton = styled(ButtonStyle)`
  background: ${colors.blue};

  &:hover {
    background: ${withOpacity(blueTemplate, 0.9)};
  }
`;
export const PrimaryBlockButton = styled(PrimaryButton)`
  color: white;
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;
  border-radius: 16px;

  & svg {
    transform: scale(1.5);
  }
`;
