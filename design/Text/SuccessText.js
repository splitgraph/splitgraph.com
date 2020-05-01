import { Text } from "rebass";

export default ({ children, sx = {}, ...rest }) => (
  <Text
    sx={{
      color: "success",
      ...sx
    }}
    {...rest}
  >
    {children}
  </Text>
);
