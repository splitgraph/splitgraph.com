import { useState, createContext } from "react";
import { Box } from "@material-ui/core";
import type { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles/createMuiTheme";

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

  const style: SxProps<Theme> = {
    display: "grid",
    // minHeight: '95vh',
    marginLeft: (theme) => theme.constants.leftMarginLogoAligned,
    marginRight: (theme) => theme.constants.rightMarginNavAligned,
    gridTemplateColumns: ["1fr", "1fr", expanded ? "1fr 12fr" : "1fr 3fr"],
    gridTemplateRows: ["1fr", "1fr", expanded ? "6fr" : "1fr"],
    gridColumnGap: 0,
    minHeight: ["inherit", "inherit", "calc(95vh - 2em)"],
    gridRowGap: 0,
    ".two-col-left": {
      gridArea: leftArea,
      backgroundColor: ({ palette }) => palette.navbar.main,
      color: ({ palette }) =>
        palette.getContrastText(palette.surfaces.background.main),
    },
    ".two-col-main": {
      gridArea: rightArea,
      backgroundColor: "white",
      maxWidth: ["100vw", "100vw", "75vw"],
      overflowX: "hidden",
      // padding: "1rem",
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
    <Box className="two-col" sx={style}>
      <LayoutContext.Provider value={{ expanded, setExpanded }}>
        {children}
      </LayoutContext.Provider>
    </Box>
  );
};

export default TwoColumnLayout;
