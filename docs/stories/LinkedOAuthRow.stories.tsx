import {
  LinkedOAuthRow,
  InvisibleButton,
  GoogleLogoIcon,
} from "@splitgraph/tdesign";

export default {
  title: "Row/LinkedOAuthRow",
  component: LinkedOAuthRow,
} as unknown;

const Template = (args) => {
  return (
    <LinkedOAuthRow
      {...args}
      name="Nicolas Panero"
      email="nicolas.panero@example.com"
    >
      <InvisibleButton>
        <GoogleLogoIcon />
        Unlink
      </InvisibleButton>
    </LinkedOAuthRow>
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=698%3A1532",
  },
};
