import { InputLabel as Label } from "@mui/material";

const LabelComponent = ({ sx = {}, children, ...rest }) => (
  <Label
    sx={{
      fontSize: "14px",
      fontWeight: "heading",
      paddingBottom: 2,
      // color: "gray.main",
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Label>
);

export default LabelComponent;
