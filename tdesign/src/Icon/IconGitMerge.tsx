/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { gitMergeIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconGitMerge = (props: IIconProps) => {
  return <BaseIcon iconSlug={"gitMerge"} svgURI={gitMergeIconURI} {...props} />;
};

export default IconGitMerge;
