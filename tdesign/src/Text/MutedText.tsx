import { Typography } from "@mui/material";

const MutedText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "muted.main",
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Typography>
);

export default MutedText;
