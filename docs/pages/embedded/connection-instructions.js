// @jsx jsx
// @ts-ignore
import { jsx, Box, Text } from "theme-ui";

import React from "react";

import { NextSeo } from "next-seo";

import {
  Footer,
  PreWithCopy,
  GitHubOAuthButton,
  GitLabOAuthButton,
  GoogleOAuthButton,
  IconLogoDiscord,
} from "@splitgraph/tdesign";

import withTheme from "../../hocs/withTheme";
import { LandingPageLayout } from "../../components/LandingPageLayout";

import { Link } from "@splitgraph/docs/components";

import compiledSqlClientInstructions from "@splitgraph/docs/compile/compiledSqlClientInstructions";

import dynamic from "next/dynamic";

const ConnectionInstructions = ({ BASE_DIR, components }) => {
  // The relative path is fragile, but it's the best solution I've found in dev so far
  // Also note that this does not support SSR
  const Articles = components.map(({ ComponentName }) =>
    dynamic(() =>
      import(`../../../content/sql-client-instructions/${ComponentName}.mdx`)
    )
  );

  return (
    <LandingPageLayout>
      <NextSeo title="Work with data like you work with code" />
      <>
        {Articles.map((MD, index) => (
          <MD key={index} />
        ))}

        <pre>{JSON.stringify({ BASE_DIR, components }, null, 2)}</pre>
      </>
      <Footer Link={Link} />
    </LandingPageLayout>
  );
};

export async function getStaticProps() {
  return {
    props: compiledSqlClientInstructions,
  };
}

// export async function getStaticPaths() {
//   const topics = getTopics(allBlogPosts.children);

//   return {
//     paths: topics.map((topic) => ({ params: { topic } })),
//     fallback: false,
//   };
// }

export default withTheme(ConnectionInstructions);
