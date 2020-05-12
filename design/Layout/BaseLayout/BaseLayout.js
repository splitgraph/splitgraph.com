import defaultTheme from "../../themes/defaultTheme";

import { ThemeProvider } from "theme-ui";

const BaseLayout = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      {children}
      {/* <style jsx global>{`
        body {
          font-family: "Open Sans", sans-serif;
        }
      `}</style> */}
    </ThemeProvider>
  );
};

export default BaseLayout;
