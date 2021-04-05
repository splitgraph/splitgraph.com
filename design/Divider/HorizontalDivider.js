/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

/* NOTE 20210406: this file appears to not be used? */

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
