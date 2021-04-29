import { Box } from "@material-ui/core";

const HorizontalDivider = ({ children, ...rest }) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Box
      sx={{
        marginBottom: 2,
        minHeight: "2px",
        backgroundColor: "muted",
      }}
      {...rest}
    >
      {children}
    </Box>
  </Box>
);

export default HorizontalDivider;
