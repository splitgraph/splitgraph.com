import { Box } from "@material-ui/core";

export interface ILogoProps {
  brandmarkURL: string | null;
  wordmarkURL: string | null;
  logoText: string | null;
  brandName: string | null;

  // in the logo we use <a>, so we don't need the next url type
  linkTo?: string;
}

const Logo = ({
  brandmarkURL,
  wordmarkURL,
  logoText,

  // todo
  // brandName,
  linkTo = "/",
}: ILogoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        ".brandmark": {
          height: "32px",
          width: "32px",
          marginRight: "3.5px",
          marginLeft: "1.92px",
          marginTop: "4px",
          marginBottom: "4px",
        },
        ".wordmark-container": {
          flex: "none",
          order: 1,
          flexGrow: 0,
          marginLeft: "3.5px",
          marginRight: "2.92px",
        },
        ".wordmark": {},
      }}
    >
      <a
        className="logo-link logo-link-flex"
        aria-label="home"
        href={linkTo}
        style={{ textDecoration: "inherit" }}
      >
        <img className="brandmark" src={brandmarkURL} alt={logoText} />
        <Box className="wordmark-container">
          <img className="wordmark" src={wordmarkURL} alt={logoText} />
        </Box>
      </a>
    </Box>
  );
};

export default Logo;
