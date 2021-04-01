/** @jsxImportSource theme-ui */
// @ts-ignore

import { gitMergeIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconGitMerge = (props: IIconProps) => {
  return <BaseIcon iconSlug={"gitMerge"} svgURI={gitMergeIconURI} {...props} />;
};

export default IconGitMerge;
