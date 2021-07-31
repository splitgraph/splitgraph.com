import { InvisibleButton } from "@splitgraph/tdesign";

export default {
  title: "Splitgraph/InvisibleButton",
  component: InvisibleButton,
  argTypes: {
    message: {
      name: "message",
      type: { name: "string", required: false },
      description: "override the message (i.e. i18n)",
      control: {
        type: "text",
      },
    },
  },
} as unknown;

const Template = (args) => <InvisibleButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Set as Primary",
};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=698%3A1121",
  },
};
