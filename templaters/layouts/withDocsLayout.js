// @jsx jsx
import { jsx } from "theme-ui";
import React, { useMemo } from "react";

import { Link } from "@splitgraph/docs/components";

import {
  Box,
  Header,
  Footer,
  ContentHeader,
  ContentFooter,
  ContentBody,
  MainContent,
  Sidebar,
  Heading,
  HolyGrail,
  LogoImage,
  InterPageNav,
} from "@splitgraph/design";
import { BaseLayout } from "@splitgraph/design/Layout";

import { findNodeInTree } from "@splitgraph/lib/tree";

import { OnlyTOC } from "./contentWrappers";

import { defaultTheme } from "@splitgraph/design";

import { NextSeo } from "next-seo";
import { Helmet } from "react-helmet";

const mdxComponents = {
  pre: ({ children, ...rest }) => (
    <pre sx={defaultTheme.styles.pre} {...rest}>
      {children}
    </pre>
  ),
  code: ({ children, ...rest }) => (
    <code sx={defaultTheme.styles.code} {...rest}>
      {children}
    </code>
  ),
  inlineCode: ({ children, ...rest }) => (
    <code sx={defaultTheme.styles.inlineCode} {...rest}>
      {children}
    </code>
  ),
};

// TODO: Move this back into the docs repository (?) so no need to do this dumb
// dependency injection. It was only put into its own so that autogenned scripts
// could reference it by name instead of relative path, but that's fixed now.
const withDocsLayout = ({
  MdxPage,
  meta = {},
  contentTree,
  // Link,
  // getLinkType,
}) => {
  const DocsPageSeo = ({ currentURL }) => {
    const SEO_BASE_URL = process.env.SEO_CANONICAL_BASE_URL;

    const pageSeo = {
      title: `Documentation - ${meta.title}`,
      ...(meta.description ? { description: meta.description } : {}),
      canonical: `${SEO_BASE_URL}${currentURL}`,
      openGraph: {
        url: `${SEO_BASE_URL}${currentURL}`,
      },
    };

    return <NextSeo {...pageSeo} />;
  };

  mdxComponents.a = Link;

  // Grab the TOC out of the tree from MdxPage so we can render it separately
  // This is easier than writing a webpack loader. Tried portals, bad with SSR.
  const TocMdx = () => {
    return <MdxPage components={{ wrapper: OnlyTOC, a: Link }} />;
  };

  const WithDocsLayout = ({ router }) => {
    // next client thinks we're in the _content directory (technically we are),
    // even though we rewrote the URL. TODO: Factor out Link/router handling
    const currentURL = useMemo(
      () => router.pathname.replace(/^\/\_content/gm, ""),
      [router]
    );

    const activeNode = useMemo(
      () =>
        findNodeInTree({
          root: contentTree,
          match: (node) => node.url && node.url === currentURL,
        }),
      [currentURL]
    );

    const activeNodeId = useMemo(() => activeNode.nodeId, [activeNode]);
    const activeNodeDepth = useMemo(
      () =>
        activeNode.children && activeNode.children.length > 0
          ? activeNode.depth + 1
          : activeNode.depth,
      [activeNode]
    );

    const matchActiveNode = useMemo(
      () => (node) => node.url && node.url === currentURL,
      [currentURL]
    );

    return (
      <BaseLayout>
        <DocsPageSeo currentURL={currentURL} />

        <Helmet
          style={[
            {
              cssText: `
            body {
                overflow-x: hidden;

                /* so header doesn't disappear when clicking anchor tags */
                scroll-padding-top: 75px;
            }

            @media (min-width: 769px) {
              body {
                overflow-y: hidden !important;
              }
            }

            /* 1570px is when the right sidebar appears */
            @media (min-width: 1571px) {
              .main-content nav.toc {
                display: none;
              }
            }
        `,
            },
          ]}
        />

        <HolyGrail.Layout>
          <Header gridArea={HolyGrail.GridArea.Header}>
            <LogoImage logoURL="/static/splitgraph_logo.svg" />
          </Header>

          <Sidebar
            gridArea={HolyGrail.GridArea.Nav}
            rootNode={contentTree}
            matchActiveNode={matchActiveNode}
            Link={Link}
            activeNodeId={activeNodeId}
            // 1 for depth 2, because it's zero based
            maxInitialStackDepth={1}
            initialDepth={activeNodeDepth}
          />

          <Box className="content-wrapper">
            <MainContent>
              <ContentHeader depth={activeNode.depth}>
                <Heading>{meta.title}</Heading>
              </ContentHeader>
              <ContentBody>
                <MdxPage components={mdxComponents} />
              </ContentBody>
              <ContentFooter>
                <InterPageNav
                  Link={Link}
                  up={activeNode.up}
                  left={activeNode.left}
                  right={activeNode.right}
                />
              </ContentFooter>
            </MainContent>
            <Footer gridArea={HolyGrail.GridArea.Footer}>
              <ul>
                <li>
                  <Link href="/">Index</Link>
                </li>
                <li>
                  <Link href="/">Somewhere</Link>
                </li>
                <li>
                  <Link href="/">Else</Link>
                </li>
              </ul>
            </Footer>
          </Box>

          <aside className="right-sidebar">
            <TocMdx />
          </aside>
        </HolyGrail.Layout>
      </BaseLayout>
    );
  };

  WithDocsLayout.displayName = `WithDocsLayout`;

  return WithDocsLayout;
};

export default withDocsLayout;
