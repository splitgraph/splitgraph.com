import { jobHistoryURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconJobHistory = (props: IIconProps) => {
  return <BaseIcon iconSlug={"jobHistory"} svgURI={jobHistoryURI} {...props} />;
};

export default IconJobHistory;
