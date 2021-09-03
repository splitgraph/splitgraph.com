import { Box } from "@material-ui/core";

interface IHorizontalDividerProps {
  children?: React.ReactNode;
}

const HorizontalDivider = ({ children, ...rest }: IHorizontalDividerProps) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Box
      sx={{
        marginBottom: 2,
        minHeight: "2px",
        backgroundColor: "muted",
      }}
      {...rest}
    >
      {children}
    </Box>
  </Box>
);

export default HorizontalDivider;
