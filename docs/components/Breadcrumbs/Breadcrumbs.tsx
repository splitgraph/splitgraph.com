/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx, ThemeUIStyleObject } from "theme-ui";

import { Link } from "../Link";

export interface IBreadcrumbsProps {
  crumbs: {
    href: string | null;
    anchor: string;
  }[];
}

const breadcrumbsListStyle = {
  listStyle: "none",
  color: "heavy",
  padding: 0,
  li: {
    display: "inline",
    paddingRight: 1,
  },
  "li:not(:last-of-type):after": {
    paddingLeft: "1ch",
    paddingRight: "1ch",
    content: '"\\00BB"',
  },
  a: {
    variant: "links.primary",
  },
} as ThemeUIStyleObject;

const Breadcrumbs = ({ crumbs }: IBreadcrumbsProps) => {
  return (
    <ul sx={breadcrumbsListStyle}>
      {crumbs.map(({ href, anchor }) => (
        <li key={anchor}>
          {href ? <Link href={href}>{anchor}</Link> : <span>{anchor}</span>}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
