import { Box } from "@splitgraph/design";

export default ({ children, gridArea = "nav" }) => (
  <Box sx={{ gridArea }} ml="0.5rem">
    {children}
  </Box>
);
