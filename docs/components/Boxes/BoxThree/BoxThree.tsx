/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { GenericBox, IGenericBoxProps } from "../GenericBox";

export type IBoxThreeProps = Omit<IGenericBoxProps, "classNames">;

const BoxThree = (props: IBoxThreeProps) => {
  return <GenericBox classNames="box-3" {...props} />;
};

export default BoxThree;
