// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { Link } from "../Link";

export interface IFooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: IFooterLinkProps) => {
  return <Link href={href}>{children}</Link>;
};

export default FooterLink;
