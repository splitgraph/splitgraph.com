/*

import contentTree from "../../../../compile/compiledDocsSidebar";
// export default withRouter(withDocsLayout({ MdxPage, meta, contentTree }));

import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import withDocsLayout from "@splitgraph/templaters/layouts/withDocsLayout";
// import contentTree from "../../compile/compiledDocsSidebar";

function TestPage({ source, meta }) {
  // const meta = { id: "mounting", title: "Mounting" };

  const MdxPage = ({ components }) => {
    return hydrate(source, {
      components,
    });
  };

  const DocsLayout = withDocsLayout({
    meta,
    contentTree,
    MdxPage,
  });

  return <DocsLayout />;
}

export default TestPage;

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere

  // const { makeCasts } = require("@splitgraph/docs/compile/makeCasts");
  // const { castManifest } = makeCasts();

  const fs = require("fs").promises;
  const mdxPath = require.resolve(
    "@splitgraph/content/docs/0200_concepts/0150_mounting.mdx"
  );
  const source = await fs.readFile(mdxPath);
  const mdxSource = await renderToString(source, {
    components,
    mdxOptions: {
      remarkPlugins: [
        [require("remark-disable-tokenizers"), { block: ["indentedCode"] }],
        require("remark-sectionize"),
      ],
      rehypePlugins: [
        require("@splitgraph/docs/plugins/rehype-plugins/splitgraphRehypePrism"),
        // [
        //   require("@splitgraph/docs/plugins/rehype-plugins/injectAsciicasts"),
        //   { castManifest },
        // ],
        require("rehype-slug"),
        [
          require("rehype-toc"),
          {
            customizeTOC: require("@splitgraph/docs/plugins/rehype-plugins/customizeTOC"),
          },
        ],
      ],
    },
  });
  return {
    props: { source: mdxSource, meta: { id: "mounting", title: "mounting" } },
  };
}

*/
