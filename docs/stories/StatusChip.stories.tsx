import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { muiTheme } from "@splitgraph/tdesign/src/themes/muiTheme";

import { StatusChip2 } from "@splitgraph/tdesign";

export default {
  title: "Splitgraph/StatusChip",
  component: StatusChip2,
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => {
  console.log("Template args", args);
  return <StatusChip2 {...args} />;
};

export const Verified = Template.bind({});
Verified.args = {
  text: "Verified",
};

export const Unverified = Template.bind({});
Unverified.args = {
  text: "Unverified",
};
