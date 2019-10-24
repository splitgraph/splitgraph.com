// @jsx jsx
import { jsx } from "theme-ui";

export default ({ sx = {}, children, ...rest }) => {
  return (
    <h1
      sx={{
        fontSize: 5,
        ...sx
      }}
      {...rest}
    >
      {children}
    </h1>
  );
};
