/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

const HorizontalDivider = ({ width = 9 / 10, sx = {}, children, ...rest }) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Box
      width={width}
      sx={{
        marginBottom: 2,
        minHeight: "2px",
        backgroundColor: "muted",
        ...sx,
      }}
    >
      {children}
    </Box>
  </Box>
);

export default HorizontalDivider;
