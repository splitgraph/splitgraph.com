import { Box } from "@mui/material";
const Heading = ({ sx = {}, children, ...rest }) => {
  return (
    <Box
      component="h1"
      sx={{
        fontSize: "32px",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Heading;
