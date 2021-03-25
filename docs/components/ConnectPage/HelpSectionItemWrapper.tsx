/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

export interface IHelpSectionItemWrapperProps {
  HelpSectionMarkdownComponent: any;
  mdxComponents?: any;
  defaultCollapsed?: boolean;
}

const HelpSectionItemWrapper = ({
  mdxComponents,
  HelpSectionMarkdownComponent,
  defaultCollapsed = true,
}: IHelpSectionItemWrapperProps) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const H1Component = React.useMemo(
    () => ({ children, ...rest }) => (
      <h1
        className="header-control"
        onClick={(_) => setCollapsed(!collapsed)}
        sx={
          {
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            color: "heavy",
            borderBottom: "1px solid",
            borderBottomColor: "heavy",
            textAlign: "left !important",
            fontWeight: 200,
            ":hover": {
              cursor: "pointer",
            },
            ":after": {
              paddingLeft: "1ch",
              paddingRight: "1ch",
              content: '"\\27F6"',
            },
          } as SystemStyleObject
        }
        {...rest}
      >
        {children}
      </h1>
    ),
    [collapsed]
  );

  return (
    <Box
      sx={{
        "nav.toc": {
          display: "none",
        },
        "section > :not(.header-control)": {
          display: collapsed ? "none" : "inherit",
        },
        a: {
          variant: "links.primary",
          textDecoration: "underline",
        },
        img: {
          maxWidth: "100%",
        },
      }}
    >
      <HelpSectionMarkdownComponent
        components={{ ...mdxComponents, h1: H1Component }}
      />
    </Box>
  );
};

export default HelpSectionItemWrapper;
