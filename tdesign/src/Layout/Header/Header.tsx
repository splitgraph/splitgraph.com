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
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          gridTemplateRows: "1fr",
          gridColumnGap: "0px",
          gridRowGap: "0px",
          minHeight: "5vh",
          // display: { xs: "none", md: "flex" },
          // padding: { xs: ".3em", md: "1em" },
          padding: theme.spacing(1),
          [theme.breakpoints.down("md")]: {
            padding: theme.spacing(0.3),
          },
          ".header--left": {
            gridArea: "1 / 1 / 2 / 2",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          },
          ".header--center": {
            gridArea: "1 / 2 / 2 / 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          },
          ".header--right": {
            gridArea: "1 / 3 / 2 / 4",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          },
          ".logo-text": {
            paddingLeft: ".5ch",
          },
          a: {
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
        } as SxProps<Theme>
      }
    >
      {children}
    </Box>
  );
};

export default Header;
