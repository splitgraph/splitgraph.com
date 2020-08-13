// @jsx jsx
// @ts-ignore
import { jsx, Box, Button } from "theme-ui";
import * as React from "react";

import { IconChevronRight, IconChevronLeft } from "@splitgraph/tdesign";

export interface IHeroSampleSplitfileItem {
  snippet: React.ReactNode;
  description: React.ReactNode;
}

export interface IHeroSampleSplitfileProps {
  splitfiles: IHeroSampleSplitfileItem[];
}

const HeroSampleSplitfile = ({ splitfiles }: IHeroSampleSplitfileProps) => {
  const [idx, setIdx] = React.useState(0);
  const onClickNext = () =>
    setIdx(idx + 1 > splitfiles.length - 1 ? 0 : idx + 1);
  const onClickPrev = () =>
    setIdx(idx - 1 < 0 ? splitfiles.length - 1 : idx - 1);

  const { snippet, description } = React.useMemo(() => splitfiles[idx], [
    splitfiles,
    idx,
  ]);

  return splitfiles.length > 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // width: ["100ch", "100ch", "90ch"],
        // maxWidth: "90vw",
        width: ["90vw", "50ch", "50ch"],
        pre: {
          marginTop: 0,
          marginBottom: 0,
          // flexGrow: 1,
          height: "40rem",
          maxHeight: "80vh",
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

export default HeroSampleSplitfile;
