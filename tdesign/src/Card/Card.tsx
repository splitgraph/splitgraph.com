import { Box } from "@material-ui/core";

const Card = ({ children, sx }) => {
  const cardSx = {
    ...sx,
  };

  return <Box sx={cardSx}>{children}</Box>;
};

export default Card;
