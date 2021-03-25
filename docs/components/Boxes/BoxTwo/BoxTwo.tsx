/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { GenericBox, IGenericBoxProps } from "../GenericBox";

export type IBoxTwoProps = Omit<IGenericBoxProps, "classNames">;

const BoxTwo = (props: IBoxTwoProps) => {
  return <GenericBox classNames="box-2" {...props} />;
};

export default BoxTwo;
