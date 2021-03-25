/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";

const MutedText = ({ children, sx = {}, ...rest }) => (
  <Text
    sx={{
      color: "muted",
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Text>
);

export default MutedText;
