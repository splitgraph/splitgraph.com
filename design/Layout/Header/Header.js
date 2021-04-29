/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

const Header = ({ children, gridArea = "header" }) => (
  <Box
    sx={{
      gridArea,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "4px",
      a: {
        variant: "links.muted",
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
    }}
    backgroundColor="primary"
  >
    {children}
  </Box>
);

export default Header;
