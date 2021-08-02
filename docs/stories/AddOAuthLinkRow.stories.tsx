import {
  AddOAuthLinkRow,
  InvisibleButton,
  Octicon,
  GitLabLogoIcon,
  GoogleLogoIcon,
} from "@splitgraph/tdesign";

export default {
  title: "Row/AddOAuthLinkRow",
  component: AddOAuthLinkRow,
} as unknown;

const Template = (args) => {
  return (
    <AddOAuthLinkRow {...args}>
      <InvisibleButton>
        <Octicon /> GitHub
      </InvisibleButton>
      <InvisibleButton>
        <GitLabLogoIcon /> GitLab
      </InvisibleButton>
      <InvisibleButton>
        <GoogleLogoIcon /> Google
      </InvisibleButton>
    </AddOAuthLinkRow>
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=698%3A1629",
  },
};
