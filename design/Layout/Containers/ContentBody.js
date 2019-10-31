import { Box } from "../../index";

const getStyle = depth => ({
  paddingLeft: 4,
  paddingRight: 2
});

export default ({ children, depth }) => {
  return <Box sx={getStyle(depth)}>{children}</Box>;
};
