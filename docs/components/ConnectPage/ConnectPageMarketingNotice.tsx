/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box } from "theme-ui";

import { MarketingNotice } from "../MarketingNotice";

export interface IConnectPageMarketingNoticeProps {
  onboardingState?: "post-auth" | "post-auth-welcome";
}

const ConnectPageMarketingNotice = ({
  onboardingState,
}: IConnectPageMarketingNoticeProps) => {
  return (
    <MarketingNotice>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {onboardingState === "post-auth-welcome" ? (
          <>
            <strong>Welcome to Splitgraph</strong>. Get credentials to connect
            to the DDN.
          </>
        ) : null}
      </Box>
    </MarketingNotice>
  );
};

export default ConnectPageMarketingNotice;
