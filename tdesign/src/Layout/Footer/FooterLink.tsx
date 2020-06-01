// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

export interface IFooterLinkProps {
  Link: React.FC<any>;
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ Link, href, children }: IFooterLinkProps) => {
  return <Link href={href}>{children}</Link>;
};

export default FooterLink;
