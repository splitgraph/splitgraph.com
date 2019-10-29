import { Box } from "../../index";

export default ({ children, gridArea = "header" }) => (
  <Box
    sx={{ gridArea, display: "flex", alignItems: "center" }}
    backgroundColor="primary"
  >
    {children}
  </Box>
);
