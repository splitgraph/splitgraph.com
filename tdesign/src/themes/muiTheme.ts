import { createMuiTheme } from "@material-ui/core/styles";
// import { theme } from "./design"; // TODO: when we're ready, the MUI palette should consume from here

// import type {
//   PaletteColorOptions,
//   PaletteColor,
// } from "@material-ui/core/styles";

// import { theme as coreTheme } from "./design";

import prismTheme from "./prismTheme";

export const defaultTheme = createMuiTheme(); // lets us reference MUI default style values below

const breakpointValues = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  desktop: 1366,
  xl: 1920,
};

export const muiTheme = createMuiTheme({
  breakpoints: {
    values: breakpointValues,
  },
  constants: {
    leftMargin: `max(0px, calc((100vw - ${breakpointValues.desktop}px) / 2))`,
    rightMargin: `max(0px, calc((100vw - ${breakpointValues.desktop}px) / 2))`,
    leftMarginLogoAligned: `max(0px, calc((100vw - ${breakpointValues.desktop}px) / 2 + 22.5px + 40px))`,
    rightMarginNavAligned: `max(0px, calc((100vw - ${breakpointValues.desktop}px) / 2))`,
    brandGradient: `linear-gradient(90deg, rgb(249 69 105 / 100%) 0%, rgb(255 128 153 / 50%) 100%)`,
  },
  palette: {
    contrastThreshold: 3,
    tonalOffset: 0.2,
    // mode: "dark",
    primary: {
      // TODO: this is a core color and affects many, many components' default look.
      // Consider if using the flambeeRed color here instead makes more components look 'right' / Flambee conformant by default
      // main: "#36678d",
      // main: "#F94569",
      main: "#F94569",
      light: "#FF7C97",
      dark: "#C0003F",
      contrastText: defaultTheme.palette.getContrastText("#F94569"),
    },
    surfaces: {
      light: {
        background: { main: "#FFFFFF" },
        sql: { main: "#E3EFFE" },
        error: { main: "#F9EEEF" },
        success: { main: "#DBF9F3" },
        link: { main: "#2A81F6" },
      },
      dark: {
        background: { main: "#000202" }, // should "add primary color at 8%"
        sql: { main: "#27293B" },
        error: { main: "#370D10" },
        success: { main: "#103D34" },
        link: { main: "#2A81F6" },
      },
    },
    textures: {
      onLight: {
        dots: {
          background: "radial-gradient(rgb(85 85 85 / 32%) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        },

        // todo: This should be able to be a texturize callback
        grid: {
          // backgroundColor: "#1e4000",
          // opacity: "0.1",
          background: `linear-gradient(rgb(0 0 0 / 4%) 1px, transparent 1px),
          linear-gradient(to right, rgb(0 0 0 / 4%) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        },
      },
    },
    // texturize:
    navbar: {
      light: {
        /*main: "#FBFCFF",*/
        main: `linear-gradient(0deg, rgba(42, 129, 246, 0.02), rgba(42, 129, 246, 0.02)),#FFFFFF`,
      },
      dark: { main: "#201316" },
    },
    footer: {
      light: { main: "#00224E" },
      dark: { main: "201316" },
    },
    grays: {
      light: {
        gray20: { main: "#000202" },

        gray21: {
          main: "#2C2D2D",

          // experimenting in dev tools - this looks ok?
          dark: `linear-gradient(90deg, rgb(249 69 105 / 8%) 0%, rgb(255 128 153 / 8%) 100%),#2C2D2D`,
        },
        gray22: { main: "#555656" },
        gray23: { main: "#818285" },
        gray24: { main: "#A0A3A9" },
        gray25: { main: "#C0C3CC" },
        gray26: { main: "#E6E7EB" },
        gray27: { main: "#F2F4F6" },
        gray28: { main: "#F9FAFB" },
        gray29: { main: "#FCFCFD" },
      },
      dark: {
        gray20: { main: "#FCFCFD" },
        gray21: {
          main: "#E6E7EB",
          dark: `linear-gradient(90deg, rgb(249 69 105 / 8%) 0%, rgb(255 128 153 / 8%) 100%),#E6E7EB`,
        },
        gray22: { main: "#A0A3A9" },
        gray23: { main: "#818285" },
        gray24: { main: "#555656" },
        gray25: { main: "#292A2A" },
        gray26: { main: "#1C1E1E" },
        gray27: { main: "#141616" },
        gray28: { main: "#0D0F0F" },
        gray29: { main: "#000202" },
        // Gray25-29: should be dynamic "add primary color at 8%"
      },
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
    /*=== prismTheme ===*/
    prismTheme,
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
    },
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
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;",
    // Default to sans-serif, b/c of all the text styles 2 are serif and the rest sans. List from systemfontstack.com -> sans-serif
    title1: {
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: 1.33,
    },
    title2: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1,
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: 1.375,
    },
    subtitle2: {
      fontSize: "14px",
      lineHeight: 1.5,
    },
    body: {
      fontSize: "14px",
      lineHeight: 1.71,
      // color: defaultTheme.palette.flambeeDarkGray.dark,
    },
    bodyHighlighted: {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: 1.429,
    },
    small: {
      fontSize: "12px",
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
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "12px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "link.main",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
          "&:visited": {
            color: "link.main",
          },
          "&:active": {
            color: "link.main",
          },
        },
      },
      defaultProps: {
        color: "link.main",
      },
    },
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
  texturize: (
    base: React.CSSProperties,
    texture: React.CSSProperties
  ): React.CSSProperties => ({
    ...base,
    ...texture,
    background: base.background
      ? `${texture.background},${base.background}`
      : texture.background,
  }),
});

