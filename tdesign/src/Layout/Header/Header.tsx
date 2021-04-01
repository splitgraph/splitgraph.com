/** @jsxImportSource theme-ui */
// @ts-ignore
import * as React from "react";

/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

export interface HeaderProps {
  children?: React.ReactNode;
  style?: any;
}

const headerSx: any = {
  backgroundColor: "heavy",
  // borderBottomColor: 'primary',
  // borderBottomStyle: 'solid',
  // borderBottomWidth: '1px',
  display: "grid",
  gridTemplateColumns: "1fr 1fr 2fr",
  gridTemplateRows: "1fr",
  gridColumnGap: "0px",
  gridRowGap: "0px",
  minHeight: "5vh",
  padding: "1em",
  ".header--left": {
    gridArea: "1 / 1 / 2 / 2",
    backgroundColor: "heavy",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  ".header--center": {
    gridArea: "1 / 2 / 2 / 3",
    // backgroundColor: 'red',
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "light",
  },
  ".header--right": {
    gridArea: "1 / 3 / 2 / 4",
    // backgroundColor: 'purple',
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  ".logo-text": {
    color: "sglightblue",
    // fontSize: '1.5rem',
    paddingLeft: "1ch",
    ":hover": {
      color: "white",
    },
  },
  a: {
    color: "light",
    fontWeight: "bold",
    textDecoration: "underline",
    marginRight: "1ch",
  },
  "a:hover": {
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "light",
  },
  ".button-link": {
    variant: "links.button",
  },
};

const Header = ({ children }: HeaderProps) => (
  <Box className="header--container" sx={headerSx}>
    {children}
  </Box>
);

export default Header;
