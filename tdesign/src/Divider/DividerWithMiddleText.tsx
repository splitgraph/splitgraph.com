/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

const middleStyle = {
  marginBottom: 2,
  height: "2rem",
  color: "lightgray",
  display: "inline-flex",
};

const MiddleSegment = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      widdth: 1 / 5,
      ...middleStyle,
    }}
  >
    {children}
  </Box>
);

const DividerWithMiddleText = ({ width = 9 / 10, children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: width,
      minHeight: "1rem",
    }}
  >
    <div
      sx={{
        width: "100%",
        // height: "1px",
        border: "1px solid lightgray",
        marginRight: "1em",
      }}
    />

    <MiddleSegment>{children}</MiddleSegment>

    <div
      sx={{
        width: "100%",
        border: "1px solid lightgray",
        marginLeft: "1em",
      }}
    />
  </Box>
);

export default DividerWithMiddleText;