declare module "@material-ui/core/Button" {
  interface ButtonPropsVariantOverrides {
    pill: true;
  }
}

declare module "@material-ui/core/styles/createBreakpoints" {
  // Basically: set a boolean, true for added breakpoints, false for removed
  // https://material-ui.com/customization/breakpoints/#custom-breakpoints
  interface BreakpointOverrides {
    desktop: true;
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface SurfacePalette {
    background: PaletteColor;
    sql: PaletteColor;
    error: PaletteColor;
    success: PaletteColor;
    link: PaletteColor;
  }

  interface TexturePalette {
    dots?: React.CSSProperties;
    grid?: React.CSSProperties;
  }

  interface GrayPalette {
    gray20: PaletteColor;
    gray21: PaletteColor;
    gray22: PaletteColor;
    gray23: PaletteColor;
    gray24: PaletteColor;
    gray25: PaletteColor;
    gray26: PaletteColor;
    gray27: PaletteColor;
    gray28: PaletteColor;
    gray29: PaletteColor;
  }

  interface Palette {
    surfaces?: {
      light?: SurfacePalette;
      dark?: SurfacePalette;
    };

    navbar?: {
      light?: PaletteColor;
      dark?: PaletteColor;
    };

    footer?: {
      light?: PaletteColor;
      dark?: PaletteColor;
    };

    grays?: {
      light?: GrayPalette;
      dark?: GrayPalette;
    };

    textures?: {
      onLight?: TexturePalette;
      onDark?: TexturePalette;
    };

    flambeeDarkGray?: PaletteColor;
    flambeeLightGray?: PaletteColor;
    flambeeBlue?: PaletteColor;
    flambeeRed?: PaletteColor;
    flambeeGreen?: PaletteColor;
    errorBackground?: PaletteColor;
    successBackground?: PaletteColor;
    danger?: PaletteColor;
    dark2light?: PaletteColor;
    lightaccent?: PaletteColor;
    gray?: PaletteColor;
    sglightblue?: PaletteColor;
    sgdarkblue?: PaletteColor;
    heavy?: PaletteColor;
    muted?: PaletteColor;
    light?: PaletteColor;
    link?: PaletteColor;
    legacySecondary?: PaletteColor;
    prismTheme?: { [key: string]: React.CSSProperties | string };
    pre?: { [key: string]: React.CSSProperties | string };
    inlineCode?: { [key: string]: React.CSSProperties | string };
  }
  interface SurfacePaletteOptions {
    background: PaletteColorOptions;
    sql: PaletteColorOptions;
    error: PaletteColorOptions;
    success: PaletteColorOptions;
    link: PaletteColorOptions;
  }

  interface TexturePaletteOptions {
    dots?: React.CSSProperties;
    grid?: React.CSSProperties;
  }

  interface GrayPaletteOptions {
    gray20: PaletteColorOptions;
    gray21: PaletteColorOptions;
    gray22: PaletteColorOptions;
    gray23: PaletteColorOptions;
    gray24: PaletteColorOptions;
    gray25: PaletteColorOptions;
    gray26: PaletteColorOptions;
    gray27: PaletteColorOptions;
    gray28: PaletteColorOptions;
    gray29: PaletteColorOptions;
  }
  interface PaletteOptions {
    surfaces?: {
      light?: SurfacePaletteOptions;
      dark?: SurfacePaletteOptions;
    };

    textures?: {
      onLight?: TexturePaletteOptions;
      onDark?: TexturePaletteOptions;
    };

    navbar?: {
      light?: PaletteColorOptions;
      dark?: PaletteColorOptions;
    };

    footer?: {
      light?: PaletteColorOptions;
      dark?: PaletteColorOptions;
    };

    grays?: {
      light?: GrayPaletteOptions;
      dark?: GrayPaletteOptions;
    };

    flambeeDarkGray?: PaletteColorOptions;
    flambeeLightGray?: PaletteColorOptions;
    flambeeBlue?: PaletteColorOptions;
    flambeeRed?: PaletteColorOptions;
    flambeeGreen?: PaletteColorOptions;
    errorBackground?: PaletteColorOptions;
    successBackground?: PaletteColorOptions;
    danger?: PaletteColorOptions;
    dark2light?: PaletteColorOptions;
    lightaccent?: PaletteColorOptions;
    gray?: PaletteColorOptions;
    sglightblue?: PaletteColorOptions;
    sgdarkblue?: PaletteColorOptions;
    heavy?: PaletteColorOptions;
    muted?: PaletteColorOptions;
    light?: PaletteColorOptions;
    link?: PaletteColorOptions;
    legacySecondary?: PaletteColorOptions;
    prismTheme?: { [key: string]: React.CSSProperties | string };
    pre?: { [key: string]: React.CSSProperties | string };
    inlineCode?: { [key: string]: React.CSSProperties | string };
  }
}
// Docs on module augmentation for customizing the theme
// https://material-ui.com/guides/typescript/#customization-of-theme
declare module "@material-ui/core/styles" {
  interface Theme {
    constants?: { [key: string]: number | string };
    texturize: (
      base: React.CSSProperties,
      texture: React.CSSProperties
    ) => React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    constants?: { [key: string]: number | string };
    texturize: (
      base: React.CSSProperties,
      texture: React.CSSProperties
    ) => React.CSSProperties;
  }
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
