/** @jsxImportSource theme-ui */
import { Typography } from "@material-ui/core";

const WarningText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "warning",
      ...sx,
    }}
    {...rest}
    className="warning-text"
  >
    {children}
  </Typography>
);

export default WarningText;
