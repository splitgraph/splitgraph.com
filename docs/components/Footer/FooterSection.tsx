// @jsx jsx
// @ts-ignore
import { jsx, Box } from "theme-ui";
import * as React from "react";

import FooterLink from "./FooterLink";

export interface IFooterSectionProps {
  header: string;
  links: [string, string][];
}

const FooterSection = ({ header, links }: IFooterSectionProps) => {
  return (
    <Box className="footer-section">
      <h3 className="footer-section-header">{header}</h3>
      <ul>
        {links.map(([href, anchor]) => (
          <li>
            <FooterLink href={href}>{anchor}</FooterLink>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default FooterSection;
