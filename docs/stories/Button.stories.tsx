import { Button } from "@splitgraph/tdesign";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

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
  children: "Get Started - FREE!",
};
Medium.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=488%3A436",
  },
};

export const MediumWithIcon = Template.bind({});
MediumWithIcon.args = {
  startIcon: <MailOutlineIcon />,
  children: "Delete",
};
MediumWithIcon.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=500%3A363",
  },
};

export const Large = Template.bind({});
Large.args = {
  large: true,
  children: "Complete form to Sign in",
  icon: <MailOutlineIcon sx={{ position: "absolute", left: "15px" }} />,
};
Large.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=376%3A282",
  },
};

export const MediumDisabled = Template.bind({});
MediumDisabled.args = {
  disabled: true,
  children: "Get Started - FREE",
};
MediumDisabled.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=673%3A492",
  },
};
