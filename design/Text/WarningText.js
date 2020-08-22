import { Text } from "rebass";

export default ({ children, sx = {}, ...rest }) => (
  <Text
    sx={{
      color: "warning",
      ...sx,
    }}
    {...rest}
    className="warning-text"
  >
    {children}
  </Text>
);
