import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";
// import { IconEmail } from "../Icon";

export interface IButtonProps extends MuiButtonProps {
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

      background: ({ palette }) =>
        disabled
          ? palette.grays.gray26.main
          : "linear-gradient(270.8deg, #FF8099 4.38%, #F94569 93.29%)",
      color: ({ palette }) => (disabled ? palette.grays.gray22.main : "white"),
      "&.Mui-disabled": {
        backgroundColor: ({ palette }) => palette.grays.gray26.main,
      },
      "&:hover": {
        background: "linear-gradient(270.8deg, #F94569 4.38%, #FF8099 93.29%)",
        boxShadow: "0px 4px 8px rgba(249, 69, 105, 0.2)",
      },

      minHeight: large ? "40px" : null,
      ...sx,
    }}
    {...(rest as any)}
  >
    {icon}
    <Typography variant="bodyHighlighted">{children}</Typography>
  </MuiButton>
);

export default Button;
