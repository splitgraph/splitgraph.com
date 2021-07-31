import { LinkButton } from "@splitgraph/tdesign";

export default {
  title: "Splitgraph/LinkButton",
  component: LinkButton,
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

const Template = (args) => <LinkButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Sign up",
};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=673%3A395",
  },
};
