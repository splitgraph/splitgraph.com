import { Box } from "@material-ui/core";

const SubHeading = ({ sx = {}, children, ...rest }) => {
  return (
    <Box
      component="h2"
      sx={{
        color: "lightgray",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default SubHeading;
