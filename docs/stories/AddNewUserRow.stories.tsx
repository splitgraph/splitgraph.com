import { AddNewUserRow } from "@splitgraph/tdesign";
import { useForm } from "react-hook-form";

export default {
  title: "Row/AddNewUserRow",
  component: AddNewUserRow,
} as unknown;

const Template = (args) => {
  const { register } = useForm();
  return (
    <form>
      <AddNewUserRow {...args} {...register("demo", { required: true })} />
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=698%3A1881",
  },
};
