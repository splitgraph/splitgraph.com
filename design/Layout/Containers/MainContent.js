import { Box } from "../../index";

const Style = {
  paddingLeft: "1rem",
  paddingRight: "1rem"
  // overflowX: "hidden"
};

export default ({ children, gridArea = "content" }) => (
  <Box sx={{ gridArea, ...Style }} backgroundColor="gray">
    {children}
  </Box>
);
