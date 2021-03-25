import { Text } from "rebass";

const MutedText = ({ children, sx = {}, ...rest }) => <Text
  sx={{
    color: "muted",
    ...sx
  }}
  {...rest}
>
  {children}
</Text>;

export default MutedText;
