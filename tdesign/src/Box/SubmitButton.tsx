import { Box } from "@mui/material";

export interface BoxProps {}

const BoxOverride = (props: BoxProps) => <Box {...props} />;

export default BoxOverride;
