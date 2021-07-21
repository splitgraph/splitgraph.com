import PasswordInput from "@splitgraph/tdesign/src/Input/PasswordInput";
import { FormControl } from "@material-ui/core";

export default {
  title: "Splitgraph/PasswordInput",
  component: PasswordInput,
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => (
  <form>
    <FormControl variant="outlined">
      <PasswordInput {...args} />
    </FormControl>
  </form>
);

export const Default = Template.bind({});
Default.args = {};
