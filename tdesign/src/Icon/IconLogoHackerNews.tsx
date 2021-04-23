import { logoHackerNewsIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLogoHackerNews = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"logoHackerNews"}
      svgURI={logoHackerNewsIconURI}
      {...props}
    />
  );
};

export default IconLogoHackerNews;
