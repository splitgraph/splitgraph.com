import { Button, ButtonProps, Typography } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
// import { IconEmail } from "../Icon";

import { theme } from "../themes/design";

interface IButtonProps extends ButtonProps {
  sx?: SxProps<Theme>;
  large?: boolean;
  icon?: any; // TODO narrow Icon type (our own type extending Mui's Icon?)
}
const InvisibleButton = ({
  children,
  disabled,
  icon,
  sx,
  large,
  ...rest
}: IButtonProps) => (
  <Button
    disabled={disabled}
    sx={{
      borderRadius: "32px",
      px: "1rem",
      color: disabled ? theme.grays.light.gray20 : "black",
      "&.Mui-disabled": { backgroundColor: theme.grays.light.gray26 },
      "&:hover": {
        boxShadow: `0px 0px 0px 1px ${theme.grays.light.gray25}`,
        background: "transparent",
      },
      "&:focus": {
        boxShadow: `0px 0px 0px 1px ${theme.grays.light.gray20}`,
      },
      minWidth: large ? "360px" : null,
      minHeight: large ? "40px" : null,
      ...sx,
    }}
    {...(rest as any)}
  >
    {icon}
    <Typography variant="bodyHighlighted">{children}</Typography>
  </Button>
);

export default InvisibleButton;
