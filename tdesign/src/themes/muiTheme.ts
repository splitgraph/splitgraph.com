import { createMuiTheme } from "@material-ui/core/styles";
import prismTheme from "./prismTheme";

const breakpointValues = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  desktop: 1366,
  xl: 1920,
};

export const muiTheme = ({
  userPrimaryColor,
  userNavbarLight,
  userNavbarDark,
  userFooterLight,
  userFooterDark,
  mode,
}) => {
  // following https://github.com/mui-org/material-ui/issues/21757, we split createMuiTheme up.
  // first call instantiates a theme that doesn't depend on any default theme values (e.g. `defaultTheme.breakpoints`)
  // second pass uses our first instantiation (`baseTheme`) and deep merges.
  // Deep merge should perform better, at a hopefully small hit to readability
  // more info https://stackoverflow.com/questions/57630926/material-ui-theme-overrides-leveraging-theme-palette-colors

  const baseGrid: React.CSSProperties = {
    display: "grid",
    gridColumnGap: "0px",
    gridAutoFlow: "column",
  };

  // Known values that will not change
  const magicNumbers = {
    logo: {
      padding: "22.5px",
      margin: "37px",
      width: "100px",
    },
    nav: {
      rightMargin: "37px",
      profile: {
        paddingRight: "8px",
        padding: "16px",
        width: "40px",
        fromRightOfPageToLeftOfMenu: "65px",
      },
      // Note: the width of the nav links is NOT known (it varies)
      // Including it here to make that obvious.
      links: {
        width: "0px",
      },
    },
  };

  const constants = {
    leftMargin: `max(0px, calc((100vw - ${breakpointValues.desktop}px) / 2))`,
    rightMargin: `max(0px, calc((100vw - ${breakpointValues.desktop}px) / 2))`,

    /** Align with left side of wordmark, right side of nav */
    leftMarginLogoAligned: `max(2rem, calc((100vw - ${breakpointValues.desktop}px) / 2 + ${magicNumbers.logo.padding} + ${magicNumbers.logo.margin}))`,
    rightMarginNavAligned: `max(2rem, calc((100vw - ${breakpointValues.desktop}px) / 2) + ${magicNumbers.nav.profile.paddingRight})`,

    /** Align with right (inner) side of wordmark, left (inner) side of ProfileMenu */
    leftMarginInsideLogo: `max(2rem, calc((100vw - ${breakpointValues.desktop}px) / 2 + ${magicNumbers.logo.padding} + ${magicNumbers.logo.margin}) + ${magicNumbers.logo.width})`,

    /** Align with left (inner) side of ProfileMenu component (assumes logged in)
     * Note: There is no constant including the nav links because their width is unknown
     */
    rightMarginInsideNavProfileMenu: `max(2rem, calc((100vw - ${breakpointValues.desktop}px) / 2) + ${magicNumbers.nav.profile.fromRightOfPageToLeftOfMenu})`,

    brandGradient: `linear-gradient(90deg, rgb(249 69 105 / 100%) 0%, rgb(255 128 153 / 50%) 100%)`,
    bannerGradient: `linear-gradient(185.2deg, #FDF2F4 24.37%, rgba(253, 242, 244, 0) 103.81%)`,

    paddedColumnLeftWidth: "max(25px, calc((100vw - 784px) / 2))",
    paddedColumnRightWidth: "max(25px, calc((100vw - 784px) / 2))",
  };

  const baseTheme = createMuiTheme({
    breakpoints: {
      values: breakpointValues,
    },
    constants: constants,
    grids: {
      threeCol: {
        ...baseGrid,
        gridTemplateColumns:
          "min-content repeat(1, minmax(25vw, 1fr)) min-content",
        gridAutoFlow: "column",
      },
    },
    // min-content repeat(1, minmax(25vw, 1fr)) min-content
    palette: {
      primary: {
        main: userPrimaryColor || "#F94569",
      },
      textures: {
        onLight: {
          dots: {
            background:
              "radial-gradient(rgb(85 85 85 / 32%) 1px, transparent 0)",
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

      danger: {
        main: "#8D363C",
      },
      errorBackground: {
        main: "rgba(193, 18, 18, 0.5)",
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
      code: {
        backgroundColor: "sgdarkblue.main",
        fontFamily: "monospace",
        fontSize: "inherit",
        ".comment": {
          color: "#f4c1c0",
        },
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

  // this pass depends on certain defaults returned by the first createMuiTheme
  const dependentTheme = createMuiTheme(baseTheme, {
    palette: {
      primary: {
        contrastText: baseTheme.palette.getContrastText(
          baseTheme.palette.primary.main
        ),
      },
      danger: {
        contrastText: baseTheme.palette.getContrastText(
          baseTheme.palette.danger.main
        ),
      },
      pre: {
        ...prismTheme,
        [baseTheme.breakpoints.down("sm")]: {
          marginLeft: "-4px",
          marginRight: "-4px",
          paddingLeft: "1ch",
          paddingRight: "1ch",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          borderTop: "4px solid #efefef",
          borderBottom: "4px solid #efefef",
        },
        [baseTheme.breakpoints.up("sm")]: {
          minWidth: "min(80ch, 100%)",
        },
        fontSize: "0.8rem",
        padding: "10px",
        overflowX: "auto",
        backgroundColor: "sgdarkblue.main",
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
        [baseTheme.breakpoints.up("sm")]: {
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
        wordBreak: "break-all",
        backgroundColor: prismTheme.color,
        color: "red",
      },
    },
    components: {
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
              backgroundColor: baseTheme.palette.common.white,
              borderRadius:
                Number.parseInt(`${baseTheme.shape.borderRadius}`, 10) * 50,
              transition: baseTheme.transitions.create(
                ["background-color", "box-shadow", "border-color", "color"],
                {
                  duration: baseTheme.transitions.duration.short,
                }
              ),
              boxShadow: baseTheme.shadows[2],
              "&:hover": {
                backgroundColor: baseTheme.palette.common.white,
                boxShadow: baseTheme.shadows[4],
              },
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                boxShadow: baseTheme.shadows[2],
              },
            },
          },
        ],
      },
    },
  });

  // add in colors that are unique to light theme
  const lightTheme = createMuiTheme(dependentTheme, {
    palette: {
      mode: "light",
      surfaces: {
        background: { main: "#FFFFFF" },
        sql: { main: "#E3EFFE" },
        error: { main: "#F9EEEF" },
        success: { main: "#DBF9F3" },
        link: { main: "#2A81F6" },
      },
      navbar: {
        /*main: "#FBFCFF",*/
        main:
          userNavbarLight ||
          `linear-gradient(0deg, rgba(42, 129, 246, 0.02), rgba(42, 129, 246, 0.02)),#FFFFFF`,
      },
      footer: {
        main: userFooterLight || "#00224E",
      },
      grays: {
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
      editor: {
        highlight: { main: "#bf55ec30" },
        activeLine: { main: "#b6c9e3" },
        comment: { main: "#6c7a89" },
        keyword: { main: "#3455db" },
        operator: { main: "#3455db" },
        string: { main: "#008000" },
        function: { main: "#e73c70" },
      },
    },
  });

  // finally add in colors that are unique to dark theme
  const darkTheme = createMuiTheme(dependentTheme, {
    palette: {
      mode: "dark",
      surfaces: {
        background: { main: "#000202" },
        sql: { main: "#27293B" },
        error: { main: "#370D10" },
        success: { main: "#103D34" },
        link: { main: "#2A81F6" },
      },
      navbar: {
        main: userNavbarDark || "#201316",
      },
      footer: {
        main: userFooterDark || "201316",
      },
      grays: {
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
      editor: {
        highlight: { main: "#bf55ec30" },
        activeLine: { main: "#25415B" },
        comment: { main: "#6c7a89" },
        keyword: { main: "#00ffff" },
        operator: { main: "#00ffff" },
        string: { main: "#AE81FF" },
        function: { main: "#e73c70" },
      },
    },
  });

  return mode === "light" ? lightTheme : darkTheme;
};

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

  interface EditorPalette {
    highlight: PaletteColor;
    activeLine: PaletteColor;
    comment: PaletteColor;
    keyword: PaletteColor;
    operator: PaletteColor;
    string: PaletteColor;
    function: PaletteColor;
  }

  interface Palette {
    surfaces?: SurfacePalette;

    navbar?: PaletteColor;

    footer?: PaletteColor;

    grays?: GrayPalette;

    editor?: EditorPalette;

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
    danger?: PaletteColor;
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
    code?: { [key: string]: React.CSSProperties | string };
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

  interface EditorPaletteOptions {
    highlight: PaletteColorOptions;
    activeLine: PaletteColorOptions;
    comment: PaletteColorOptions;
    keyword: PaletteColorOptions;
    operator: PaletteColorOptions;
    string: PaletteColorOptions;
    function: PaletteColorOptions;
  }
  interface PaletteOptions {
    surfaces?: SurfacePaletteOptions;

    textures?: {
      onLight?: TexturePaletteOptions;
      onDark?: TexturePaletteOptions;
    };

    navbar?: PaletteColorOptions;

    footer?: PaletteColorOptions;

    grays?: GrayPaletteOptions;

    editor?: EditorPaletteOptions;

    flambeeDarkGray?: PaletteColorOptions;
    flambeeLightGray?: PaletteColorOptions;
    flambeeBlue?: PaletteColorOptions;
    flambeeRed?: PaletteColorOptions;
    flambeeGreen?: PaletteColorOptions;
    errorBackground?: PaletteColorOptions;
    danger?: PaletteColorOptions;
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
    code?: { [key: string]: React.CSSProperties | string };
  }
}
// Docs on module augmentation for customizing the theme
// https://material-ui.com/guides/typescript/#customization-of-theme
declare module "@material-ui/core/styles" {
  type Constants = {
    leftMargin: string;
    rightMargin: string;
    leftMarginLogoAligned: string;
    rightMarginNavAligned: string;
    leftMarginInsideLogo: string;
    rightMarginInsideNavProfileMenu: string;
    brandGradient: string;
    bannerGradient: string;
    paddedColumnLeftWidth: string;
    paddedColumnRightWidth: string;
  };

  type GridDefs = {
    threeCol: React.CSSProperties;
  };

  interface Theme {
    constants: Constants;
    grids: GridDefs;
    texturize: (
      base: React.CSSProperties,
      texture: React.CSSProperties
    ) => React.CSSProperties;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    constants: Constants;
    grids: GridDefs;
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
