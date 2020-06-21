// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";
import { useContext } from "react";

// ILayoutContext,
import { LayoutContext } from "../Layout/TwoColumnLayout";

export interface MenuProps {
  children?: React.ReactNode;
}

export default ({ children }: MenuProps) => {
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
    },
    ".menu-item--heading": {
      backgroundColor: "initial",
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
    },
    ".menu-item--inactive": {
      filter: [
        expanded ? "initial" : "opacity(0.5)",
        expanded ? "initial" : "opacity(0.5)",
        "initial",
      ],
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
    },
    ".menu-item-label": {
      display: ["initial", "initial", expanded ? "none" : "initial"],
      whiteSpace: [
        expanded ? "initial" : "nowrap",
        expanded ? "initial" : "nowrap",
        "initial",
      ],
    },
  } as SystemStyleObject;

  return (
    <Box sx={containerStyle}>
      <ul className="menu-list">{children}</ul>
    </Box>
  );
};
