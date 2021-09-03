const getMetaForSphinxFile = (fileJson) => {
  return `


export const meta = {
  title: "${fileJson.title}",
  id: "${fileJson.title}"
};

`;
};

module.exports = getMetaForSphinxFile;
