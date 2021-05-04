import { useState, useMemo } from "react";
import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

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
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const H1Component = useMemo(
    () => ({ children, ...rest }) => (
      <Box
        component="h1"
        className="header-control"
        onClick={(_) => setCollapsed(!collapsed)}
        sx={
          {
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            color: "heavy",
            borderBottom: "1px solid",
            borderBottomColor: "heavy.main",
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
          } as SxProps<Theme>
        }
        {...rest}
      >
        {children}
      </Box>
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
