import { PasswordInput } from "@splitgraph/tdesign/src/Input/PasswordInput";
import { FormControl } from "@mui/material";

export default {
  title: "Splitgraph/PasswordInput",
  component: PasswordInput,
  argTypes: {
    color: { control: "color" },
  },
} as unknown;

const Template = (args) => (
  <form>
    <FormControl variant="outlined">
      <PasswordInput {...args} />
    </FormControl>
  </form>
);

export const Default = Template.bind({});
Default.args = {};
