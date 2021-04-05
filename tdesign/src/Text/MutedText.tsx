/** @jsxImportSource theme-ui */
import { Typography } from "@material-ui/core";

const MutedText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "muted",
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Typography>
);

export default MutedText;
