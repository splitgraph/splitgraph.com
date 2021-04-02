/** @jsxImportSource theme-ui */
import { Box } from "../../index";

const Header = ({ children, gridArea = "header" }) => (
  <Box
    sx={{
      gridArea,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: "4px",
      paddingLeft: "4px",
      a: {
        variant: "links.muted",
        // textDecoration: "underline",
        fontWeight: "bold",
        marginRight: "1ch",
      },
      ".button-link": {
        border: "1px solid",
        borderColor: "light",
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
