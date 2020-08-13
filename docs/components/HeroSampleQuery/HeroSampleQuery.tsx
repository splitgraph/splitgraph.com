// @jsx jsx
// @ts-ignore
import { jsx, Box, Button } from "theme-ui";
import * as React from "react";

import { IconChevronRight, IconChevronLeft } from "@splitgraph/tdesign";

export interface IHeroSampleQueryItem {
  snippet: React.ReactNode;
  description: React.ReactNode;
}

export interface IHeroSampleQueryProps {
  queries: IHeroSampleQueryItem[];
}

const HeroSampleQuery = ({ queries }: IHeroSampleQueryProps) => {
  const [idx, setIdx] = React.useState(0);
  const onClickNext = () => setIdx(idx + 1 > queries.length - 1 ? 0 : idx + 1);
  const onClickPrev = () => setIdx(idx - 1 < 0 ? queries.length - 1 : idx - 1);

  const { snippet, description } = React.useMemo(() => queries[idx], [
    queries,
    idx,
  ]);

  return queries.length > 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // width: ["100ch", "100ch", "90ch"],
        // maxWidth: "90vw",
        width: ["100%", "100%", "50vw"],
        pre: {
          marginTop: 0,
          marginBottom: 0,
          // flexGrow: 1,
          height: "20rem",
          code: {
            // width: "90ch",
          },
        },
      }}
    >
      {snippet}
      <Box
        sx={{
          backgroundColor: "heavy",
          color: "light",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Button
          sx={{
            backgroundColor: "transparent",
          }}
          onClick={onClickPrev}
        >
          <IconChevronLeft color={"light"} size={"1rem"} />
        </Button>
        {description}
        <Button
          sx={{
            backgroundColor: "transparent",
          }}
          onClick={onClickNext}
        >
          <IconChevronRight color={"light"} size={"1rem"} />
        </Button>
      </Box>
    </Box>
  ) : null;
};

export default HeroSampleQuery;
