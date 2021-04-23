import { gitBranchIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconGitBranch = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"gitBranch"} svgURI={gitBranchIconURI} {...props} />
  );
};

export default IconGitBranch;
