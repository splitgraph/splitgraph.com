import { Box } from "@material-ui/core";
import type { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles";

export interface IBoxSetProps {
  children?: React.ReactNode;
}

const BoxSet = ({ children }: IBoxSetProps) => {
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const boxSetStyle = {
    ...containerStyle,
    ".box-1": {
      backgroundImage:
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
      width: "100%",
      borderRadius: 8,
      height: ["initial", "initial", "calc((100vw - (100vw - 120ch)) / 3)"],
    },
    ".box-3": {
      backgroundImage: [
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
        "linear-gradient(330, white, white 50%, #36678d 1px, #36678d 50%)",
      ],
      width: ["100%", "100%", "30%"],
      borderRadius: 8,
      height: ["initial", "initial", "calc((100vw - (100vw - 120ch)) / 3)"],
    },
    ".box-2": {
      backgroundImage: [
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
        "linear-gradient(330, white, white 50%, #36678d 1px, #36678d 50%)",
      ],
      width: ["100%", "100%", "calc(50% - 2rem)"],
      borderRadius: 8,
      height: ["initial", "initial", "calc((100vw - (100vw - 120ch)) / 3)"],
    },
  };

  return (
    <Box sx={boxSetStyle as SxProps<Theme>} className="box-set">
      {children}
    </Box>
  );
};

export default BoxSet;
