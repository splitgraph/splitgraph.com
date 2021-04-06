/** @jsxImportSource theme-ui */

const Heading = ({ sx = {}, children, ...rest }) => {
  return (
    <h1
      sx={{
        fontSize: 5,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default Heading;
