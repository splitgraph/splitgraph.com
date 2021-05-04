import { Box } from "@material-ui/core";

export interface IHeroBoxProps {
  children?: React.ReactNode;
  extraStyle?: object;
}

const containerStyle = {
  background:
    "linear-gradient(180deg, rgba(13,24,33,1) 0%, rgba(54,102,141,1) 100%)", // TODO should come from MUI theme, consider why dark2light.main doesn't work here?
  minHeight: "50vh",
  color: "light",
};

const HeroBox = ({ children, extraStyle = {} }: IHeroBoxProps) => {
  return <Box sx={{ ...containerStyle, ...extraStyle }}>{children}</Box>;
};

export default HeroBox;
