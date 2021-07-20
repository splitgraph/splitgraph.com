import { Button } from "@splitgraph/tdesign";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

export default {
  title: "Splitgraph/Button",
  component: Button,
  argTypes: {
    sx: { color: { control: "color" } },
  },
};

const Template = (args) => <Button {...args} />;

export const Medium = Template.bind({});
Medium.args = {
  children: "Complete form to Sign in",
};

export const MediumWithIcon = Template.bind({});
MediumWithIcon.args = {
  startIcon: <MailOutlineIcon />,
  children: "Get Started - FREE",
};

export const Large = Template.bind({});
Large.args = {
  large: true,
  children: "Complete form to Sign in",
  icon: <MailOutlineIcon sx={{ position: "absolute", left: "15px" }} />,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: "Get Started - FREE",
};
