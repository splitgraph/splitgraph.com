// @jsx jsx
import { jsx } from "theme-ui";

export default ({ sx = {}, children, ...rest }) => {
  return (
    <h2
      sx={{
        color: "lightgray",
        ...sx
      }}
      {...rest}
    >
      {children}
    </h2>
  );
};
