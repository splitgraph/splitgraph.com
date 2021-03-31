/** @jsxImportSource theme-ui */
import * as React from "react";

/** @jsxImportSource theme-ui */
import { Button } from "theme-ui";

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
    variant={variant}
    sx={{
      backgroundColor: "red",
      opacity: disabled ? "0.5" : "initial",
      ":hover": {
        cursor: disabled ? "initial" : "pointer",
      },
      ...sx,
    }}
    disabled={hasErrors || disabled}
    {...rest}
  >
    Does it still work uhhh
  </Button>
);

export default SubmitButton;
