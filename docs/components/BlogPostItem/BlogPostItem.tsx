import { Box } from "@material-ui/core";
import { MuiLink as Link } from "@splitgraph/tdesign";
import formatDate from "../BlogPost/formatDate";

interface IBlogPostMetadata {
  id: string;
  title: string;
  authors: string[];
  date: string;
  topics?: string[];
  description: string;
  related?: {
    url: string;
    metadata: Omit<IBlogPostMetadata, "related">;
  }[];
}

export type { IBlogPostMetadata };

export interface IBlogPostItemProps {
  url: string;
  metadata: IBlogPostMetadata;
}

const itemBoxStyle = {
  // variant: "links.unstyled",
  backgroundColor: "white !important",
  padding: "1rem",
  boxShadow: "0 0 4px rgba(0, 0, 0, .125)", //formerly 'card' TODO MUI-ify more idiomatically
  display: "flex",
  width: "100%",
  flexDirection: "column",
  marginBottom: "2rem",
  ":hover": {
    boxShadow: "0 0 4px rgba(0, 0, 0, .5)", //formerly cardHover. TODO MUI-ify
    textDecoration: "none !important",
  },
  ".top-row": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "2rem",
  },
  ".blog-title": {
    fontWeight: "bold",
    color: "primary.main",
    fontSize: "1.5rem",
    paddingRight: "1rem",
  },
  ".blog-byline": {
    color: "heavy.main",
    opacity: "0.5",
    fontStyle: "italic",
    textTransform: "uppercase",
    fontSize: "small",
    minWidth: "15ch",
    textAlign: "right",
  },
  ".blog-description": {
    color: "heavy.main",
  },
};

const BlogPostItem = ({ url, metadata }: IBlogPostItemProps) => {
  const formattedDate = formatDate(metadata.date);

  return (
    <Link href={url} sx={itemBoxStyle}>
      <Box className="top-row">
        <Box className="blog-title">{metadata.title}</Box>
        <Box className="blog-byline" title={formattedDate.hoverValue}>
          {formattedDate.value}
        </Box>
      </Box>
      <Box className="bot-row blog-description">{metadata.description}</Box>
    </Link>
  );
};

export default BlogPostItem;
