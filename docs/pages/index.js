import Head from "next/head";
import Link from "next/link";

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

const IndexPage = () => (
  <BaseLayout>
    <HolyGrail.Layout>
      <Header gridArea={HolyGrail.GridArea.Header}>
        <LogoImage logoURL="/static/splitgraph_logo.svg" />
      </Header>

      <Sidebar gridArea={HolyGrail.GridArea.Nav}>
        <SubHeading>L Sidebar</SubHeading>
      </Sidebar>

      <MainContent gridArea={HolyGrail.GridArea.Content}>
        <Heading>Lorem ipsum...</Heading>
        <SubHeading>Dolor, sit amet...</SubHeading>
      </MainContent>

      <Sidebar gridArea={HolyGrail.GridArea.Side}>
        <SubHeading>R Sidebar</SubHeading>
      </Sidebar>

      <Footer gridArea={HolyGrail.GridArea.Footer}>
        <ul>
          <li>
            <Link href="/auth/sign_in" prefetch={false}>
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/IndexPage" prefetch={false}>
              <a>IndexPage (this)</a>
            </Link>
          </li>
          <li>
            <Link href="/" prefetch={false}>
              <a>Index</a>
            </Link>
          </li>
        </ul>
      </Footer>
    </HolyGrail.Layout>
  </BaseLayout>
);

export default IndexPage;
