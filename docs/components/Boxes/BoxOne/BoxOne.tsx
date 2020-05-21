// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { GenericBox, IGenericBoxProps } from "../GenericBox";

export interface IBoxOneProps extends IGenericBoxProps {}

const BoxOne = (props: IBoxOneProps) => {
  return <GenericBox classNames="box-1" {...props} />;
};

export default BoxOne;
