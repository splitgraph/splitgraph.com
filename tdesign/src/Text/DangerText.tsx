import { Typography } from "@mui/material";

const DangerText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "danger.main",
      maxWidth: "200px",
      textAlign: "center",
      ...sx,
    }}
    {...rest}
    className="danger-text"
  >
    {children}
  </Typography>
);

export default DangerText;
