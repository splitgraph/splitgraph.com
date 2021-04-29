import { createMuiTheme } from "@material-ui/core/styles";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const defaultTheme = createMuiTheme(); // lets us reference MUI default style values below

// WIP, idea is to somehow combine/merge prismTheme & MUI Theme
export const muiTheme = createMuiTheme({
  palette: {
    // mode: "dark",
    primary: {
      // TODO: this affects <MuiLink>, consider what else?
      main: "#36678d",
    },
    // secondary: {
    //   main: "#89368d",
    // },
    danger: {
      main: "#8D363C",
      contrastText: defaultTheme.palette.getContrastText("#8D363C"),
      // TODO look into more idiomatic MUI way - want hover states also
    },
    // background: {
    //   default: "#e0ffff",
    // },
    errorBackground: {
      main: "rgba(193, 18, 18, 0.5)",
    },
    successBackground: {
      main: "rgba(59, 141, 54, 0.5)",
    },
    success: {
      main: "#3B8D36",
    },
    flambeeBlue: {
      main: "#2A81F6",
      light: "#73B0FF",
      dark: "#0056C2",
    },
    flambeeRed: {
      main: "#F94569",
      light: "#FF7C97",
      dark: "#C0003F",
    },
    flambeeGreen: {
      main: "#53B7A6",
      light: "#87EAD7",
      dark: "#558777",
    },
    flambeeBlack: {
      main: "#2C2D2D",
      light: "#555656",
      dark: "#000202",
    },
    flambeeWhite: {
      main: "#F3F6FF",
      light: "#FFFFFF",
      dark: "#C0C3CC",
    },
    dark2light: {
      main:
        "linear-gradient(180deg, rgba(13,24,33,1) 0%, rgba(54,102,141,1) 100%)",
    },
    lightaccent: {
      main: "#96ccff",
    },
    gray: {
      main: "#dddddf",
    },
    sglightblue: {
      main: "#d5f6fe",
    },
    sgdarkblue: {
      main: "#36678d",
    },
    heavy: {
      main: "#0d1821",
    },
    muted: {
      main: "#f6f6f9",
    },
    light: {
      main: "#ebebeb",
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;",
    // Default to sans-serif, b/c of all the text styles 2 are serif and the rest sans. List from systemfontstack.com -> sans-serif
    title1: {
      fontFamily:
        "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      // via https://systemfontstack.com/
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.33,
    },
    title2: {
      fontFamily:
        "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1,
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.375,
    },
    subtitle2: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body: {
      fontSize: ".875rem",
      lineHeight: 1.71,
      // color: defaultTheme.palette.flambeeBlack.dark,
    },
    bodyHighlighted: {
      fontWeight: 600,
      fontSize: ".875rem",
      lineHeight: 1.429,
    },
    small: {
      fontSize: ".75rem",
      color: "rgb(85, 86, 86)",
      lineHeight: 1.67,
    },
    smallHighlightedSB: {
      fontSize: ".75rem",
      fontWeight: 600,
      lineHeight: 1.67,
    },
    smallHighlightedB: {
      fontSize: ".75rem",
      fontWeight: 600,
      lineHeight: 1.67,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "inherit",
          fontWeight: "bold",
        },
      },
      variants: [
        {
          props: { variant: "pill" },
          style: {
            root: { textTransform: "inherit" },
            padding: "6px 16px",
            border: "3px solid #ccc",
            backgroundColor: defaultTheme.palette.common.white,
            borderRadius:
              Number.parseInt(`${defaultTheme.shape.borderRadius}`, 10) * 50,
            transition: defaultTheme.transitions.create(
              ["background-color", "box-shadow", "border-color", "color"],
              {
                duration: defaultTheme.transitions.duration.short,
              }
            ),
            boxShadow: defaultTheme.shadows[2],
            "&:hover": {
              backgroundColor: defaultTheme.palette.common.white,
              boxShadow: defaultTheme.shadows[4],
            },
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              boxShadow: defaultTheme.shadows[2],
              backgroundColor: defaultTheme.palette.grey[300],
            },
          },
        },
      ],
    },
  },
});
declare module "@material-ui/core/Button" {
  interface ButtonPropsVariantOverrides {
    pill: true;
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    flambeeBlack?: Palette["primary"];
    flambeeWhite?: Palette["primary"];
    flambeeBlue?: Palette["primary"];
    flambeeRed?: Palette["primary"];
    flambeeGreen?: Palette["primary"];
    errorBackground?: Palette["primary"];
    successBackground?: Palette["primary"];
    danger?: Palette["primary"];
    dark2light?: Palette["primary"];
    lightaccent?: Palette["primary"];
    gray?: Palette["primary"];
    sglightblue?: Palette["primary"];
    sgdarkblue?: Palette["primary"];
    heavy?: Palette["primary"];
    muted?: Palette["primary"];
    light?: Palette["primary"];
  }
  interface PaletteOptions {
    flambeeBlack?: PaletteOptions["primary"];
    flambeeWhite?: PaletteOptions["primary"];
    flambeeBlue?: PaletteOptions["primary"];
    flambeeRed?: PaletteOptions["primary"];
    flambeeGreen?: PaletteOptions["primary"];
    errorBackground?: PaletteOptions["primary"];
    successBackground?: PaletteOptions["primary"];
    danger?: PaletteOptions["primary"];
    dark2light?: PaletteOptions["primary"];
    lightaccent?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
    sglightblue?: PaletteOptions["primary"];
    sgdarkblue?: PaletteOptions["primary"];
    heavy?: PaletteOptions["primary"];
    muted?: PaletteOptions["primary"];
    light?: PaletteOptions["primary"];
  }
}

