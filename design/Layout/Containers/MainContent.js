import { Box } from "../../index";

export default ({ children, gridArea = "content" }) => (
  <Box sx={{ gridArea }} backgroundColor="gray">
    {children}
  </Box>
);
