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
          background:
            "linear-gradient(0deg, rgba(42, 129, 246, 0.02), rgba(42, 129, 246, 0.02)), #FFFFFF",
          [theme.breakpoints.down("md")]: {
            padding: theme.spacing(0.3),
          },
          ".header--left": {
            gridArea: "1 / 1 / 2 / 2",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "20px",
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

          a: {
            fontWeight: "bold",
            marginRight: "1ch",
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
