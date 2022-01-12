import { Box } from "@mui/material";

const Header = ({ children, gridArea = "header" }) => (
  <Box
    sx={{
      gridArea,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "4px",
      a: {
        color: "muted.main",
        // textDecoration: "underline",
        fontWeight: "bold",
        marginRight: "1ch",
      },
      ".button-link": {
        border: "1px solid",
        borderColor: "light.main",
        padding: "0.5ch",
        borderRadius: "0.5ch",
      },
      backgroundColor: "primary.main",
    }}
  >
    {children}
  </Box>
);

export default Header;
