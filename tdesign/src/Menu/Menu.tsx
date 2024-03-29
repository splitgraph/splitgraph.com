import { useContext } from "react";
import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

// ILayoutContext,
import { LayoutContext } from "../Layout/TwoColumnLayout";

export interface MenuProps {
  children?: React.ReactNode;
  style?: SxProps<Theme>;
}

const Menu = ({ children, style = {} }: MenuProps) => {
  const { expanded } = useContext(LayoutContext);

  const containerStyle: SxProps<Theme> = {
    ...style,
    maxWidth: "100%",
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
        expanded ? "initial" : "auto",
        expanded ? "initial" : "auto",
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
        expanded ? "initial" : "surfaces.background.main",
        expanded ? "initial" : "surfaces.background.main",
        "initial",
      ],
      padding: "1em 0.5em",
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
      borderLeftColor: "link.main",
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
      color: (theme) =>
        theme.palette.getContrastText(theme.palette.surfaces.background.main),
      fontWeight: "bold",
      textDecoration: "none",
      ":hover": {
        textDecoration: "underline",
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
  };

  return (
    <Box sx={containerStyle}>
      <ul className="menu-list">{children}</ul>
    </Box>
  );
};

export default Menu;
