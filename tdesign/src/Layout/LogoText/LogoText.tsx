/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

export interface ILogoTextProps {
  text?: string;
}

const LogoText = ({ text = "Splitgraph" }: ILogoTextProps) => {
  return <span className="logo-text">{text}</span>;
};

export default LogoText;
