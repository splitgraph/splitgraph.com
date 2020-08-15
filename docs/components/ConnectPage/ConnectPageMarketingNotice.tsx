// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { MarketingNotice } from "../MarketingNotice";

export interface IConnectPageMarketingNoticeProps {
  onboardingState?: "post-auth" | "post-auth-welcome";
}

const ConnectPageMarketingNotice = ({
  onboardingState,
}: IConnectPageMarketingNoticeProps) => {
  return (
    <MarketingNotice>
      Welcome to Splitgraph{" "}
      <pre>{JSON.stringify(onboardingState, null, 2)}</pre>
    </MarketingNotice>
  );
};

export default ConnectPageMarketingNotice;
