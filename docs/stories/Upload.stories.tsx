import { Upload } from "@splitgraph/tdesign";

export default {
  title: "Splitgraph/Upload",
  component: Upload,
  argTypes: {},
} as unknown;

const Template = (args) => {
  return <Upload {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
