import Typography from "typography";
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from "typography-breakpoint-constants";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.618,
  headerFontFamily: ["SF Pro Display", "sans-serif"],
  bodyFontFamily: ["SFProText", "sans-serif"],
  overrideStyles: ({}, options, styles) => ({
    h1: {
      fontSize: "56px",
      fontWeight: "700",
      lineHeight: 1,
      marginBottom: 0,
    },
    h2: {
      fontSize: "40px",
      fontWeight: "700",
      lineHeight: 1.2,
      marginBottom: 0,
    },
    h6: {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: 1.7,
      marginBottom: 0,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: "500",
      lineHeight: 1.3,
      marginBottom: 0,
    },
    p: {
      fontSize: "16px",
      lineHeight: 1.5,
      marginBottom: 0,
    },
    "p.md": {
      fontSize: "14px",
      lineHeight: 1.67,
      marginBottom: 0,
    },
    "p.sm": {
      fontSize: "12px",
      lineHeight: 1.67,
      marginBottom: 0,
    },
    img: {
      marginBottom: 0,
    },
    a: {
      textDecoration: "none",
      cursor: "pointer",
    },
    ul: {
      listStyle: "none",
      margin: 0,
    },
    li: {
      margin: 0,
      fontSize: "14px",
      lineHeight: 1.5,
    },
    [MOBILE_MEDIA_QUERY]: {
      h1: {
        fontSize: "24px",
        lineHeight: "32px",
      },
    },
    [TABLET_MEDIA_QUERY]: {
      h2: {
        fontSize: "20px",
      },
    },
  }),
});

export default typography;
