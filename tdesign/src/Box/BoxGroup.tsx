import * as React from "react";
import { Box } from "@material-ui/core";
import { theme as designTheme } from "../themes/design";

interface IBoxGroupProps {
  children: React.ReactNode;
}
const BoxGroup = ({ children }: IBoxGroupProps) => {
  if (React.Children.count(children) > 1) {
    return (
      <>
        {React.Children.map(children, (child, index) => {
          return (
            <div key={index}>
              <Box
                sx={{
                  height: "16px",
                  ml: ["50%", "36px"],
                  borderLeft: `1px solid ${designTheme.grays.light.gray26}`,
                  userSelect: "none",
                }}
              >
                &nbsp;
              </Box>
              {child}
            </div>
          );
        })}
      </>
    );
  } else {
    return <>{children}</>;
  }
};

export default BoxGroup;
