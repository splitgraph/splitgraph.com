import { Box } from "@mui/material";

import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

export interface ILogoProps {
  brandmarkURL: string | null;
  wordmarkURL: string | null;
  logoText: string | null;
  brandName: string | null;
  brandmarkColor?: string | null;

  // in the logo we use <a>, so we don't need the Next.js URL type
  linkTo?: string;

  sx?: SxProps<Theme>;

  scale?:
    | number
    | {
        small?: number;
        desktop?: number;
      };
}

const Logo = ({
  brandmarkURL,
  wordmarkURL,
  logoText,
  // todo
  // brandName,
  brandmarkColor = "#FF8099",
  linkTo = "/",
  scale,
}: ILogoProps) => {
  const theme = useTheme();

  return (
    <Box
      className="logo-container"
      sx={{
        padding: 0,
        a: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        },

        [theme.breakpoints.up("desktop")]: {
          ...(typeof scale === "number"
            ? { transform: `scale(${scale})` }
            : typeof scale !== "undefined" && scale.desktop
            ? { transform: `scale(${scale.desktop})` }
            : {}),
        },
        [theme.breakpoints.down("desktop")]: {
          ...(typeof scale === "number"
            ? { transform: `scale(${scale})` }
            : typeof scale !== "undefined" && scale.small
            ? { transform: `scale(${scale.small})` }
            : {}),
        },
        ".wordmark": {
          width: 100,
        },
        ":hover": {
          cursor: "pointer",
          ".brandmark": {
            cursor: "pointer",
            display: "inherit",
          },
          ".wordmark": {
            backgroundImage: `url("${wordmarkURL}")`,
            backgroundRepeat: "no-repeat",
          },
        },
        ":not(:hover)": {
          ".brandmark": {
            cursor: "pointer",
            display: "flex",
            color: brandmarkColor,
          },
          ".wordmark": {
            backgroundImage: `url("${wordmarkURL}")`,
            backgroundRepeat: "no-repeat",
          },
        },
        ".brandmark-container": {
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
      }}
    >
      <a
        className="logo-link logo-link-flex"
        aria-label="home"
        href={linkTo}
        style={{ textDecoration: "inherit" }}
      >
        <Box className="brandmark-container">
          <img className="brandmark" src={brandmarkURL} alt={logoText} />
        </Box>
        <Box className="wordmark-container">
          <div className="wordmark">&nbsp;</div>
        </Box>
      </a>
    </Box>
  );
};

export default Logo;
