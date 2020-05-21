// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

export interface IGenericBoxProps {
  classNames: string;
  renderHeading: () => React.ReactNode;
  renderBody: () => React.ReactNode;
  renderFooter: () => React.ReactNode;
  containerStyle?: SystemStyleObject;
  headingStyle?: SystemStyleObject;
  bodyStyle?: SystemStyleObject;
  contentContainerStyle?: SystemStyleObject;
  footerStyle?: SystemStyleObject;
}

// export type { IGenericBoxProps }

const GenericBox = ({
  renderHeading,
  renderBody,
  renderFooter,
  classNames,
  containerStyle = {},
  headingStyle = {},
  bodyStyle = {},
  contentContainerStyle = {},
  footerStyle = {},
}: IGenericBoxProps) => {
  const heading = renderHeading();
  const body = renderBody();
  const footer = renderFooter();

  return (
    <Box
      className={`two-tone-box ${classNames}`}
      sx={{
        ...containerStyle,
        h3: {
          ...headingStyle,
        },
        ".content-container": {
          ...contentContainerStyle,
          p: {
            ...bodyStyle,
          },
        },
        ".footer": {
          ...footerStyle,
        },
      }}
    >
      <h3>{heading}</h3>
      <div className="content-container">
        <p>{body}</p>

        <div className="footer">{footer}</div>
      </div>
    </Box>
  );
};

export default GenericBox;
