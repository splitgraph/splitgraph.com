// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

import FooterLink from "./FooterLink";

export interface IFooterSectionProps {
  header: string;
  links: [string, string][];
  extraStyle?: SystemStyleObject;
  Link: React.FunctionComponent<any>;
}

const FooterSection = ({
  header,
  links,
  extraStyle = {},
  Link,
}: IFooterSectionProps) => {
  return (
    <Box className="footer-section" sx={extraStyle}>
      <h3 className="footer-section-header">{header}</h3>
      <ul>
        {links.map(([href, anchor]) => (
          <li key={`${anchor}`}>
            <FooterLink Link={Link} href={href}>
              {anchor}
            </FooterLink>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default FooterSection;
