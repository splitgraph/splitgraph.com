/** @jsxImportSource theme-ui */
import * as React from "react";
import { Button } from "@material-ui/core";

export interface SubmitButtonProps {
  disabled?: boolean;
  hasErrors?: boolean;
  sx?: {};
  variant?: string;
  children?: React.ReactNode;
}

const SubmitButton = ({
  disabled = false,
  hasErrors = false,
  sx = {},
  variant = "primary",
  children,
  ...rest
}: SubmitButtonProps) => (
  <Button
    type="submit"
    // variant={variant}
    sx={{
      opacity: disabled ? "0.5" : "initial",
      ":hover": {
        cursor: disabled ? "initial" : "pointer",
      },
      ...sx,
    }}
    disabled={hasErrors || disabled}
    {...rest}
  >
    {children}
  </Button>
);

export default SubmitButton;
