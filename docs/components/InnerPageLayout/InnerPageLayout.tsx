import * as React from "react";

import { BaseLayout, Footer, MainContent } from "@splitgraph/tdesign";
import { HeaderRight } from "../HeaderRight";
import { MuiLink as Link } from "@splitgraph/tdesign";

export interface IInnerPageLayoutProps {
  children?: React.ReactNode;
  extraStyle?: object;
  charWidth?: number;
}

const InnerPageLayout = ({
  children,
  extraStyle = {},
  charWidth = 120,
}: IInnerPageLayoutProps) => {
  return (
    <BaseLayout
      brandmarkURL={"/static/brandmark.svg"}
      wordmarkURL={"/static/brandmark.svg"}
      logoText={"Splitgraph"}
      brandName={"Splitgraph"}
      extraHeaderStyle={{
        borderWidth: "0 !important",
      }}
      renderHeaderRight={() => <HeaderRight />}
      extraStyle={{
        display: "flex",
        flexDirection: "column",
        header: {
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          width: "100%",
          maxWidth: "100vw",
          paddingLeft: ["0.5rem", "2rem", `calc((100% - ${charWidth}ch)/2)`],
          // paddingLeft: ["1rem", "1rem", "calc((100% - 100ch)/2)"],
          // paddingRight: ["1rem", "1rem", "calc((100% - 100ch)/2)"],
          background:
            "linear-gradient(to bottom,rgba(13,24,33,1) 0%,rgba(54,102,141,1) 100%)",
          h1: {
            color: "light.main",
            fontSize: ["40px", "40px", "48px"],
            marginBottom: "2rem",
          },
        },
        ".main-content": {
          maxWidth: "100vw",
          "a :not(footer a)": {
            // variant: "links.primary",
          },
          ...(extraStyle.hasOwnProperty(".main-content")
            ? extraStyle[".main-content"]
            : {}),
        },
        "header, .padded-header": {
          paddingLeft: ["0.5rem", "2rem", `calc((100vw - ${charWidth}ch)/2)`],
          paddingRight: ["0.5rem", "2rem", `calc((100vw - ${charWidth}ch)/2)`],
        },
        "section, nav": {
          paddingLeft: ["0.5rem", "2rem", `calc((100% - ${charWidth}ch)/2)`],
          paddingRight: ["0.5rem", "2rem", `calc((100% - ${charWidth}ch)/2)`],
          maxWidth: "100vw",
          ...(extraStyle.hasOwnProperty("section")
            ? extraStyle["section"]
            : {}),
        },

        // Compensate for double counting <section> selector when <section> is
        // part of the <article>
        "article section": {
          marginLeft: [
            "-0.5rem !important",
            "-2rem !important",
            `calc(-1 * (100% - ${charWidth}ch)/2) !important`,
          ],
          marginRight: [
            "-0.5rem !important",
            "-2rem !important",
            `calc(-1 * (100% - ${charWidth}ch)/2) !important`,
          ],
        },
        pre: {
          marginLeft: ["-1.5rem", 0, 0],
          marginRight: ["-1.5rem", 0, 0],
          paddingLeft: ["1.5rem", "1ch", "1ch"],
          paddingRight: ["1.5rem", "1ch", "1ch"],
        },
        ...extraStyle,
      }}
    >
      <MainContent>{children}</MainContent>
      <Footer Link={Link} />
    </BaseLayout>
  );
};

export default InnerPageLayout;
