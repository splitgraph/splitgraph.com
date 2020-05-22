// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { BoxOne } from "../Boxes/BoxOne";
import { Link } from "../Link";

interface IBlogPostMetadata {
  id: string;
  title: string;
  authors: string[];
  date: string;
  topics?: string[];
  related?: string[];
  description: string[];
}

export interface IBlogPostItemProps {
  url: string;
  slug: string;
  metadata: IBlogPostMetadata;
}

const BlogPostItem = ({ url, slug, metadata }: IBlogPostItemProps) => {
  return (
    <BoxOne
      key={slug}
      renderHeading={() => metadata.title}
      renderBody={() => metadata.description}
      renderFooter={() => <Link href={url}>Read Post</Link>}
    />
  );
};

export default BlogPostItem;
