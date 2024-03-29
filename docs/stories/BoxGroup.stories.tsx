import {
  BoxGroup,
  SQLCredentialsNicknameRow,
  SQLCredentialsRow,
  LinkedOAuthRow,
  AddOAuthLinkRow,
  UserRow,
  InvisibleButton,
  GoogleLogoIcon,
  GitLabLogoIcon,
  Octicon,
} from "@splitgraph/tdesign";

export default {
  title: "Row/BoxGroup",
  component: BoxGroup,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as unknown;

const Template = (args) => <BoxGroup {...args} />;

export const ExampleGroupOne = Template.bind({});
ExampleGroupOne.args = {
  children: [<SQLCredentialsRow />, <SQLCredentialsNicknameRow />],
};
ExampleGroupOne.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/jaOp7ncR6Zk90BeOQgrIB0/00-Component-and-Styles-Library-Splitgraph?node-id=698%3A550",
  },
};

export const ExampleGroupTwo = Template.bind({});
ExampleGroupTwo.args = {
  children: [
    <LinkedOAuthRow
      name="Nicolas Panero"
      emails={["nicolas.panero@example.com"]}
      idp_id="beefdead"
    >
      <InvisibleButton>
        <GoogleLogoIcon />
        Unlink
      </InvisibleButton>
    </LinkedOAuthRow>,
    <AddOAuthLinkRow>
      <InvisibleButton>
        <Octicon /> GitHub
      </InvisibleButton>
      <InvisibleButton>
        <GitLabLogoIcon /> GitLab
      </InvisibleButton>
      <InvisibleButton>
        <GoogleLogoIcon /> Google
      </InvisibleButton>
    </AddOAuthLinkRow>,
    <SQLCredentialsNicknameRow />,
    <SQLCredentialsRow />,
    <UserRow
      name="Alice"
      verified="Verified"
      email={"alice@example.com"}
      handleSetAsPrimary={() => {}}
      handleDelete={() => {}}
      primary={false}
    />,
  ],
};
