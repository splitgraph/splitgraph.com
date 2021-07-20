import { ErrorAlert2 } from "@splitgraph/tdesign";

export default {
  title: "Splitgraph/ErrorAlert",
  component: ErrorAlert2,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ErrorAlert2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "We couldn't find an account that matches user@example.com email. Need an account?",
};

export const Legacy = Template.bind({});
Legacy.args = {
  message:
    "We couldn't find an account that matches user@example.com email. Need an account?",
  dismissLinkText: "Close",
};
