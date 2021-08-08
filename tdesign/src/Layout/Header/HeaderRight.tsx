import * as React from "react";

export interface IHeaderRightProps {
  children?: React.ReactNode;
}

const HeaderRight = ({ children }: IHeaderRightProps) => {
  return <div className="header--right">{children}</div>;
};

export default HeaderRight;
