import { useState, createContext } from "react";
import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface TwoColumnLayoutProps {
  children?: React.ReactNode;
}

export interface ILayoutContext {
  /* Note: "expanded" is reversed for big screens,
     but we avoid useLayoutEffect hacks by pretending it isn't.

    The only downside of this is that if the user collapses
    the sidebar in full-screen mode, and then shrinks the
    window, the sidebar will be expanded.
  */
  expanded: boolean;
  style?: any;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

const useResponsiveStyle = (): ILayoutContext => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const leftArea = "1 / 1 / 2 / 2";
  const rightArea = ["2 / 1 / 3 / 2", "2 / 1 / 3 / 2", "1 / 2 / 2 / 3"];

  const style = {
    display: "grid",
    // minHeight: '95vh',
    gridTemplateColumns: ["1fr", "1fr", expanded ? "1fr 12fr" : "1fr 3fr"],
    gridTemplateRows: ["1fr", "1fr", expanded ? "6fr" : "1fr"],
    gridColumnGap: 0,
    minHeight: ["inherit", "inherit", "calc(95vh - 2em)"],
    gridRowGap: 0,
    ".two-col-left": {
      gridArea: leftArea,
      backgroundColor: "#0d1821", //TODO use MUI theme
      color: "#ebebeb", //TODO use MUI theme
      a: {
        color: "#ebebeb", //TODO use MUI theme
        fontWeight: "bold",
      },
      borderRightColor: [null, null, "sgdarkblue.main"],
      borderRightStyle: [null, null, "solid"],
      borderRightSize: [null, null, "10px"],
      borderBottomColor: ["#36678d", "#36678d", null], //TODO use MUI theme
      borderBottomStyle: ["solid", "solid", null],
      borderBottomSize: ["10px", "10px", null],
      filter: "dropShadow(2px 4px 6px var(--theme-ui-colors-heavy))",
    },
    ".two-col-main": {
      gridArea: rightArea,
      backgroundColor: "white",
      maxWidth: ["100vw", "100vw", "75vw"],
      overflowX: "hidden",
    },
  };

  return { style, expanded, setExpanded };
};

export const LayoutContext = createContext<ILayoutContext>({
  expanded: false,
});

const TwoColumnLayout = ({ children }: TwoColumnLayoutProps) => {
  const { style, expanded, setExpanded } = useResponsiveStyle();

  return (
    <Box className="two-col" sx={style as SxProps<Theme>}>
      <LayoutContext.Provider value={{ expanded, setExpanded }}>
        {children}
      </LayoutContext.Provider>
    </Box>
  );
};

export default TwoColumnLayout;
