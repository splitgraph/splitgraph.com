import { Text } from "rebass";

export default ({ children, sx = {}, ...rest }) => (
  <Text
    sx={{
      color: "danger",
      ...sx
    }}
    {...rest}
  >
    {children}
  </Text>
);
