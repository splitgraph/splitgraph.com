// @jsx jsx
import { jsx } from "theme-ui";
import React from "react";
import { NextSeo } from "next-seo";
import { Helmet } from "react-helmet";

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
  mdxComponents,
} from "@splitgraph/design";

import { BaseLayout } from "@splitgraph/design/Layout";
import { Link } from "@splitgraph/docs/components";

import { OnlyTOC } from "./contentWrappers";
import useActiveNode from "./util/useActiveNode";

const withHolyGrailLayout = ({
  titleTemplate,
  renderTOC = true,
  renderTitleHeading = true,
  renderInterPageNav = true,
}) => ({ MdxPage, meta = {}, contentTree }) => {
  const DocsPageSeo = ({ currentURL }) => {
    const SEO_BASE_URL = process.env.SEO_CANONICAL_BASE_URL;

    const pageSeo = {
      title: `${meta.title}`,
      titleTemplate,
      ...(meta.description ? { description: meta.description } : {}),
      canonical: `${SEO_BASE_URL}${currentURL}`,
      opengraph: {
        ...(meta.description ? { description: meta.description } : {}),
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

  const WithHolyGrailLayout = ({ router }) => {
    const {
      currentURL,
      activeNode,
      activeNodeId,
      activeNodeDepth,
      matchActiveNode,
    } = useActiveNode({ router, contentTree });

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

            ${!renderTOC && "nav.toc { display: none; }"}
        `.replace(/\s/g, ""),
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
                {renderTitleHeading && <Heading>{meta.title}</Heading>}
              </ContentHeader>
              <ContentBody>
                <MdxPage components={mdxComponents} />
              </ContentBody>
              <ContentFooter>
                {renderInterPageNav ? (
                  <InterPageNav
                    Link={Link}
                    up={activeNode.up}
                    left={activeNode.left}
                    right={activeNode.right}
                  />
                ) : null}
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
            {renderTOC ? <TocMdx /> : null}
          </aside>
        </HolyGrail.Layout>
      </BaseLayout>
    );
  };

  WithHolyGrailLayout.displayName = `WithHolyGrailLayout`;

  return WithHolyGrailLayout;
};

export default withHolyGrailLayout;