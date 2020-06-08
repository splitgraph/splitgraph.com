/*
  Use the @rebass/preset theme as a starting point.

  Taken from:
    https://github.com/rebassjs/rebass/blob/master/packages/preset/src/index.js
*/

// import prismTheme from "@theme-ui/prism/presets/shades-of-purple.json";

const prismTheme = {
  color: "#9EFEFF",
  backgroundColor: "#2D2A55",
  ".changed": { color: "rgb(255, 238, 128)" },
  ".deleted": { color: "rgba(239, 83, 80, 0.56)" },
  ".inserted": { color: "rgb(173, 219, 103)" },
  ".comment": { color: "rgb(179, 98, 255)", fontStyle: "italic" },
  ".punctuation": { color: "rgb(255, 255, 255)" },
  ".constant": { color: "rgb(255, 98, 140)" },
  ".string,.url": { color: "rgb(165, 255, 144)" },
  ".variable": { color: "rgb(255, 238, 128)" },
  ".number,.boolean": { color: "rgb(255, 98, 140)" },
  ".attr-name": { color: "rgb(255, 180, 84)" },
  ".keyword,.operator,.property,.namespace,.tag,.selector,.doctype": {
    color: "rgb(255, 157, 0)",
  },
  ".builtin,.char,.constant,.function,.class-name": {
    color: "rgb(250, 208, 0)",
  },
};

export const asciinemaEmbedStyles = {
  "div.asciinema-embed-container": {
    backgroundColor: "red",
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
    primaryHalfOpacity: "rgba(54, 103, 141, .5)",
    // primary: "#000",
    secondary: "#363C8D",
    heavy: "#0d1821",
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
    accent: "secondary",
    background: "#0d1821",
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
    body: "system-ui, sans-serif",
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
    card: "0 0 4px rgba(0, 0, 0, .125)",
    hovering: "0 0 1rem rgba(0, 0, 0, .5)",
    cardHover: "0 0 4px rgba(0, 0, 0, .5)",
    leftHighlightPrimary: "-5px 0 #36678d",
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
      boxShadow: "card",
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
      backgroundColor: "rgba(213, 246, 255, .5)",
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
      bg: "transparent",
      ":hover": {
        cursor: "pointer",
      },
    },
    primary: {
      fontSize: 2,
      fontWeight: "bold",
      color: "white",
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
      color: "white",
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
      boxShadow: "card",
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
      "@media (max-width: 768px)": {
        marginLeft: -4,
        marginRight: -4,
        paddingLeft: "1ch",
        paddingRight: "1ch",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        borderTop: "4px solid #efefef",
        borderBottom: "4px solid #efefef",
      },
      "@media (min-width: 769px)": {
        minWidth: "80ch",
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
        borderLeft: `.25em solid ${prismTheme[".punctuation"].color}`,
      },
    },
    inlineCode: {
      ...prismTheme,
      "@media (min-width: 749px)": {
        minWidth: "initial",
      },
      paddingLeft: "0.5ch",
      paddingRight: "0.5ch",
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: "1rem",
      display: "inline-flex",
      alignContent: "center",
      overflowX: "auto",
      backgroundColor: "primary",
    },
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
      color: "text",
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

//   export default defaultTheme;
