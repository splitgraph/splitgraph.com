import { Typography } from "@material-ui/core";

const DangerText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "danger.main",
      ...sx,
    }}
    {...rest}
    className="danger-text"
  >
    {children}
  </Typography>
);

export default DangerText;
