import { Typography } from "@material-ui/core";

const SuccessText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "success.main",
      ...sx,
    }}
    className="success-text"
    {...rest}
  >
    {children}
  </Typography>
);

export default SuccessText;
