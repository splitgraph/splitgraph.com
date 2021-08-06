import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface HeaderProps {
  children?: React.ReactNode;
  style?: any;
}

const Header = ({ children }: HeaderProps) => {
  const theme = useTheme();

  return (
    <Box
      className="header--container"
      sx={
        {
          boxShadow: "0px 4px 8px rgba(195, 195, 195, 0.2)",
          display: "grid",
          gridColumnGap: "0px",
          gridRowGap: "7px",
          gridTemplateColumns:
            "min-content repeat(1, minmax(25vw, 1fr)) min-content",
          gridAutoFlow: "column",
          background: (theme) => theme.palette.navbar.light.main,

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

          // '*[class^="header--"]:focus-within': {
          //   fontWeight: "500 !important",
          //   backgroundColor: "red !important",
          // },

          ".header--left, .header--center, .header--right": {
            minHeight: "56px",
          },

          [theme.breakpoints.down("md")]: {
            ":focus-within": {
              ".header--center": {
                gridRow: "2",
                gridColumnStart: "1",
                gridColumnEnd: "none",
                ".search-input-container": {
                  width: "100%",
                },
              },

              ".header--right:focus-within": {
                gridRowStart: "3",
                gridColumnStart: "1",
              },
            },
          },

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
            width: "100% !important",
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            gridRow: "1",
            gridColumnStart: "auto",
            gridColumnEnd: "auto",
            justifyContent: "flex-end",
            // transition: theme.transitions.create("gridColumnStart", {
            //   duration: 4000,
            // }),
            // [theme.breakpoints.down("md")]: {
            //   ":not(:focus-within)": {
            //     width: "100%",
            //     gridRow: "1",
            //     gridColumnStart: "auto",
            //     gridColumnEnd: "auto",
            //     justifyContent: "flex-end",
            //   },
            //   ":focus-within": {
            //     gridRow: "2",
            //     gridColumnStart: "1",
            //     gridColumnEnd: "none",
            //     "*:focus": {
            //       width: "max-content",
            //     },
            //   },
            // },
          },
          // "& .header--left:not(& div:focus-within ~ div)": {
          //   color: "green",
          // },
          ".header--right": {
            marginRight: (theme) => theme.constants.rightMargin,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",

            // [theme.breakpoints.down("md")]: {
            //   ":not(:focus-within)": {
            //     gridRow: "1",
            //     gridColumnStart: "3",
            //   },
            //   ":focus-within": {
            //     gridRowStart: "3",
            //     gridColumnStart: "1",
            //   },
            // },
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
      {children}
    </Box>
  );
};

export default Header;
