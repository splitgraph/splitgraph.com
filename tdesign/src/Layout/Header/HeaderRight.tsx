import * as React from "react";

import HamburgerContainer from "./HamburgerContainer";
export interface IHeaderRightProps {
  children?: React.ReactNode;
}

const HeaderRight = ({ children }: IHeaderRightProps) => {
  return (
    <HamburgerContainer className="header--right">
      {children}
    </HamburgerContainer>
  );
};

export default HeaderRight;
