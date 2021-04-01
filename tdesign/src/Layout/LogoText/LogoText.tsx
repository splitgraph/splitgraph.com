/** @jsxImportSource theme-ui */
// @ts-ignore

export interface ILogoTextProps {
  text?: string;
}

const LogoText = ({ text = "Splitgraph" }: ILogoTextProps) => {
  return <span className="logo-text">{text}</span>;
};

export default LogoText;
