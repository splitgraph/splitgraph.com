import defaultTheme from "../../themes/defaultTheme";

import { ThemeProvider } from "theme-ui";

const BaseLayout = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default BaseLayout;
