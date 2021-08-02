import { SQLCredentialsNicknameRow } from "@splitgraph/tdesign";

export default {
  title: "Row/SQLCredentialsNicknameRow",
  component: SQLCredentialsNicknameRow,
} as unknown;

const Template = (args) => {
  return <SQLCredentialsNicknameRow {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=698%3A1649",
  },
};
