import { Box } from "../../index";

const Style = {
  backgroundColor: "#fff"
};

export default ({ children, gridArea = "content" }) => (
  <Box sx={{ gridArea, ...Style }}>{children}</Box>
);
