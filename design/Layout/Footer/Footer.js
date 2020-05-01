import { Box } from "../../index";

export default ({ children, gridArea = "footer" }) => (
  <Box backgroundColor="heavy" sx={{ gridArea, color: "background" }}>
    {children}
  </Box>
);
