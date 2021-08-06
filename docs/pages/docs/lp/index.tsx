import { useEffect } from "react";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@splitgraph/tdesign/src/themes/design";
import Header from "@splitgraph/docs/components/Header/Header";
// import Footer from "@splitgraph/docs/components/Footer/Footer";
import Tabs from "@splitgraph/docs/sections/Tabs/Tabs";

const ThemeDemo = () => {
  const { asPath, pathname } = useRouter();
  let ref = asPath.replace(pathname, "").replace("#", "");
  ref = ref.charAt(0).toUpperCase() + ref.slice(1) + "Ref";

  useEffect(() => {
    if (!ref) return;
    scroller.scrollTo(ref, {
      duration: 800,
      smooth: true,
      offset: -100,
    });
  }, [ref]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Tabs />
      {/* <Footer /> */}
    </ThemeProvider>
  );
};

export default ThemeDemo;
