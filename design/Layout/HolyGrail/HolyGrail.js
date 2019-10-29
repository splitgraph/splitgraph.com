import { Box } from "../../index";

export const GridArea = {
  Header: "header",
  Nav: "nav",
  Content: "content",
  Side: "side",
  Footer: "footer"
};

export default ({ children }) => (
  <Box
    sx={{
      display: "grid",
      gridGap: 4,
      gridTemplateAreas: `
          "${GridArea.Header} ${GridArea.Header}  ${GridArea.Header}"
          "${GridArea.Nav}    ${GridArea.Content} ${GridArea.Side}"
          "${GridArea.Footer} ${GridArea.Footer}  ${GridArea.Footer}"
      `,
      gridTemplateColumns: "300px 1fr 200px",
      gridTemplateRows: "auto 1fr auto",
      gridGap: 0,
      height: "100vh",
      "@media (max-width: 768px)": {
        gridTemplateAreas: `
          "${GridArea.Header}"
          "${GridArea.Nav}"
          "${GridArea.Content}"
          "${GridArea.Side}"
          "${GridArea.Footer}"
        `,
        gridTemplateColumns: "1fr",
        gridTemplateRows: `
          minmax(3rem, auto)
          minmax(4rem, auto)
          1fr
          minmax(75px, auto)
          auto
        `
      }
    }}
  >
    {children}
  </Box>
);
