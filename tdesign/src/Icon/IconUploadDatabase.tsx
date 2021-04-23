import { uploadDatabaseIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconUploadDatabase = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"uploadDatabase"}
      svgURI={uploadDatabaseIconURI}
      {...props}
    />
  );
};

export default IconUploadDatabase;
