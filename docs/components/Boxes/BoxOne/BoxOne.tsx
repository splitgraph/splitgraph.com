/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { GenericBox, IGenericBoxProps } from "../GenericBox";

export type IBoxOneProps = Omit<IGenericBoxProps, "classNames">;

const BoxOne = (props: IBoxOneProps) => {
  return <GenericBox classNames="box-1" {...props} />;
};

export default BoxOne;
