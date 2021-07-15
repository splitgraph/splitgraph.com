import * as React from "react";
import { Button } from "@material-ui/core";

export interface SubmitButtonProps {
  disabled?: boolean;
  hasErrors?: boolean;
  sx?: {};
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
