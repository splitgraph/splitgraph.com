/*
  Use the @rebass/preset theme as a starting point.

  Taken from:
    https://github.com/rebassjs/rebass/blob/master/packages/preset/src/index.js
*/

import prismTheme from "@theme-ui/prism/presets/shades-of-purple.json";

export const defaultTheme = {
  useCustomProperties: true,
  colors: {
    text: "#000",
    background: "#fff",
    // primary: "#07c",
    primary: "#36678d",
    secondary: "#363C8D",
    muted: "#f6f6f9",
    gray: "#dddddf",
    // gray: "#ecebf5",
    // gray: "#fff",
    lightgray: "#ccc",
    mutedlightgray: "rgba(204, 204, 204, .5)",
    highlight: "hsla(205, 100%, 40%, 0.125)",
    errorBackground: "rgba(193, 18, 18, 0.5)",
    danger: "#8D363C",
    success: "#3B8D36",
    warning: "orange",
    darkgray: "#3c",
    sgdarkblue: "#36678d",
    accent: "secondary"
  },
  backgrounds: {
    divided: {
      background: [
        "linear-gradient(180deg, #f6f6f9 40%, #36678d 40%)",
        "linear-gradient(180deg, #f6f6f9 45%, #36678d 45%)",
        "linear-gradient(180deg, #f6f6f9 55%, #36678d 55%)"
      ]
    }
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace"
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48
  },
  radii: {
    default: 4,
    circle: 99999
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)"
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading"
    },
    display: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [5, 6, 7]
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    }
  },
  variants: {
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle"
    },
    card: {
      p: 2,
      bg: "background",
      boxShadow: "card"
    },
    nav: {
      fontSize: 1,
      fontWeight: "bold",
      display: "inline-block",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      ":hover,:focus,.active": {
        color: "primary"
      }
    }
  },
  buttons: {
    primary: {
      fontSize: 2,
      fontWeight: "bold",
      color: "background",
      bg: "primary",
      borderRadius: "default"
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 2px"
    },
    secondary: {
      variant: "buttons.primary",
      color: "background",
      bg: "secondary"
    },
    pill: {
      // variant: "buttons.pill",
      color: "text",
      backgroundColor: "muted",
      color: "darkgray",
      fontWeight: "bold",
      borderColor: "lightgray",
      borderWidth: 3,
      borderStyle: "solid",
      borderRadius: 40,
      boxShadow: "card"
    }
  },
  links: {
    primary: {
      color: "primary",
      // remove the gray background on active links in IE 10.
      backgroundColor: "transparent",
      outline: "none",
      cursor: "pointer",
      "&:active, &:hover": {
        outline: 0,
        textDecoration: "underline",
        color: "secondary"
      },
      "&[disabled]": {
        cursor: "not-allowed",
        pointerEvents: "none"
      }
    },
    muted: {
      variant: "links.primary",
      color: "muted",
      "&:active, &:hover": {
        color: "muted",
        textDecoration: "underline"
      }
    }
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      "@media (min-width: 769px)": {
        maxWidth: "80ch"
      }
    },
    pre: {
      ...prismTheme,
      "@media (max-width: 768px)": {
        marginLeft: -4,
        marginRight: -4,
        paddingLeft: "1ch",
        paddingRight: "1ch",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        borderTop: "4px solid #efefef",
        borderBottom: "4px solid #efefef"
      },
      "@media (min-width: 769px)": {
        minWidth: "80ch"
      },
      fontSize: "0.8rem",
      padding: 10,
      overflowX: "auto",
      backgroundColor: "primary",
      ".mdx-marker": {
        // backgroundColor: "rgba(255,255,255,0.1)",
        display: "block",
        marginLeft: "-1em",
        marginRight: "-1em",
        paddingRight: "1em",
        paddingLeft: "1em",
        borderLeft: `.25em solid ${prismTheme[".punctuation"].color}`
      }
    },
    inlineCode: {
      ...prismTheme,
      "@media (min-width: 749px)": {
        minWidth: "initial"
      },
      paddingLeft: "0.5ch",
      paddingRight: "0.5ch",
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: "1rem",
      display: "inline-flex",
      alignContent: "center",
      overflowX: "auto",
      backgroundColor: "primary"
    },
    code: {
      backgroundColor: "primary",
      fontFamily: "monospace",
      fontSize: "inherit",
      span: {
        color: "red"
      }
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      color: "red",
      code: {
        backgroundColor: "primary",
        bg: prismTheme.backgroundColor,
        color: prismTheme.color,
        padding: 1
      }
    }
  }
};

export default defaultTheme;
