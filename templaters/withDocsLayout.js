import { useMemo } from "react";

import {
  Header,
  Footer,
  ContentHeader,
  ContentBody,
  MainContent,
  Sidebar,
  Heading,
  SubHeading,
  HolyGrail,
  LogoImage
} from "@splitgraph/design";
import { BaseLayout } from "@splitgraph/design/Layout";

import { findNodeInTree } from "@splitgraph/lib/tree";

// TODO: Move this back into the docs repository so no need to do this dumb
// dependency injection. It was only put into its own so that autogenned scripts
// could reference it by name instead of relative path, but that's fixed now.
const withDocsLayout = ({ MdxPage, meta = {}, contentTree, Link }) => {
  // Because we rewrite URLs, when using next/link, we need to specify
  // the mapping so next.js loads the right script. If we do not do this,
  // client side routing does not work and we get "content flashes"
  const ContentLink = ({ href, children, ...rest }) => {
    return (
      <Link href={`/_content${href}`} as={href} {...rest}>
        {children}
      </Link>
    );
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
          match: node => node.url && node.url === currentURL
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
      () => node => node.url && node.url === currentURL,
      [currentURL]
    );

    return (
      <BaseLayout>
        <HolyGrail.Layout>
          <Header gridArea={HolyGrail.GridArea.Header}>
            <LogoImage logoURL="/static/splitgraph_logo.svg" />
          </Header>

          <Sidebar
            gridArea={HolyGrail.GridArea.Nav}
            rootNode={contentTree}
            matchActiveNode={matchActiveNode}
            Link={ContentLink}
            activeNodeId={activeNodeId}
            // 1 for depth 2, because it's zero based
            maxInitialStackDepth={1}
            initialDepth={activeNodeDepth}
          />

          <MainContent gridArea={HolyGrail.GridArea.Content}>
            <ContentHeader depth={activeNode.depth}>
              <Heading>{meta.title}</Heading>
              {/* <pre>{JSON.stringify(meta, null, 2)}</pre> */}
            </ContentHeader>
            <ContentBody>
              <MdxPage />
            </ContentBody>
          </MainContent>

          <Sidebar gridArea={HolyGrail.GridArea.Side}>
            <SubHeading>R Sidebar</SubHeading>
          </Sidebar>

          <Footer gridArea={HolyGrail.GridArea.Footer}>
            <ul>
              <li>
                <Link href="/post/2" prefetch={false}>
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/post/3" prefetch={false}>
                  <a>IndexPage (this)</a>
                </Link>
              </li>
              <li>
                <Link href="/post/4" prefetch={false}>
                  <a>Index</a>
                </Link>
              </li>
            </ul>
          </Footer>
        </HolyGrail.Layout>
      </BaseLayout>
    );
  };

  WithDocsLayout.displayName = `WithDocsLayout`;

  return WithDocsLayout;
};

export default withDocsLayout;
