import { Box } from "@material-ui/core";

import type { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles/createMuiTheme";
import { useTheme } from "@material-ui/core/styles";

import { keyframes } from "@material-ui/styled-engine";

export interface ILogoProps {
  brandmarkURL: string | null;
  onHoverBrandmarkURL: string | null;
  animateWordmarkOnHover?: boolean;
  wordmarkURL: string | null;
  logoText: string | null;
  brandName: string | null;

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

// const onHoverBrandmarkURL = `/catalog-static/static/brandmark_animated.svg`;

const Logo = ({
  brandmarkURL,
  wordmarkURL,
  onHoverBrandmarkURL,
  animateWordmarkOnHover = true,
  logoText,
  // todo
  // brandName,
  linkTo = "/",
  scale,
}: ILogoProps) => {
  const theme = useTheme();

  const shimmer = keyframes`
      0% {
        filter: none;
      }

      25% {
        filter: blur(10px) drop-shadow(1px 1px 1px rgba(255, 255, 255, .5)) contrast(250%);
      }

      75% {
          filter: none;
      }
  `;

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
          ".brandmark-animated": {
            cursor: "pointer",
          },
          ".brandmark": {
            cursor: "pointer",
            display: "none",
          },
          ".wordmark": {
            ...(animateWordmarkOnHover
              ? {
                  animation: `${shimmer} 2s ease-in-out infinite alternate`,
                  backgroundImage: `linear-gradient(90deg, rgb(249 69 105 / 100%) 0%, rgb(255 128 153 / 50%) 100%),url("${wordmarkURL}")`,
                  WebkitMaskImage: `url("${wordmarkURL}")`,
                  maskImage: `url("${wordmarkURL}")`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  backgroundRepeat: "no-repeat",
                }
              : {
                  backgroundImage: `url("${wordmarkURL}")`,
                  backgroundRepeat: "no-repeat",
                }),
          },
        },
        ":not(:hover)": {
          ".brandmark-animated": {
            cursor: "pointer",
            display: "none",
          },
          ".brandmark": {
            cursor: "pointer",
            display: "flex",
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
          <img className="brandmark-animated" src={onHoverBrandmarkURL} />
        </Box>
        <Box className="wordmark-container">
          <div className="wordmark">&nbsp;</div>
        </Box>
      </a>
    </Box>
  );
};

export default Logo;
