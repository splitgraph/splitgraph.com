/** @jsxImportSource theme-ui */
// @ts-ignore

export interface ILogoTextProps {
  text?: string;
}
const logoImageStyle = {
  height: "2rem",
  marginLeft: 4,
};

const path = "/static/logo-text.svg";
const TextSVG = ({ logoURL = path, ...rest }) => {
  return (
    <img src={logoURL} style={logoImageStyle} alt="splitgraph logo" {...rest} />
  );
};

const LogoText = ({ text }: ILogoTextProps) => {
  return <span className="logo-text">{text || <TextSVG />}</span>;
};

export default LogoText;
