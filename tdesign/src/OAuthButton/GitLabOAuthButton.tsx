// @jsx jsx
// @ts-ignore
import { jsx, Button } from "theme-ui";
import * as React from "react";

import OAuthButton, { IOAuthButtonProps } from "./OAuthButton";

const GitLabLogoIcon = () => (
  <svg
    width="2rem"
    height="2rem"
    className="gitlab-logo-icon"
    style={{
      maxHeight: "2rem",
      marginRight: "1rem",
    }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 338.976 313.44"
  >
    <path d="M337.97 175.57l-17.78-54.63a7.72 7.72 0 00-.43-1.47L284.09 9.67A14.18 14.18 0 00270.55 0a13.94 13.94 0 00-13.38 9.75l-34 104.63H115.86L81.81 9.75A13.94 13.94 0 0068.49 0h-.08a14.22 14.22 0 00-13.5 9.76l-35.7 109.93c0 .1-.08.18-.11.28L1 175.58a20.29 20.29 0 007.37 22.71l156.38 113.63a8 8 0 009.45-.05l156.41-113.58a20.28 20.28 0 007.36-22.72m-233.75-45.13l43.59 134.16L43.17 130.44m148.05 134.19l41.8-128.62 1.8-5.57h61.1l-94.67 121.28m69.44-231.67l30.63 94.33h-61.31m-22.03 16l-30.37 93.46-18.12 55.66-48.42-149.12M68.34 20.05l30.69 94.33H37.76m-19.98 70.97a4.31 4.31 0 01-1.56-4.83l13.44-41.3 98.57 126.37m192.98-80.24l-110.46 80.21.37-.48 98.2-125.86 13.44 41.28a4.31 4.31 0 01-1.55 4.84" />
  </svg>
);

const button = (
  <Button
    variant="pill"
    sx={{
      fontSize: 2,
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      color: "heavy",
    }}
  >
    <GitLabLogoIcon /> Login with GitLab
  </Button>
);

const GitLabOAuthButton = (props: IOAuthButtonProps) => {
  return <OAuthButton button={button} {...props} identityProvider="gitlab" />;
};

export default GitLabOAuthButton;
