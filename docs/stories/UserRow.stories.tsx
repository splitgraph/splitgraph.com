import { UserRow } from "@splitgraph/tdesign";

export default {
  title: "Row/UserRow",
  component: UserRow,
} as unknown;

const Template = (args) => {
  return (
    <UserRow
      name="Christian Really Long Name"
      verified="Unverified"
      email={"christian@example.com"}
      metadata={"Owner"}
      handleSetAsPrimary={() => {}}
      handleDelete={() => {}}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=698%3A1529",
  },
};
