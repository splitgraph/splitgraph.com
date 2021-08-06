import { Box } from "@material-ui/core";

import { hamburgerIconURI, closeIconURI } from "../../Icon";

import { makeIconStyle } from "../../Icon/BaseIcon";
export interface IHamburgerContainerProps {
  children: React.ReactNode;
  className?: string;
}

const HamburgerContainer = ({
  children,
  className,
}: IHamburgerContainerProps) => {
  const iconUncheckedStyle = makeIconStyle({
    svgURI: hamburgerIconURI,
    size: "32px",
    color: "red",
  });

  const iconCheckedStyle = makeIconStyle({
    svgURI: closeIconURI,
    size: "32px",
    // color: "bl",
  });

  return (
    <Box
      className={className}
      sx={{
        // ".hamburger-content": {
        //   [theme.breakpoints.down("md")]: {
        //     // display: "none",
        //     paddingRight: 0,
        //     gridRowStart: 3,
        //   },
        //   [theme.breakpoints.up("md")]: {
        //     display: "inherit",
        //   },
        // },

        ".hamburger-checkbox": {
          appearance: "none",
          display: "block",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          ":focus": {},
          ":not(:checked)": {
            ...iconUncheckedStyle,
            "~ div": {
              display: "none",
            },
          },
          ":checked": {
            ...iconCheckedStyle,
            "~ div": {
              gridRowStart: 3,
            },
          },
        },
      }}
    >
      <input
        type="checkbox"
        className="hamburger-checkbox"
        onClick={(event) => event.currentTarget.focus()}
      />
      {/*
        <MenuIcon className="hamburger-menu-icon" /> */}

      {children}

      {/* <IconButton onClick={() => {}}> */}

      {/* </IconButton> */}
    </Box>
  );
};

export default HamburgerContainer;
