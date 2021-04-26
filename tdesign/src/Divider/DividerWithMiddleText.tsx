import { Box } from "@material-ui/core";

const MiddleSegment = ({ children }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "20%",
      marginBottom: 2,
      height: "2rem",
      color: "lightgray",
    }}
  >
    {children}
  </Box>
);

const DividerWithMiddleText = ({ width = "90%", children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: width,
      minHeight: "1rem",
    }}
  >
    <Box
      sx={{
        width: "100%",
        // height: "1px",
        border: "1px solid lightgray",
        marginRight: "1em",
      }}
    />

    <MiddleSegment>{children}</MiddleSegment>

    <Box
      sx={{
        width: "100%",
        border: "1px solid lightgray",
        marginLeft: "1em",
      }}
    />
  </Box>
);

export default DividerWithMiddleText;
