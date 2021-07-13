import { ThemeProvider } from "@emotion/react";
import { theme } from "@splitgraph/tdesign/src/themes/design";
import StyledComponents from "@splitgraph/docs/components/DemoComponents/styled-components";
import Header from "@splitgraph/docs/components/Header/Header";

const ThemeDemo = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
};

export default ThemeDemo;
