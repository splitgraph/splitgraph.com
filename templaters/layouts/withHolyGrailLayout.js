// @jsx jsx
import { jsx } from "theme-ui";
import React from "react";
import { NextSeo } from "next-seo";
import { Helmet } from "react-helmet";

import {
  Box,
  Header,
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

import { Footer } from "@splitgraph/tdesign";

import { OnlyTOC } from "./contentWrappers";
import useActiveNode from "./util/useActiveNode";

const withHolyGrailLayout = ({
  titleTemplate,
  renderTOC = true,
  renderTitleHeading = true,
  renderInterPageNav = true,
  renderDocsHeaderLink = true,
  getSEO = ({ currentURL, meta, contentTree, SEO_BASE_URL }) => ({}),
}) => ({ MdxPage, meta = {}, contentTree }) => {
  const HolyGrailSEO = ({ currentURL }) => {
    const SEO_BASE_URL = process.env.SEO_CANONICAL_BASE_URL;

    const injectSEO = getSEO({ currentURL, meta, contentTree, SEO_BASE_URL });

    const pageSeo = {
      title: `${meta.title}`,
      titleTemplate,
      ...(meta.description ? { description: meta.description } : {}),
      canonical: `${SEO_BASE_URL}${currentURL}`,
      ...injectSEO,
      openGraph: {
        ...(meta.description ? { description: meta.description } : {}),
        url: `${SEO_BASE_URL}${currentURL}`,
        ...(injectSEO.hasOwnProperty("openGraph") ? injectSEO.openGraph : {}),
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
        <HolyGrailSEO currentURL={currentURL} />

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
        `
                .replace(/\s\s+/g, " ")
                .replace(/\/\*(?!\*\/)*\*\//g, ""),
            },
          ]}
        />

        <HolyGrail.Layout>
          <Header gridArea={HolyGrail.GridArea.Header}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ".logo-text": {
                  variant: "links.unstyled",
                  color: "sglightblue",
                  display: ["none", "inherit", "inherit"],
                },
              }}
            >
              <LogoImage logoURL="/static/splitgraph_logo.svg" />
              <a
                href="/"
                aria-label="homepage"
                title="Home"
                className="logo-text"
              >
                Splitgraph
              </a>
            </Box>
            <Box sx={{ color: "muted" }}>
              <Link href="/explore">Explore Data</Link>
              {renderDocsHeaderLink ? (
                <>
                  <>&bull;&nbsp;&nbsp;</>
                  <Link href="/docs">Docs</Link>
                </>
              ) : null}
              <Link className="button-link" href="/auth/sign_up">
                Sign Up
              </Link>
            </Box>
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
            <Footer Link={Link} />
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
