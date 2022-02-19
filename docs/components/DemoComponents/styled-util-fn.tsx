import { Typography, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export default function StyledComponents() {
  return (
    <div>
      <Typography>styled from "@mui/material/styles"</Typography>
      <Slider defaultValue={30} />
      <CustomizedSlider defaultValue={30} />
      <p>
        MUI wraps{" "}
        <a href="https://mui.com/system/styled/">Emotion's styled()</a>
      </p>
    </div>
  );
}
