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
import { useEffect } from "react";
export const isServer = () => typeof window === "undefined";

// import dynamic from "next/dynamic";

// const getDynamicComponent = name => dynamic(() => import(`${name}`));

const importContent = require.context(
  "@splitgraph/content",
  true,
  /\.mdx$/
  // "lazy"
);

// const ContentTree = require("../compile/ContentTree");

// const importContent = () =>
//   isServer()
//     ? require.context("@splitgraph/content", true, /\.mdx$/, "lazy-once")
//     : Promise.resolve({ keys: [] });

const IndexPage = ({ docs, contentImportPath, ServerMdxContent, meta }) => {
  // const webpackContext = useWebpackContext(require.context('@splitgraph/content', true, /\.mdx$/, 'lazy'))

  // const context = await require.context('@splitgraph/content', true, /\.mdx$/, 'lazy')

  // const MdxContent = () => null;

  // const MdxContent = preval`
  // const content = require("${contentImportPath}");
  // module.exports = content;
  // `;

  // const MdxContent = dynamic(() => import(contentImportPath));

  // const MdxContent = allContent[contentImportPath];

  // require(contentImportPath).default;

  // const DynamicComponent = getDynamicComponent(
  //   contentImportPath.replace("./docs", "@splitgraph/content/docs")
  // );

  console.log("contentImportPath:", contentImportPath);
  console.log("meta:", meta);

  const MdxContent = importContent(contentImportPath).default;

  return (
    <BaseLayout>
      <HolyGrail.Layout>
        <Header gridArea={HolyGrail.GridArea.Header}>
          <LogoImage logoURL="/static/splitgraph_logo.svg" />
        </Header>

        <Sidebar gridArea={HolyGrail.GridArea.Nav}>
          <SubHeading>L Sidebar</SubHeading>
        </Sidebar>

        <MainContent gridArea={HolyGrail.GridArea.Content}>
          <Heading>{meta.title}</Heading>
          {/* <DynamicComponent /> */}
          {!!MdxContent && <MdxContent />}
          {/* <pre>{JSON.stringify(docs, null, 2)}</pre> */}
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

IndexPage.getInitialProps = async ctx => {
  // const compileDocs = require("../compile/compileDocs");

  console.log("importContent.keys:", importContent.keys());

  // console.log("allKeys:", require.context("/").keys());

  console.log("ctx.query.contentImportPath", ctx.query.contentImportPath);

  const docs = require("../compile/compiledDocs");

  // const flattened = [];

  // ContentTree.walk(
  //   docs,
  //   (item, parent) => {
  //     if (item.type === "directory") {
  //       // console.log("Skip directory:", item);
  //       return;
  //     }

  //     flattened.push({ ...item });
  //   },
  //   null
  // );

  // console.log("flattened[1]:", flattened[1]);

  // const MdxContent = flattened[1].require();

  // const mdxPath = isServer()
  //   ? ctx.query.contentImportPath
  //   : ctx.query.contentImportPath.replace("./docs", "@content/docs");

  // const MdxContent = await importContent(mdxPath);

  const MdxContent = importContent(ctx.query.contentImportPath);

  console.log("Got MdxContent", MdxContent.meta);

  return {
    docs,
    contentImportPath: ctx.query.contentImportPath,
    // ServerMdxContent: MdxContent.default,
    meta: MdxContent.meta
    // contentImportPath:
    //   "@splitgraph/content/docs/0100_splitfiles/0100_splitfile_intro.mdx"
  };
};

export default IndexPage;
