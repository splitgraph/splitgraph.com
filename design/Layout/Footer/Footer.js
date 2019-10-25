import { Box } from "../../index";

export default ({ children, gridArea = "footer" }) => (
  <Box backgroundColor="red" sx={{ gridArea }}>
    {children}
  </Box>
);