declare module "@material-ui/core/styles" {
  interface TypographyVariants {
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    body: React.CSSProperties;
    bodyHighlighted: React.CSSProperties;
    small: React.CSSProperties;
    smallHighlightedSB: React.CSSProperties;
    smallHighlightedB: React.CSSProperties;
  }

  // allow configuration using `createMuiTheme`
  interface TypographyVariantsOptions {
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
    body?: React.CSSProperties;
    bodyHighlighted?: React.CSSProperties;
    small?: React.CSSProperties;
    smallHighlightedSB?: React.CSSProperties;
    smallHighlightedB?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@material-ui/core/Typography" {
  interface TypographyPropsVariantOverrides {
    title1: true;
    title2: true;
    body: true;
    bodyHighlighted: true;
    small: true;
    smallHighlightedSB: true;
    smallHighlightedB: true;
  }
}

/*
  Use the @rebass/preset theme as a starting point.

  Taken from:
    https://github.com/rebassjs/rebass/blob/master/packages/preset/src/index.js
*/

// import prismTheme from "@theme-ui/prism/presets/shades-of-purple.json";

// const prismTheme = {
//   color: "#9EFEFF",
//   backgroundColor: "#2D2A55",
//   ".changed": { color: "rgb(255, 238, 128)" },
//   ".deleted": { color: "rgba(239, 83, 80, 0.56)" },
//   ".inserted": { color: "rgb(173, 219, 103)" },
//   ".comment": { color: "rgb(179, 98, 255)", fontStyle: "italic" },
//   ".punctuation": { color: "rgb(255, 255, 255)" },
//   ".constant": { color: "rgb(255, 98, 140)" },
//   ".string,.url": { color: "rgb(165, 255, 144)" },
//   ".variable": { color: "rgb(255, 238, 128)" },
//   ".number,.boolean": { color: "rgb(255, 98, 140)" },
//   ".attr-name": { color: "rgb(255, 180, 84)" },
//   ".keyword,.operator,.property,.namespace,.tag,.selector,.doctype": {
//     color: "rgb(255, 157, 0)",
//   },
//   ".builtin,.char,.constant,.function,.class-name": {
//     color: "rgb(250, 208, 0)",
//   },
// };

const prismTheme = {
  color: "#e0ffff",
  backgroundColor: "primary",
  // backgroundColor: "red",
  ".changed,.operator": { color: "#ffd700" },
  ".deleted": { color: "#ffa07a77" },
  ".inserted": { color: "#66cc99" },
  ".comment": { color: "#81cfe0", fontStyle: "italic" },
  ".punctuation": { color: "#e0ffff" },
  ".constant": { color: "#dcc6e0" },
  ".string,.url": { color: "#00ff7f" },
  ".variable": { color: "#36d7b7" },
  ".number,.boolean,.attr-value": { color: "#ffecdb" },
  ".attr-name": { color: "#ffb454" },
  ".keyword,.key,.property,.namespace,.tag,.selector,.doctype": {
    color: "#00ffff",
  },
  ".builtin,.char,.constant,.function,.class-name,.symbol": {
    color: "#ffa07a",
  },
  // Used by shell-session
  ".output": {
    color: "#e0ffff",
  },
  ".important,.language-bash": {
    color: "#ffa07a",
  },
};

export const marketingTheme = {
  styles: {
    pre: {
      ...prismTheme,
      padding: "1ch",
      [defaultTheme.breakpoints.down("sm")]: {},
      fontSize: "0.8rem",
      overflowX: "auto",
      MsOverflowStyle: "none",
      backgroundColor: "primary",
      ".mdx-marker": {
        display: "block",
        borderLeft: `.25em solid ${prismTheme[".punctuation"].color}`,
      },
    },
    inlineCode: {
      ...prismTheme,
      [defaultTheme.breakpoints.up("sm")]: {
        minWidth: "initial",
      },
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: "1rem",
      display: "inline-flex",
      alignContent: "center",
      overflowX: "auto",
      backgroundColor: prismTheme.color,
      color: "red",
    },
    code: {
      backgroundColor: "primary.main",
      fontFamily: "monospace",
      fontSize: "inherit",
      span: {
        color: "red",
      },
      ".comment": {
        color: "#f4c1c0",
      },
    },
  },
};

export const asciinemaEmbedStyles = {
  "div.asciinema-embed-container": {
    marginLeft: -4,
    marginRight: -4,
    // paddingTop: "80vh !important"
    // height: "400px !important"
    // paddingTop: "200px !important",
    // height:
  },
  "iframe.asciinema-embed": {
    "@media (max-width: 768px)": {
      minHeight: "100% !important",
      maxHeight: "100% !important",
      minWidth: "100%",
      // minWidth: "initial !important"
      // minWidth: "100vw !important"
    },
    // border: "none"
  },
};

export const tocStyles = {
  "ol.toc-level": {
    color: "primary",
    listStyleType: "circle",
  },

  ".toc-item": {
    color: "primary",
  },

  ".toc-item a": {
    textDecoration: "none",
  },

  ".toc-item a:hover": {
    textDecoration: "underline",
  },

  ".toc-level": {},

  ".toc-link": {},
};

export const makeDefaultTheme = () => ({
  useCustomProperties: true,
  colors: {
    text: "#000",
    white: "#fff",
    // primary: "#07c",
    primary: "#36678d",
    primaryMonochromatic: "#4482B2",
    primaryHalfOpacity: "rgba(54, 103, 141, .5)",
    // primary: "#000",
    // secondary: "#363C8D",
    secondary: "#89368d",
    heavy: "#0d1821",
    lightaccent: "#96ccff",
    lessHeavy: "#2a2a2a",
    light: "#ebebeb",
    muted: "#f6f6f9",
    gray: "#dddddf",
    // gray: "#ecebf5",
    // gray: "#fff",
    lightgray: "#ccc",
    mutedlightgray: "rgba(204, 204, 204, .5)",
    highlight: "hsla(205, 100%, 40%, 0.125)",
    errorBackground: "rgba(193, 18, 18, 0.5)",
    successBackground: "rgba(59, 141, 54, 0.5)", // same as success, +0.5 opacity
    danger: "#8D363C",
    success: "#3B8D36",
    warning: "orange",
    darkgray: "#3c",
    sgdarkblue: "#36678d",
    sglightblue: "#d5f6fe",
    lightbluefaded: "rgba(213, 246, 255, .5)",
    accent: "secondary",
    // background: "#0d1821",
    background: "#fff",
  },
  backgrounds: {
    divided: {
      background: [
        "linear-gradient(180deg, #f6f6f9 40%, #36678d 40%)",
        "linear-gradient(180deg, #f6f6f9 45%, #36678d 45%)",
        "linear-gradient(180deg, #f6f6f9 55%, #36678d 55%)",
      ],
    },
    dark2light: {
      background:
        "linear-gradient(180deg, rgba(13,24,33,1) 0%, rgba(54,102,141,1) 100%)",
    },
  },
  fonts: {
    body:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 4,
    circle: 99999,
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)", // 4/28/2021: no longer used
    cardHover: "0 0 4px rgba(0, 0, 0, .5)", // 4/28/2021: no longer used
    leftHighlightPrimary: "-5px 0 #36678d", // 4/28/2021: no longer used
    leftHighlightSecondary: "-5px 0 #89368d", // 4/28/2021: wasn't being used anyway, apparently
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    display: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
  },
  variants: {
    paddedContentArea: {
      paddingLeft: ["2rem", "2rem", "10%"],
      paddingRight: ["2rem", "2rem", "10%"],
    },
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle",
    },
    card: {
      p: 2,
      bg: "background",
      boxShadow: "0 0 4px rgba(0, 0, 0, .125)", //formerly card
    },
    basicWhite: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "primary",
      backgroundColor: "white",
      padding: "1rem",
    },
    notice: {
      display: "flex",
      alignItems: "center",
      '[class^="sg-icon-"]': {
        display: "inline-block",
        marginRight: "1em",
      },
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "primary",
      backgroundColor: "lightbluefaded",
      padding: ".5em",
      a: {
        variant: "links.primary",
      },
    },
    errorNotice: {
      variant: "variants.notice",
      backgroundColor: "errorBackground",
      borderColor: "danger",
    },
    errorText: {
      color: "danger",
    },
    nav: {
      fontSize: 1,
      fontWeight: "bold",
      display: "inline-block",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      ":hover,:focus,.active": {
        color: "primary",
      },
    },
  },
  buttons: {
    icon: {
      display: "flex",
      bg: "transparent",
      ":hover": {
        cursor: "pointer",
      },
    },
    primary: {
      fontSize: 2,
      fontWeight: "bold",
      color: "background",
      bg: "primary",
      borderRadius: "default",
      ":hover": {
        cursor: "pointer",
      },
    },
    danger: {
      variant: "buttons.primary",
      backgroundColor: "danger",
    },
    primaryDisabled: {
      variant: "buttons.primary",
      backgroundColor: "primaryHalfOpacity",
    },
    outline: {
      //4/29/2021: this appears to no longer be used
      variant: "buttons.primary",
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
    },
    link: {
      variant: "links.primary",
      bg: "transparent",
    },
    secondary: {
      variant: "buttons.primary",
      color: "background",
      bg: "secondary",
    },
    pill: {
      // variant: "buttons.pill",
      backgroundColor: "muted",
      color: "darkgray",
      fontWeight: "bold",
      borderColor: "lightgray",
      borderWidth: 3,
      borderStyle: "solid",
      borderRadius: 40,
      boxShadow: "0 0 4px rgba(0, 0, 0, .125)", //formerly "card"
      ":hover": {
        cursor: "pointer",
      },
    },
  },
  links: {
    unstyled: {
      color: "inherit",
      textDecoration: "inherit",
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      ":hover": {
        textDecoration: "none",
        border: "none",
      },
    },
    button: {
      variant: "links.unstyled",
      backgroundColor: "primary",
      // backgroundColor: "secondary",
      color: "muted",
      padding: "0.5rem",
      fontWeight: "bold",
      borderRadius: "0.5em",
      transition: "background-color .5s",
      ":hover": {
        cursor: "pointer",
        color: "white",
        border: 0,
        backgroundColor: "#437eab",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "200% 100%",
        transition: "background-size 1s, background-color 1s",
      },
    },
    buttonSecondary: {
      variant: "links.button",
      backgroundColor: "secondary",
      ":hover": {
        backgroundColor: "##c287c5",
      },
    },
    primary: {
      // remove the gray background on active links in IE 10.
      backgroundColor: "transparent",
      cursor: "pointer",
      outline: 0,
      color: "primary",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
      "&[disabled]": {
        cursor: "not-allowed",
        pointerEvents: "none",
      },
    },
    muted: {
      variant: "links.primary",
      color: "muted",
      "&:active, &:hover": {
        color: "muted",
        textDecoration: "underline",
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      // "@media (min-width: 769px)": {
      //   maxWidth: "80ch"
      // },
      ...tocStyles,
      ...asciinemaEmbedStyles,
    },
    pre: {
      ...prismTheme,
      [defaultTheme.breakpoints.down("sm")]: {
        marginLeft: "-4px",
        marginRight: "-4px",
        paddingLeft: "1ch",
        paddingRight: "1ch",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        borderTop: "4px solid #efefef",
        borderBottom: "4px solid #efefef",
      },
      [defaultTheme.breakpoints.up("sm")]: {
        minWidth: "min(80ch, 100%)",
      },
      fontSize: "0.8rem",
      padding: "10px",
      overflowX: "auto",
      backgroundColor: "primary",
      ".mdx-marker": {
        // backgroundColor: "rgba(255,255,255,0.1)",
        display: "block",
        marginLeft: "-1em",
        marginRight: "-1em",
        paddingRight: "1em",
        paddingLeft: "1em",
        borderLeft: `.25em solid ${prismTheme[".punctuation"].color}`,
      },
    } as SxProps<Theme>,
    inlineCode: {
      ...prismTheme,
      [defaultTheme.breakpoints.up("sm")]: {
        minWidth: "initial",
      },
      paddingLeft: "0.5ch",
      paddingRight: "0.5ch",
      paddingTop: "0",
      paddingBottom: "0",
      minHeight: "1rem",
      display: "inline-flex",
      alignContent: "center",
      overflowX: "auto",
      // backgroundColor: "primary",
      wordBreak: "break-all",
      backgroundColor: prismTheme.color,
      color: "red",
    } as SxProps<Theme>,
    code: {
      backgroundColor: "primary",
      fontFamily: "monospace",
      fontSize: "inherit",
      span: {
        color: "red",
      },
      ".comment": {
        color: "#f4c1c0",
      },
    },
    p: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      code: {
        backgroundColor: "primary",
        bg: prismTheme.backgroundColor,
        color: prismTheme.color,
        padding: 1,
      },
    },
  },
});
