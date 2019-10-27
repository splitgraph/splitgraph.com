import { Component } from "react";

import {
  Header,
  Footer,
  MainContent,
  Sidebar,
  Heading,
  SubHeading,
  Text,
  Box,
  HolyGrail,
  LogoImage
} from "@splitgraph/design";
import { BaseLayout } from "@splitgraph/design/Layout";

const withDocsLayout = ({ MdxPage, meta = {}, Link, contentTree }) => {
  class WithDocsLayout extends Component {
    render() {
      return (
        <BaseLayout>
          <HolyGrail.Layout>
            <Header gridArea={HolyGrail.GridArea.Header}>
              <LogoImage logoURL="/static/splitgraph_logo.svg" />
            </Header>

            <Sidebar
              gridArea={HolyGrail.GridArea.Nav}
              sidebar={contentTree}
              Link={Link}
            />

            <MainContent gridArea={HolyGrail.GridArea.Content}>
              <Heading>{meta.title}</Heading>
              <pre>{JSON.stringify(meta, null, 2)}</pre>
              <MdxPage />
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
    }
  }

  WithDocsLayout.displayName = `WithDocsLayout`;

  return WithDocsLayout;
};

export default withDocsLayout;
