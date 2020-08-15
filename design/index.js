export { Box, Flex, Image, Button, Text } from "rebass";

export { ErrorAlert, SuccessAlert } from "./Alert";
export { SubmitButton } from "./Button";
export { DividerWithMiddleText, HorizontalDivider } from "./Divider";
export { Input, Label } from "./Form";
export { Octicon, GitLabLogoIcon, GoogleLogoIcon } from "./Icon";
export { Link, MutedLink } from "./Link";
export {
  DangerText,
  Heading,
  MutedText,
  SubHeading,
  SuccessText,
  WarningText,
} from "./Text";

export {
  BaseLayout,
  Header,
  Footer,
  MainContent,
  ContentBody,
  ContentFooter,
  ContentHeader,
  Sidebar,
  HolyGrail,
} from "./Layout";

export { LogoImage } from "./Logo";

export { InterPageNav } from "./Nav";

export { defaultTheme, marketingTheme, tocStyles } from "./themes/defaultTheme";

export { mdxComponents } from "./themes/mdxComponents";

export { matomoInit, matomoPush } from "./matomo";

const mdxComponents = {
  pre: ({ children, ...rest }) => (
    <pre sx={marketingTheme.styles.pre} {...rest}>
      {children}
    </pre>
  ),
  code: ({ children, ...rest }) => (
    <code sx={marketingTheme.styles.code} {...rest}>
      {children}
    </code>
  ),
};

export { mdxComponents };
