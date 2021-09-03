import { GenericBox, IGenericBoxProps } from "../GenericBox";

export type IBoxTwoProps = Omit<IGenericBoxProps, "classNames">;

const BoxTwo = (props: IBoxTwoProps) => {
  return <GenericBox classNames="box-2" {...props} />;
};

export default BoxTwo;
