import { PasswordButtonInput } from "@splitgraph/tdesign/src/Input";

export default {
  title: "Splitgraph/PasswordButtonInput",
  component: PasswordButtonInput,
  argTypes: {},
} as unknown;

const Template = (args) => <PasswordButtonInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=693%3A508",
  },
};
