import "@csstools/normalize.css";
import "@splitgraph/design/css/base.css";

// Note: Ideally we could import sphinxtheme as a module in only the sphinx
//       pages, but that requires upating the Sphinx -> mdx transform files
//       to make sure that every className is correctly prefixed (todo later)
import "@splitgraph/design/css/sphinxtheme.css";
import { DefaultSeo } from "next-seo";
import App from "next/app";
import { matomoInit } from "@splitgraph/tdesign";

const MATOMO_URL = process.env.MATOMO_RELATIVE_URL;
const MATOMO_JS_FILE = process.env.MATOMO_JS_FILE;
const MATOMO_PHP_FILE = process.env.MATOMO_PHP_FILE;
const MATOMO_SITE_ID = process.env.MATOMO_SITE_ID;
const SEO_BASE_URL = process.env.SEO_CANONICAL_BASE_URL;

class SplitgraphWebsiteApp extends App {
  componentDidMount() {
    matomoInit({
      url: MATOMO_URL,
      siteId: MATOMO_SITE_ID,
      jsTrackerFile: MATOMO_JS_FILE,
      phpTrackerFile: MATOMO_PHP_FILE,
    });
  }

  render() {
    const { Component, pageProps } = this.props;

    const defaultDescription =
      "Data-Ops Reimagined: One PostgreSQL endpoint, 40k+ datasets. Build, version, query and share reproducible data images.";

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
            url: `${SEO_BASE_URL}/static/og-image-ddn.png`,
            width: 1200,
            height: 630,
            alt: "Splitgraph - DataOps Reimagined",
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
}

export default SplitgraphWebsiteApp;
