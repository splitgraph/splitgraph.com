/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";

const WarningText = ({ children, sx = {}, ...rest }) => (
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

export default WarningText;
