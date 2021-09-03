import { Box } from "@material-ui/core";

export interface IGenericBoxProps {
  classNames: string;
  renderHeading: () => React.ReactNode;
  renderBody: () => React.ReactNode;
  renderFooter: () => React.ReactNode;
  containerStyle?: object;
  headingStyle?: object;
  bodyStyle?: object;
  contentContainerStyle?: object;
  footerStyle?: object;
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
        backgroundImage:
          "linear-gradient(330deg, white, white 50%, #36678d 1px, #36678d 50%)",
        boxShadow: "0 0 1rem rgba(0, 0, 0, .25)",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: "2rem",
        "h3, p": {
          display: "inline",
        },
        h3: {
          padding: "2rem",
          margin: 0,
          color: "white",
          ...headingStyle,
        },
        ".content-container": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "white",
          marginLeft: "1rem",
          padding: "1rem",
          marginRight: "1rem",
          borderRadius: "32px",
          overflow: "hidden",
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "0%",
          ...contentContainerStyle,
          p: {
            overflow: "hidden",
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "0%",
            display: "flex",
            alignItems: "center",
            ...bodyStyle,
          },
        },
        ".footer": {
          padding: 0,
          paddingLeft: "2rem",
          paddingRight: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...footerStyle,
          a: {
            // variant: "links.button",  // TODO map to MUI
            color: "white",
            alignSelf: "bottom",
            padding: "1rem",
            ...(footerStyle.hasOwnProperty("a")
              ? footerStyle["a"]
              : ({} as object)),
          },
        },
        ...containerStyle,
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
