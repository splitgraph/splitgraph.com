const withHolyGrailLayout = ({
  titleTemplate,
  renderTOC = true,
  renderTitleHeading = true,
  renderInterPageNav = true,
  renderDocsHeaderLink = true,
  middleHeader = null,
  getSEO = ({ currentURL, meta, contentTree, SEO_BASE_URL }) => ({}),
}) => ({ MdxPage, meta = {}, contentTree }) => {
  const WithHolyGrailLayout = ({ router }) => {
    return <div>DEPRECATED</div>;
  };

  WithHolyGrailLayout.displayName = `WithHolyGrailLayout`;

  return WithHolyGrailLayout;
};

export default withHolyGrailLayout;
