import { Box } from "../../index";

const Style = {
  backgroundColor: "#fff",
  "@media (min-width: 769px)": {
    overflowY: "scroll",
    paddingBottom: "8rem"
  },
  // 3rem for header size
  minHeight: "calc(100vh - 3rem)"
};

export default ({ children, gridArea = "content" }) => (
  <Box sx={{ gridArea, ...Style }}>{children}</Box>
);
