import { Text } from "rebass";

const WarningText = ({ children, sx = {}, ...rest }) => <Text
  sx={{
    color: "warning",
    ...sx,
  }}
  {...rest}
  className="warning-text"
>
  {children}
</Text>;

export default WarningText;
