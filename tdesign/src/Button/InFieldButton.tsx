import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles";
// import { IconArrowRight } from "../Icon";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { theme } from "../themes/design";

interface IButtonProps extends MuiButtonProps {
  sx?: SxProps<Theme>;
}
const Button = ({ children, disabled, ...rest }: IButtonProps) => (
  <MuiButton
    disabled={disabled}
    sx={{
      background: disabled
        ? theme.grays.light.gray26
        : "linear-gradient(270.8deg, #FF8099 4.38%, #F94569 93.29%)",
      color: disabled ? theme.grays.light.gray22 : "white",
      "&:hover": {
        background: "linear-gradient(270.8deg, #F94569 4.38%, #FF8099 93.29%)",
        boxShadow: "0px 4px 8px rgba(249, 69, 105, 0.2)",
      },
      "&.Mui-disabled": { backgroundColor: theme.grays.light.gray26 },
      "&:focus": {
        boxShadow: `0px 0px 0px 1px ${theme.grays.light.gray20}`,
      },
    }}
    // endIcon={}
    {...(rest as any)}
  >
    {children}
    <ArrowRightAltIcon
      sx={{ ml: "10px", color: disabled ? theme.grays.light.gray22 : "white" }}
    />
  </MuiButton>
);

export default Button;
