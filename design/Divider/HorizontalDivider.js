import { Flex, Box } from "rebass";

const HorizontalDivider = ({ width = 9 / 10, sx = {}, children, ...rest }) => <Flex justifyContent="center">
  <Box
    width={width}
    sx={{
      marginBottom: 2,
      minHeight: "2px",
      backgroundColor: "muted",
      ...sx
    }}
  >
    {children}
  </Box>
</Flex>;

export default HorizontalDivider;
