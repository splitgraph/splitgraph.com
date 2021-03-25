/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";

const DangerText = ({ children, sx = {}, ...rest }) => (
  <Text
    sx={{
      color: "danger",
      ...sx,
    }}
    {...rest}
    className="danger-text"
  >
    {children}
  </Text>
);

export default DangerText;
