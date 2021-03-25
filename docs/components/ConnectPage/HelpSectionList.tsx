/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx, Text } from "theme-ui";
import * as React from "react";

import HelpSectionItemWrapper from "./HelpSectionItemWrapper";

export interface IHelpSectionListProps {
  HelpSections?: any[];
  mdxComponents?: any;
}

const HelpSectionList = ({
  HelpSections = [],
  mdxComponents = {},
}: IHelpSectionListProps) => {
  return (
    <>
      {HelpSections.map((HelpSectionMarkdownComponent, index) => (
        <HelpSectionItemWrapper
          HelpSectionMarkdownComponent={HelpSectionMarkdownComponent}
          key={index}
          mdxComponents={mdxComponents}
          defaultCollapsed={index !== 0}
        />
      ))}
    </>
  );
};

export default HelpSectionList;
