import { Text } from "rebass";

export default ({ children, sx = {}, ...rest }) => (
  <Text
    sx={{
      color: "muted",
      ...sx
    }}
    {...rest}
  >
    {children}
  </Text>
);
