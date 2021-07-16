import { ThemeProvider } from "@emotion/react";
import { theme } from "@splitgraph/tdesign/src/themes/design";
import Header from "@splitgraph/docs/components/Header/Header";
import Tabs from "@splitgraph/docs/sections/Tabs/Tabs";

const ThemeDemo = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Tabs />
    </ThemeProvider>
  );
};

export default ThemeDemo;
