import { Box } from "@material-ui/core";

export interface IHeroBoxProps {
  children?: React.ReactNode;
  extraStyle?: object;
}

const containerStyle = {
  backgroundColor: "dark2light.main",
  minHeight: "50vh",
  color: "light",
};

const HeroBox = ({ children, extraStyle = {} }: IHeroBoxProps) => {
  return <Box sx={{ ...containerStyle, ...extraStyle }}>{children}</Box>;
};

export default HeroBox;
