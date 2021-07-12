import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography,
} from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
// import { IconEmail } from "../Icon";

import { theme } from "../themes/design";

interface IButtonProps extends MuiButtonProps {
  sx?: SxProps<Theme>;
  large?: boolean;
  icon?: any; // TODO narrow Icon type (our own type extending Mui's Icon?)
}
const Button = ({
  children,
  disabled,
  icon,
  sx,
  large,
  ...rest
}: IButtonProps) => (
  <MuiButton
    disabled={disabled}
    sx={{
      borderRadius: "32px",
      px: "1rem",
      // pl: icon ? "3.5rem" : "2rem",
      background: disabled
        ? theme.grays.light.gray26
        : "linear-gradient(270.8deg, #FF8099 4.38%, #F94569 93.29%)",
      color: disabled ? theme.grays.light.gray22 : "white",
      "&.Mui-disabled": { backgroundColor: theme.grays.light.gray26 },
      "&:hover": {
        background: "linear-gradient(270.8deg, #F94569 4.38%, #FF8099 93.29%)",
        boxShadow: "0px 4px 8px rgba(249, 69, 105, 0.2)",
      },
      "&:focus": {
        boxShadow: `0px 0px 0px 1px ${theme.grays.light.gray20}`,
        // July 2021: webkit doesn't support rounded outlines, so boxShadow is next best thing
      },
      minWidth: large ? "360px" : null,
      minHeight: large ? "40px" : null,
      ...sx,
    }}
    {...rest}
  >
    {icon}
    <Typography variant="bodyHighlighted">{children}</Typography>
  </MuiButton>
);

export default Button;
