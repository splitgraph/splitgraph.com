import * as React from "react";
import { Box, Button } from "@material-ui/core";

import { IconChevronRight, IconChevronLeft } from "@splitgraph/tdesign";

export interface IHeroSampleQueryItem {
  snippet: React.ReactNode;
  description: React.ReactNode;
}

export interface IHeroSampleQueryProps {
  queries: IHeroSampleQueryItem[];
  fixedWidth?: number | string;
}

const HeroSampleQuery = ({
  queries,
  fixedWidth = "min(80ch, 100%)",
}: IHeroSampleQueryProps) => {
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
        minWidth: fixedWidth,
        maxWidth: fixedWidth,
        // width: ["100ch", "100ch", "90ch"],
        // maxWidth: "90vw",
        // width: ["100%", "100%", "40ch"],
        // maxWidth: "100%",
        pre: {
          marginTop: 0,
          marginBottom: 0,
          marginRight: "0 !important",
          marginLeft: "0 !important",
          // flexGrow: 1,
          height: "20rem",
          code: {
            maxWidth: "100%",
          },
        },
      }}
    >
      {snippet}
      <Box
        sx={{
          // minWidth: fixedWidth,
          // maxWidth: fixedWidth,
          width: fixedWidth,
          // width: "min(80ch, 100%)",
          // width: "80ch",
          backgroundColor: "heavy.main",
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
            display: "flex",
          }}
          onClick={onClickPrev}
        >
          <IconChevronLeft color={"light"} size={"1rem"} />
        </Button>
        {description}
        <Button
          sx={{
            backgroundColor: "transparent",
            display: "flex",
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
