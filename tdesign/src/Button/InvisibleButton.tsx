import { Button, ButtonProps, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";
// import { IconEmail } from "../Icon";

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
      color: ({ palette }) =>
        disabled ? palette.grays.gray20.main : palette.common.black,
      "&.Mui-disabled": {
        backgroundColor: ({ palette }) => palette.grays.gray26.main,
      },
      boxShadow: ({ palette }) =>
        `0px 0px 0px 2px ${palette.grays.gray25.main}`,
      "&:hover": {
        boxShadow: ({ palette }) =>
          `0px 0px 0px 2px ${palette.grays.gray23.main}`,
        background: "transparent",
      },
      "&:focus": {
        boxShadow: ({ palette }) =>
          `0px 0px 0px 2px ${palette.grays.gray20.main}`,
      },
      minWidth: large ? "360px" : null,
      minHeight: large ? "40px" : null,
      ...sx,
    }}
    {...(rest as any)}
  >
    {icon}
    <Typography
      variant="bodyHighlighted"
      sx={{ display: "flex", alignItems: "center" }}
    >
      {children}
    </Typography>
  </Button>
);

export default InvisibleButton;
