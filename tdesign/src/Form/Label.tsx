import { InputLabel as Label } from "@material-ui/core";

const LabelComponent = ({ sx = {}, children, ...rest }) => (
  <Label
    sx={{
      fontSize: "14px",
      fontWeight: "heading",
      paddingBottom: 2,
      // color: "gray",
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Label>
);

export default LabelComponent;
