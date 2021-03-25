import { Text } from "rebass";

const DangerText = ({ children, sx = {}, ...rest }) => <Text
  sx={{
    color: "danger",
    ...sx,
  }}
  {...rest}
  className="danger-text"
>
  {children}
</Text>;

export default DangerText;
