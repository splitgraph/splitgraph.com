// import defaultTheme from "../../themes/defaultTheme";

// import defaultTheme from "@splitgraph/design/themes/defaultTheme";
import { makeDefaultTheme } from "@splitgraph/tdesign";

import { ThemeProvider } from "theme-ui";

const defaultTheme = makeDefaultTheme();

const BaseLayout = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default BaseLayout;
