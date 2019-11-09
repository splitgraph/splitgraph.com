const getMetaForSphinxFile = fileJson => {
  return `
import "@splitgraph/design/css/sphinxtheme.css";

export const meta = {
  title: "${fileJson.title}",
  id: "${fileJson.title}"
};

`;
};

module.exports = getMetaForSphinxFile;
