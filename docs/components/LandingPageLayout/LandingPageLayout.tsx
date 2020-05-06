// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { BaseLayout, MainContent } from "@splitgraph/tdesign";
import { HeaderRight } from "../HeaderRight";

export interface ILandingPageLayoutProps {
  children?: React.ReactNode;
}

export default ({ children }: ILandingPageLayoutProps) => {
  return (
    <BaseLayout
      extraHeaderStyle={{
        borderWidth: "0 !important",
      }}
      renderHeaderRight={() => <HeaderRight />}
    >
      <MainContent>{children}</MainContent>
    </BaseLayout>
  );
};
