import * as React from "react";
import { styled } from "@mui/material/styles";
import type { muiTheme } from "@splitgraph/tdesign/src/themes/muiTheme";
import { Button } from "@mui/material";

interface CallToActionOpts {
  href: string;
}

interface MarketingNoticeProps {
  cta?: React.PropsWithChildren<CallToActionOpts>;
}

const MarketingNoticeContainer = styled("div")(
  ({ theme }: { theme: ReturnType<typeof muiTheme> }) => ({
    paddingTop: "14px",
    paddingBottom: "14px",
    paddingLeft: `calc(5px + ${theme.constants.leftMarginLogoAligned})`,
    paddingRight: theme.constants.rightMarginNavAligned,
    background: theme.constants.pinkBackgroundGradient,
    display: "flex",
    alignItems: "center",
  })
);

const CenteredChildrenContainer = styled("div")({
  color: "heavy.main",
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
});

const RightAlignedCTAContainer = styled("div")({
  alignSelf: "flex-end",
});

const CTAButton = styled(Button)(
  ({ theme }: { theme: ReturnType<typeof muiTheme> }) => ({
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.flambeeRed.light,
    boxShadow: "none",
    borderRadius: "10px",
    margin: 0,
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
    fontSize: "14px",
  })
);

export const MarketingNotice = ({
  children,
  cta,
}: React.PropsWithChildren<MarketingNoticeProps>) => {
  return (
    <MarketingNoticeContainer>
      <CenteredChildrenContainer>{children}</CenteredChildrenContainer>
      <RightAlignedCTAContainer>
        <CTAButton {...cta} />
      </RightAlignedCTAContainer>
    </MarketingNoticeContainer>
  );
};
