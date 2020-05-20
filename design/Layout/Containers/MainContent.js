import { Box } from "../../index";

const Style = {
  backgroundColor: "#fff",
  // 3rem for header size
  minHeight: "calc(100vh - 3rem)",
};

export default ({ children }) => (
  <Box className="main-content" sx={{ ...Style }}>
    {children}
  </Box>
);
