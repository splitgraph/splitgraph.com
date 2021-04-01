/** @jsxImportSource theme-ui */
// @ts-ignore

import { conceptWorkflowGantChartIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconConceptWorkflowGantChart = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"conceptWorkflowGantChart"}
      svgURI={conceptWorkflowGantChartIconURI}
      {...props}
    />
  );
};

export default IconConceptWorkflowGantChart;
