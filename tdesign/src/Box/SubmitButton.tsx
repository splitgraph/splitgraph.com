import { Box } from "@material-ui/core";

export interface BoxProps {}

const BoxOverride = (props: BoxProps) => <Box {...props} />;

export default BoxOverride;
