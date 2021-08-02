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
          // willChange: "transform",
          background:
            "linear-gradient(0deg, rgba(42, 129, 246, 0.02), rgba(42, 129, 246, 0.02)), #FFFFFF",
          ".header--left, .header--center, .header--right": {
            minHeight: "56px",
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
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // transition: theme.transitions.create("gridColumnStart", {
            //   duration: 4000,
            // }),
            [theme.breakpoints.down("md")]: {
              ":not(:focus-within)": {
                width: "100%",
                gridRow: "1",
                gridColumnStart: "auto",
                gridColumnEnd: "auto",
                justifyContent: "flex-end",
              },
              ":focus-within": {
                gridRow: "2",
                gridColumnStart: "1",
                gridColumnEnd: "none",
                "*:focus": {
                  width: "max-content",
                },
              },
            },
          },
          ".header--right": {
            marginRight: (theme) => theme.constants.rightMargin,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gridColumnStart: "3",
            [theme.breakpoints.down("md")]: {
              gridRow: "1",
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
      {children}
    </Box>
  );
};

export default Header;
