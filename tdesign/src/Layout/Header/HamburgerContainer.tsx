import { Box, IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { Menu as MenuIcon } from "@material-ui/icons";

export interface IHamburgerContainerProps {
  children: React.ReactNode;
  className?: string;
}

const HamburgerContainer = ({
  children,
  className,
}: IHamburgerContainerProps) => {
  const theme = useTheme();

  return (
    <Box
      className={className}
      sx={{
        "& > :not(.hamburger-control)": {
          [theme.breakpoints.down("md")]: {
            display: "none",
            paddingRight: 0,
          },
          [theme.breakpoints.up("md")]: {
            display: "inherit",
          },
        },
      }}
    >
      {children}
      <Box
        className="hamburger-control"
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "flex",
          },
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        }}
      >
        <IconButton onClick={() => {}}>
          <MenuIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HamburgerContainer;
