/** @jsxImportSource theme-ui */
// @ts-ignore

export interface ILogoImageProps {
  logoURL?: string;
  rest?: any;
}

const logoImageStyle = {
  minHeight: "2rem",
  height: "2rem",
  maxHeight: "2rem",
  marginLeft: 4,
};

const defaultLogoURL = "/static/splitgraph_logo.svg";

const LogoImage = ({ logoURL = defaultLogoURL, rest }: ILogoImageProps) => {
  return (
    <img src={logoURL} style={logoImageStyle} alt="splitgraph logo" {...rest} />
  );
};

export default LogoImage;
