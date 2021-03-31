/** @jsxImportSource theme-ui */
import { Box, ThemeUIStyleObject } from "theme-ui";
import * as React from "react";
import { useContext } from "react";

// ILayoutContext,
import { LayoutContext } from "../Layout/TwoColumnLayout";

export interface MenuProps {
  children?: React.ReactNode;
  style?: ThemeUIStyleObject;
}

const Menu = ({ children, style = {} }: MenuProps) => {
  const { expanded } = useContext(LayoutContext);

  const containerStyle = {
    ".menu-list": {
      paddingLeft: "1em",
      paddingTop: "1em",
      paddingRight: "1em",
      paddingBottom: "1em",
      listStyleType: "none",
      marginBottom: [null, null, "1em"],
      display: "flex",
      flexDirection: [
        expanded ? "column" : "row",
        expanded ? "column" : "row",
        "column",
      ],
      overflowX: [
        expanded ? "initial" : "scroll",
        expanded ? "initial" : "scroll",
        "initial",
      ],
      scrollBehavior: [
        expanded ? "initial" : "smooth",
        expanded ? "initial" : "smooth",
        "initial",
      ],
      ...(style.hasOwnProperty(".menu-list") ? { ...style[".menu-list"] } : {}),
    },
    ".menu-item": {
      marginLeft: [
        expanded ? "initial" : "1em",
        expanded ? "initial" : "1em",
        "initial",
      ],
      backgroundColor: [
        expanded ? "initial" : "lessHeavy",
        expanded ? "initial" : "lessHeavy",
        "initial",
      ],
      padding: "1em",
      borderRadius: [
        expanded ? "initial" : "1em",
        expanded ? "initial" : "1em",
        "initial",
      ],
      display: ["flex", "flex", "initial"],
      alignItems: ["center", "center", "initial"],
      ...(style.hasOwnProperty(".menu-item") ? { ...style[".menu-item"] } : {}),
    },
    ".menu-item--heading": {
      backgroundColor: "initial",
      ...(style.hasOwnProperty(".menu-item")
        ? { ...style[".menu-item-heading"] }
        : {}),
    },
    // '.menu-item-label--heading': {
    //   textTransform: 'uppercase',
    //   fontSize: 'small',
    // },
    // '.menu-item-label--heading': {
    //   // color: 'muted',
    //   // textTransform: 'uppercase',
    // },
    ".menu-item--active": {
      borderLeftWidth: "5px",
      borderLeftColor: "primary",
      borderLeftStyle: "solid",

      ...(style.hasOwnProperty(".menu-item--active")
        ? { ...style[".menu-item--active"] }
        : {}),
    },
    ".menu-item--inactive": {
      filter: [
        expanded ? "initial" : "opacity(0.5)",
        expanded ? "initial" : "opacity(0.5)",
        "initial",
      ],

      ...(style.hasOwnProperty(".menu-item--inactive")
        ? { ...style[".menu-item--inactive"] }
        : {}),
    },
    ".menu-item-inner-container": {
      marginLeft: [
        expanded ? "1rem" : "initial",
        expanded ? "1rem" : "initial",
        "1rem",
      ],
      marginRight: [
        expanded ? "1rem" : "initial",
        expanded ? "1rem" : "initial",
        "1rem",
      ],

      ...(style.hasOwnProperty(".menu-item-inner-container")
        ? { ...style[".menu-item-inner-container"] }
        : {}),
    },
    ".menu-item-link": {
      //   Should match the background ("hide" it without bumpy shift)
      borderBottomColor: [
        expanded ? "heavy" : "secondary",
        expanded ? "heavy" : "secondary",
        "heavy",
      ],
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      ":hover": {
        borderBottomColor: "light",
      },

      ...(style.hasOwnProperty(".menu-item-link")
        ? { ...style[".menu-item-link"] }
        : {}),
    },
    ".menu-item-label": {
      display: ["initial", "initial", expanded ? "none" : "initial"],
      whiteSpace: [
        expanded ? "initial" : "nowrap",
        expanded ? "initial" : "nowrap",
        "initial",
      ],
      ...(style.hasOwnProperty(".menu-item-label")
        ? { ...style[".menu-item-label"] }
        : {}),
    },
  } as ThemeUIStyleObject;

  return (
    <Box sx={containerStyle}>
      <ul className="menu-list">{children}</ul>
    </Box>
  );
};

export default Menu;
