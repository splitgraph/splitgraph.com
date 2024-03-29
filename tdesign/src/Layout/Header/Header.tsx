import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

import { hamburgerIconURI, closeIconURI } from "../../Icon";

import { makeIconStyle } from "../../Icon/BaseIcon";

export interface HeaderProps {
  children?: React.ReactNode;
  style?: any;
}

const iconUncheckedStyle = makeIconStyle({
  svgURI: hamburgerIconURI,
  size: "24px",
});

const iconCheckedStyle = makeIconStyle({
  svgURI: closeIconURI,
  size: "24px",
});

const Header = ({ children }: HeaderProps) => {
  const theme = useTheme();

  return (
    <Box
      className="header--container"
      sx={
        {
          ...theme.grids.threeCol,
          background: ({ palette }) => palette.navbar.main,

          // !! HACK
          /* There is a bug in Emotion SSR that causes style tags to get injected
             into the DOM – as in, literally the text of the style tags is injected
             as part of the HTML.

             Fortunately those style tags all have attr data-emotion="css", so we
             can set a rule to hide them :)

             Long term the fix for this is around constructing the EmotionCache
             in SSR, but it's not supposed to be our problem (should be MUI),
             and it's probably been fixed in a new version by now anyway.
          */
          [`style[data-emotion^="css"]`]: {
            display: "none",
          },
          /* end hack :) */

          // Uncomment this to make hamburger menu open without shifting the page
          // contain: "size layout",
          // minHeight: "56px",

          ".header--left": {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "22.5px",
            marginLeft: (theme) => theme.constants.leftMargin,
            [theme.breakpoints.down("md")]: {
              gridColumnStart: "1",
              gridColumnEnd: "2",
              gridRow: "1",
            },
          },
          ".header--center": {
            display: "flex",
            alignItems: "center",
            gridColumnStart: "auto",
            gridColumnEnd: "auto",
            justifyContent: "center",
            paddingLeft: "22.5px",
            paddingRight: "22.5px",
            gridRow: "1",
            [theme.breakpoints.down("sm")]: {
              gridRow: "2",
              width: "100%",
              height: "56px",
              gridColumnStart: "1",
              gridColumnEnd: "5",
            },
          },
          ".header--right": {
            marginRight: (theme) => theme.constants.rightMargin,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            [theme.breakpoints.down("md")]: {
              paddingLeft: "22.5px",
              paddingRight: "22.5px",
            },
          },

          /* Basic idea of .hamburger-checkbox:

          - The checkbox <input> is the first element in the DOM, so that it
            can select elements after it based on its own :checked state
            (it's easy to select for siblings following a target, but basically
            impossible to select previous siblings of a target)
          - We position it on the right by setting its grid column to 4
          - When it's :checked, it manipulates the styles of whichever siblings
            it needs to, in this case .header--center and .header--right

          */
          ".hamburger-checkbox": {
            [theme.breakpoints.up("md")]: {
              display: "none",
              "~ div.header--right": {
                gridRow: 1,
                gridColumn: 3,
              },
            },
            [theme.breakpoints.down("md")]: {
              appearance: "none",
              border: "none",
              outline: "none",
              display: "block",
              minWidth: "24px",
              minHeight: "24px",
              cursor: "pointer",
              alignSelf: "center",
              gridRowStart: 1,
              gridColumn: 4,
              marginRight: "22.5px",
              ":not(:checked)": {
                ...iconUncheckedStyle,
                "~ div.header--right": {
                  display: "none",
                },
              },
              ":checked": {
                ...iconCheckedStyle,
                "~ div.header--center": {
                  [theme.breakpoints.down("sm")]: {
                    gridRow: "2",
                    gridColumnStart: "1",
                    gridColumnEnd: "none",
                    width: "100%",
                    paddingLeft: "22.5px",
                    paddingRight: "22.5px",
                  },
                },
                "~ div.header--right": {
                  gridRowStart: "3",
                  gridColumnStart: "1",
                  gridColumnEnd: "none",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                },
              },
            },
          },
          a: {
            fontWeight: "bold",
            marginRight: "1ch",
          },
          ".button-link": {
            variant: "links.button",
            width: "max-content",
          },
          ".logo-text": {
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          },
        } as SxProps<Theme>
      }
    >
      <input type="checkbox" className="hamburger-checkbox" />
      {children}
    </Box>
  );
};

export default Header;
