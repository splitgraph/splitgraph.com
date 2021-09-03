import { Box } from "@material-ui/core";
import { MuiLink as Link } from "@splitgraph/tdesign";

export interface IBreadcrumbsProps {
  crumbs: {
    href: string | null;
    anchor: string;
  }[];
}

const breadcrumbsListStyle = {
  listStyle: "none",
  color: "heavy.main",
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
};

const Breadcrumbs = ({ crumbs }: IBreadcrumbsProps) => {
  return (
    <Box component="ul" sx={breadcrumbsListStyle}>
      {crumbs.map(({ href, anchor }) => (
        <li key={anchor}>
          {href ? <Link href={href}>{anchor}</Link> : <span>{anchor}</span>}
        </li>
      ))}
    </Box>
  );
};

export default Breadcrumbs;
