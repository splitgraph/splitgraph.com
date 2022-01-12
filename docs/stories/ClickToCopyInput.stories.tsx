import { InputWithCopy } from "@splitgraph/tdesign/src/Input";
import { FormControl } from "@mui/material";

export default {
  title: "Splitgraph/InputWithCopy",
  component: InputWithCopy,
  argTypes: {
    color: { control: "color" },
  },
} as unknown;

const Template = (args) => (
  <form>
    <FormControl variant="outlined">
      <InputWithCopy {...args} />
    </FormControl>
  </form>
);

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=554%3A430",
  },
};
