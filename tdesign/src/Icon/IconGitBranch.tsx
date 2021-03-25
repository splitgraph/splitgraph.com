/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { gitBranchIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconGitBranch = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"gitBranch"} svgURI={gitBranchIconURI} {...props} />
  );
};

export default IconGitBranch;
