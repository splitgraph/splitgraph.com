import { Grid } from "@material-ui/core";
import { SuccessAlert2 } from "@splitgraph/tdesign";

export default {
  title: "Splitgraph/SuccessAlert",
  component: SuccessAlert2,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => (
  <Grid container>
    <Grid item xs={3}>
      <SuccessAlert2 {...args} />
    </Grid>
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  children:
    "If an account for user@example.com exists, we will send an email with a reset link.",
};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=376%3A283",
  },
};

export const Legacy = Template.bind({});
Legacy.args = {
  message:
    "If an account for user@example.com exists, we will send an email with a reset link.",
  dismissLinkText: "Close",
};
