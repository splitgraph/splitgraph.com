// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";

import withTheme from "../hocs/withTheme";
import { LandingPageLayout } from "../components/LandingPageLayout";
import { HeroBox } from "../components/HeroBox";

const LandingPage = () => {
  return (
    <LandingPageLayout>
      <HeroBox>
        <h1>Get your data sorted.</h1>
        <h2>Create, Share and Extend Versioned Data, at Scale.</h2>
        <h1>
          <pre>sgr clone tmdb/movies:latest</pre>
        </h1>
      </HeroBox>
      <Box
        sx={
          {
            backgroundImage: `url("/static/diagrams/MixMatchRotated2.svg")`,
            minHeight: "30vh",
            backgroundColor: "primary",
            backgroudnRepeat: "no-repeat"
          } as SystemStyleObject
        }
      >
        Hello
      </Box>
    </LandingPageLayout>
  );
};

export default withTheme(LandingPage);
