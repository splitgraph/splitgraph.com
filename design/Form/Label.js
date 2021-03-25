import { Label } from "@rebass/forms";

const LabelComponent = ({ sx = {}, children, ...rest }) => <Label
  sx={{
    fontSize: 1,
    fontWeight: "heading",
    paddingBottom: 2,
    // color: "gray",
    ...sx
  }}
  {...rest}
>
  {children}
</Label>;

export default LabelComponent;
