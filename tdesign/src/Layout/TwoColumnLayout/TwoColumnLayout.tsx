// @jsx jsx
// @ts-ignore
import { jsx, Box } from "theme-ui";
import * as React from "react";
import { useState, createContext } from "react";

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

  const gridTemplateColumns = ["1fr", "1fr", expanded ? "1fr 12fr" : "1fr 3fr"];

  const gridTemplateRows = ["1fr", "1fr", expanded ? "6fr" : "1fr"];

  const leftArea = "1 / 1 / 2 / 2";
  const rightArea = ["2 / 1 / 3 / 2", "2 / 1 / 3 / 2", "1 / 2 / 2 / 3"];

  const style = {
    display: "grid",
    // minHeight: '95vh',
    gridTemplateColumns,
    gridTemplateRows,
    gridColumnGap: 0,
    minHeight: ["inherit", "inherit", "calc(95vh - 2em)"],
    gridRowGap: 0,
    ".two-col-left": {
      gridArea: leftArea,
      backgroundColor: "heavy",
      color: "light",
      a: {
        color: "light",
        fontWeight: "bold",
      },
      borderRightColor: [null, null, "sgdarkblue"],
      borderRightStyle: [null, null, "solid"],
      borderRightSize: [null, null, "10px"],
      borderBottomColor: ["sgdarkblue", "sgdarkblue", null],
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

export default ({ children }: TwoColumnLayoutProps) => {
  const { style, expanded, setExpanded } = useResponsiveStyle();

  return (
    <Box className="two-col" sx={style}>
      <LayoutContext.Provider value={{ expanded, setExpanded }}>
        {children}
      </LayoutContext.Provider>
    </Box>
  );
};
