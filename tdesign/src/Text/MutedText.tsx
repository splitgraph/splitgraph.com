import { Typography } from "@material-ui/core";

const MutedText = ({ children, sx = {}, ...rest }) => (
  <Typography
    sx={{
      color: "#f6f6f9", //TODO use MUI theme
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Typography>
);

export default MutedText;
