import { Typography } from "@mui/material";

const WarningText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "orange", //TODO use MUI theme
      ...sx,
    }}
    {...rest}
    className="warning-text"
  >
    {children}
  </Typography>
);

export default WarningText;
