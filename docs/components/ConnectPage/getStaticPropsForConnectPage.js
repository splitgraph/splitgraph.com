import compiledSqlClientInstructions from "@splitgraph/docs/compile/compiledSqlClientInstructions";

async function getStaticPropsForConnectPage() {
  const { components } = compiledSqlClientInstructions;

  return {
    props: {
      helpSectionComponents: components,
    },
  };
}

export default getStaticPropsForConnectPage;
