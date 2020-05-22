// @jsx jsx
// @ts-ignore
import { jsx, SystemStyleObject } from "theme-ui";
import * as React from "react";

import { BaseLayout, MainContent } from "@splitgraph/tdesign";
import { HeaderRight } from "../HeaderRight";

export interface IInnerPageLayoutProps {
  children?: React.ReactNode;
  extraStyle?: SystemStyleObject;
}

const InnerPageLayout = ({
  children,
  extraStyle = {},
}: IInnerPageLayoutProps) => {
  return (
    <BaseLayout
      extraHeaderStyle={{
        borderWidth: "0 !important",
      }}
      renderHeaderRight={() => <HeaderRight />}
      extraStyle={{
        minHeight: "100vh",
        header: {
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          width: "100%",
          maxWidth: "100vw",
          paddingLeft: ["0.5rem", "2rem", "calc((100% - 120ch)/2)"],
          // paddingLeft: ["1rem", "1rem", "calc((100% - 100ch)/2)"],
          // paddingRight: ["1rem", "1rem", "calc((100% - 100ch)/2)"],
          background:
            "linear-gradient(to bottom,rgba(13,24,33,1) 0%,rgba(54,102,141,1) 100%)",
          h1: {
            color: "light",
            fontSize: [5, 5, 6],
            marginBottom: "2rem",
          },
        },
        ".main-content": {
          maxWidth: "100vw",
          a: {
            variant: "links.primary",
          },
          ...(extraStyle.hasOwnProperty(".main-content")
            ? extraStyle[".main-content"]
            : {}),
        },
        "section, article": {
          paddingLeft: ["0.5rem", "2rem", "calc((100% - 120ch)/2)"],
          paddingRight: ["0.5rem", "2rem", "calc((100% - 120ch)/2)"],
          maxWidth: "100vw",
          ...(extraStyle.hasOwnProperty("section")
            ? extraStyle["section"]
            : {}),
        },
        ...extraStyle,
      }}
    >
      <MainContent>{children}</MainContent>
    </BaseLayout>
  );
};

export default InnerPageLayout;
