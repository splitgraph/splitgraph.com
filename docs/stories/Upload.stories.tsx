import { Upload } from "@splitgraph/tdesign";

export default {
  title: "Splitgraph/Upload",
  component: Upload,
  argTypes: {
    color: { control: "color" },
  },
} as unknown;

const Template = (args) => {
  return <Upload {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  text: "Verified",
};
