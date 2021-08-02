import { SubnavBar } from "@splitgraph/tdesign/src/SubnavBar";

export default {
  title: "Splitgraph/SubnavBar",
  component: SubnavBar,
} as unknown;

const sections = [
  {
    displayName: "Avatar",
    slug: "avatar",
  },
  {
    displayName: "Basic Info",
    slug: "basic-info",
  },
  {
    displayName: "Change Password",
    slug: "change-password",
  },
];

const Template = (args) => {
  return <SubnavBar title="Account" sections={sections} {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=806%3A121",
  },
};
