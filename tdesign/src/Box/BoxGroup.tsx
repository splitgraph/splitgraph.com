import * as React from "react";
import { Box } from "@material-ui/core";

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
                  borderLeft: ({ palette }) =>
                    `1px solid ${palette.grays.gray26.main}`,
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
