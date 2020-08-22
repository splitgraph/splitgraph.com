import { Text } from "rebass";

export default ({ children, sx = {}, ...rest }) => (
  <Text
    sx={{
      color: "success",
      ...sx,
    }}
    className="success-text"
    {...rest}
  >
    {children}
  </Text>
);
