import { Button, ButtonProps } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface IInFieldButtonProps extends ButtonProps {
  sx?: SxProps<Theme>;
}
const InFieldButton = ({
  children,
  disabled,
  sx,
  ...rest
}: IInFieldButtonProps) => (
  <Button
    disabled={disabled}
    sx={{
      background: ({ palette }) =>
        disabled
          ? palette.grays.gray26.main
          : "linear-gradient(270.8deg, #FF8099 4.38%, #F94569 93.29%)",
      color: ({ palette }) =>
        disabled ? palette.grays.gray22.main : palette.common.white,
      "&:hover": {
        background: "linear-gradient(270.8deg, #F94569 4.38%, #FF8099 93.29%)",
        boxShadow: "0px 4px 8px rgba(249, 69, 105, 0.2)",
      },
      "&.Mui-disabled": {
        backgroundColor: ({ palette }) => palette.grays.gray26.main,
      },
      "&:focus": {
        boxShadow: ({ palette }) =>
          `0px 0px 0px 1px ${palette.grays.gray20.main}`,
      },
      paddingRight: "1rem",
      ...sx,
    }}
    // endIcon={}
    {...(rest as any)}
  >
    {children}
  </Button>
);

export default InFieldButton;
