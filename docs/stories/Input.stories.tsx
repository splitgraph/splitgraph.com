import { Input } from "@splitgraph/tdesign/src/Input/Input";
import { FormControl } from "@mui/material";

export default {
  title: "Splitgraph/Input",
  component: Input,
  argTypes: {
    color: { control: "color" },
  },
} as unknown;

const Template = (args) => (
  <form>
    <FormControl variant="outlined">
      <Input {...args} />
    </FormControl>
  </form>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=370%3A35",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: "disabled",
};

export const Error = Template.bind({});
Error.args = {
  error: true,
};
Error.paramters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=370%3A6",
  },
};
