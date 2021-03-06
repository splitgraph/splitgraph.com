import { Button } from "rebass";

export default ({
  disabled,
  hasErrors,
  children,
  variant = "primary",
  sx = {},
  ...rest
}) => (
  <Button
    type="submit"
    variant={variant}
    sx={{
      opacity: disabled ? "0.5" : "initial",
      ":hover": {
        cursor: disabled ? "initial" : "pointer"
      },
      ...sx
    }}
    disabled={hasErrors || disabled}
    {...rest}
  >
    {children}
  </Button>
);
