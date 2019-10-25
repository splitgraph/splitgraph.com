import { Box } from "../../index";

export default ({ children, gridArea = "header" }) => (
  <Box sx={{ gridArea }} backgroundColor="primary">
    {children}
  </Box>
);
