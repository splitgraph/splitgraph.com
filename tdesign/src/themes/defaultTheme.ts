import { createMuiTheme } from "@material-ui/core/styles";
// import { theme } from "./design"; // TODO: when we're ready, the MUI palette should consume from here
import { prismTheme } from "./legacyTheme";

export const defaultTheme = createMuiTheme(); // lets us reference MUI default style values below

export const muiTheme = createMuiTheme({
  palette: {
    // mode: "dark",
    primary: {
      // TODO: this is a core color and affects many, many components' default look.
      // Consider if using the flambeeRed color here instead makes more components look 'right' / Flambee conformant by default
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
    flambeeDarkGray: {
      main: "#2C2D2D",
      light: "#555656",
      dark: "#000202",
    },
    flambeeLightGray: {
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
      light: "rgba(213, 246, 255, .5)",
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
    link: {
      main: "#2a81f6",
      light: "#73b0ff",
      dark: "#0056c2",
    },
    legacySecondary: {
      main: "#89368d",
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;",
    // Default to sans-serif, b/c of all the text styles 2 are serif and the rest sans. List from systemfontstack.com -> sans-serif
    title1: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.33,
    },
    title2: {
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
      // color: defaultTheme.palette.flambeeDarkGray.dark,
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
    flambeeDarkGray?: Palette["primary"];
    flambeeLightGray?: Palette["primary"];
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
    links?: Palette["primary"];
    legacySecondary?: Palette["primary"];
  }
  interface PaletteOptions {
    flambeeDarkGray?: PaletteOptions["primary"];
    flambeeLightGray?: PaletteOptions["primary"];
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
    link?: PaletteOptions["primary"];
    legacySecondary?: PaletteOptions["primary"];
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
      // color: "red",
    },
    code: {
      backgroundColor: "primary.main",
      fontFamily: "monospace",
      fontSize: "inherit",
      span: {
        // color: "red",
      },
      ".comment": {
        color: "#f4c1c0",
      },
    },
  },
};
