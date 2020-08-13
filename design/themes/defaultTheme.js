/*
  Use the @rebass/preset theme as a starting point.

  Taken from:
    https://github.com/rebassjs/rebass/blob/master/packages/preset/src/index.js
*/

// import prismTheme from "@theme-ui/prism/presets/shades-of-purple.json";

/*
  TODO / temp:

    Pasting the marketing theme in here because hot reload is broken
    for top level files like defaultTheme.js. Need to move it somewhere else.

  (This whole file is too big and needs to be refactored)
*/

const prismTheme = {
  color: "#e0ffff",
  // backgroundColor: "#36678d",
  backgroundColor: "red",
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
      "@media (max-width: 768px)": {},
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
      "@media (min-width: 749px)": {
        minWidth: "initial",
      },
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

export const defaultTheme = {
  useCustomProperties: true,
  colors: {
    text: "#000",
    background: "#fff",
    // primary: "#07c",
    primary: "#36678d",
    // primary: "#000",
    secondary: "#89368d",
    // secondary: "#363C8D",
    heavy: "#0d1821",
    lightaccent: "#96ccff",
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
  },
  backgrounds: {
    divided: {
      background: [
        "linear-gradient(180deg, #f6f6f9 40%, #36678d 40%)",
        "linear-gradient(180deg, #f6f6f9 45%, #36678d 45%)",
        "linear-gradient(180deg, #f6f6f9 55%, #36678d 55%)",
      ],
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
    // body: 1.5,
    // heading: 1.25,
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
    primary: {
      fontSize: 2,
      fontWeight: "bold",
      color: "background",
      bg: "primary",
      borderRadius: "default",
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
    },
    secondary: {
      variant: "buttons.primary",
      color: "background",
      bg: "secondary",
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
    primary: {
      color: "primary",
      // remove the gray background on active links in IE 10.
      backgroundColor: "transparent",
      outline: "none",
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
      // ...asciinemaEmbedStyles,
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
      color: prismTheme.backgroundColor,
      backgroundColor: prismTheme.color,
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
      wordBreak: "break-all",
      // backgroundColor: "primary",
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
      color: "red",
      code: {
        backgroundColor: "primary",
        bg: prismTheme.backgroundColor,
        color: prismTheme.color,
        padding: 1,
      },
    },
  },
};

export default defaultTheme;
