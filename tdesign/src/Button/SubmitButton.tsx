import * as React from "react";
import { Button, ButtonProps, SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

export interface SubmitButtonProps extends ButtonProps {
  disabled?: boolean;
  hasErrors?: boolean;
  sx?: SxProps<Theme>;
  variant?: "text" | "outlined" | "contained" | "pill";
  children?: React.ReactNode;
}

const SubmitButton = ({
  disabled = false,
  hasErrors = false,
  sx = {},
  variant = "contained",
  children,
  ...rest
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      variant={variant}
      disableRipple
      sx={{
        opacity: disabled ? "0.5" : "initial",
        ":hover": {
          cursor: disabled ? "initial" : "pointer",
        },
        ...sx,
      }}
      disabled={hasErrors || disabled}
      {...(rest as any)}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
