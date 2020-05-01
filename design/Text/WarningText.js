import { Text } from "rebass";

export default ({ children, sx = {}, ...rest }) => (
  <Text
    sx={{
      color: "warning",
      ...sx
    }}
    {...rest}
  >
    {children}
  </Text>
);
