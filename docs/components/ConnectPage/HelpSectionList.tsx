/** @jsxImportSource theme-ui */
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
