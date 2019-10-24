import { Flex, Box } from "rebass";

const lineStyle = {
  marginBottom: 2,
  height: "1px",
  backgroundColor: "lightgray"
};

const middleStyle = {
  marginBottom: 2,
  height: "2rem",
  color: "lightgray",
  display: "inline-flex"
};

const DividerLine = ({ sx = {} }) => (
  <Box
    width={2 / 5}
    sx={{
      ...lineStyle,
      ...sx
    }}
  >
    &nbsp;
  </Box>
);

const MiddleSegment = ({ children, sx = {} }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    width={1 / 5}
    sx={{
      ...middleStyle,
      ...sx
    }}
  >
    {children}
  </Flex>
);

export default ({ width = 9 / 10, sx = {}, children }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    width={width}
    minHeight={"1rem"}
  >
    <DividerLine sx={sx} />

    <MiddleSegment>{children}</MiddleSegment>

    <DividerLine sx={sx} />
  </Flex>
);
