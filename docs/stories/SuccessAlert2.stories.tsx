import { SuccessAlert2 } from "@splitgraph/tdesign";

export default {
  title: "Splitgraph/SuccessAlert",
  component: SuccessAlert2,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <SuccessAlert2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "If an account for user@example.com exists, we will send and email with a reset link.",
};

export const Legacy = Template.bind({});
Legacy.args = {
  message:
    "If an account for user@example.com exists, we will send and email with a reset link.",
  dismissLinkText: "Close",
};
