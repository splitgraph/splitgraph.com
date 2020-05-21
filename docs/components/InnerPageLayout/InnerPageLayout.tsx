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
        ...extraStyle,
      }}
    >
      <MainContent>{children}</MainContent>
    </BaseLayout>
  );
};

export default InnerPageLayout;
