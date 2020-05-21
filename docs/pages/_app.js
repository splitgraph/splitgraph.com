import "@csstools/normalize.css";
import "@splitgraph/design/css/base.css";

import { DefaultSeo } from "next-seo";

const SEO_BASE_URL = process.env.SEO_CANONICAL_BASE_URL;

export default function SplitgraphWebsiteApp({ Component, pageProps }) {
  const defaultDescription =
    "Work with data like you work with code. Create, share and extend" +
    " reproducible data. Inspired by Docker and Git, built for PostgreSQL.";

  const DEFAULT_SEO = {
    title: "Splitgraph",
    titleTemplate: "Splitgraph | %s",
    description: defaultDescription,
    canonical: SEO_BASE_URL,
    openGraph: {
      type: "website",
      url: `${SEO_BASE_URL}`,
      site_name: "Splitgraph",
      title: "Splitgraph",
      description: defaultDescription,
      images: [
        {
          url: `${SEO_BASE_URL}/static/splitgraph_logo_1200x1200.png`,
          width: 1200,
          height: 1200,
          alt: "Splitgraph Logo",
        },
      ],
    },
    twitter: {
      handle: "@splitgraph",
      site: "@splitgraph",
      cardType: "summary_large_image",
    },
  };

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
    </>
  );
}
