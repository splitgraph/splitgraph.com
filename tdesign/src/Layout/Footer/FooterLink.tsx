/** @jsxImportSource theme-ui */
// @ts-ignore
import * as React from "react";

export interface IFooterLinkProps {
  Link?: React.FunctionComponent<any>;
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ Link, href, children }: IFooterLinkProps) => {
  const HTMLLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;

  return !!Link ? (
    <Link href={href}>{children}</Link>
  ) : (
    <HTMLLink href={href}>{children}</HTMLLink>
  );
};

export default FooterLink;
