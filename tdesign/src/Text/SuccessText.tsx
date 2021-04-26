import { Typography } from "@material-ui/core";

const SuccessText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "#3B8D36", //TODO use MUI theme
      ...sx,
    }}
    className="success-text"
    {...rest}
  >
    {children}
  </Typography>
);

export default SuccessText;
