/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
//@ts-nocheck
import { css } from "@emotion/react";
import { Slider, Box, Typography, Button } from "@material-ui/core";

const EmotionCSS = () => {
  return (
    <Box sx={{ width: 400 }}>
      <Typography>{"MUI default <Slider>"}</Typography>
      <Slider defaultValue={30} />
      <Typography>{"<Slider> css prop accessing theme.myColor"}</Typography>
      <em>
        <Typography>
          {
            "theme.myColor is an arbitrary property assigned to the Emotion theme object, which started as the MUI object"
          }
        </Typography>
      </em>
      <Slider
        defaultValue={30}
        css={(theme) => {
          return { color: theme.myColor };
        }}
      />
      <Typography>
        {"<Slider> css prop accessing theme.palette.primary.main"}
      </Typography>
      <Slider
        defaultValue={30}
        css={(theme) => ({
          color: theme.palette.primary.main,
        })}
      />
      <Typography>{"<Slider> with css prop"}</Typography>
      <Slider
        defaultValue={30}
        css={css`
          color: #20b2aa;

          :hover {
            color: #2e8b57;
          }
        `}
      />
    </Box>
  );
};

export default EmotionCSS;
