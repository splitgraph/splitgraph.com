import { InFieldButton } from "@splitgraph/tdesign";
import { Input } from "@splitgraph/tdesign/src/Input";

export default {
  title: "Splitgraph/InFieldButton",
  component: InFieldButton,
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => (
  <Input
    endAdornment={<InFieldButton {...args}>Create </InFieldButton>}
  ></Input>
);

export const Medium = Template.bind({});
Medium.args = {
  children: "Create",
  disabled: false,
};
