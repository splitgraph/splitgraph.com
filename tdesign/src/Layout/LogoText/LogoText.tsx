export interface ILogoTextProps {
  text?: string;
}
const logoImageStyle = {
  height: "1.5rem",
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
