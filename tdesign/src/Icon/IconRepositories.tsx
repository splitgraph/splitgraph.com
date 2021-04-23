import { repositoryIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconRepositories = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"repositories"} svgURI={repositoryIconURI} {...props} />
  );
};

export default IconRepositories;
