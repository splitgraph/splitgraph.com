/** @jsxImportSource theme-ui */

const SubHeading = ({ sx = {}, children, ...rest }) => {
  return (
    <h2
      sx={{
        color: "lightgray",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default SubHeading;
