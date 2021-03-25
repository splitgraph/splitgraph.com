/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";

const SuccessText = ({ children, sx = {}, ...rest }) => (
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

export default SuccessText;
