import React from "react";
import styled from "@emotion/styled";
import { rem } from "@splitgraph/docs/utils/common";

export interface IButtonProps {
  color?: string;
  size?: "normal" | "small";
  className?: string;
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({
  color = "primary",
  className = "",
  size = "normal",
  onClick,
  children,
  ...props
}: IButtonProps) => {
  return (
    <ButtonContainer
      color={color}
      className={`${className} ${size}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
};

export const ButtonContainer = styled.button`
  font-weight: 600;
  font-size: ${rem(14)};
  line-height: ${rem(24)};
  text-align: center;
  text-transform: capitalize;
  border: 0;
  border-radius: ${rem(32)};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${rem(44)};
  padding: ${rem(10)};
  transition: all 0.35s ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }

  &.small {
    height: ${rem(40)};
  }

  ${(props): any =>
    props.color === "primary" &&
    `
    color: ${props.theme.primary.main};
    background: linear-gradient(267.36deg, ${props.theme.primary.tint} -58.2%, ${props.theme.primary.main} 89.08%);

    &:hover {
      background: linear-gradient(267.36deg, ${props.theme.primary.tint} -58.2%, ${props.theme.primary.shade} 89.08%);
    }
    &:focus {
      background: linear-gradient(267.36deg, ${props.theme.primary.tint} -58.2%, ${props.theme.primary.shade} 89.08%);
    }
  `}
`;

export default Button;
