import React from "react";
import ArrowTextContainer from "./ArrowText.style";

export interface ArrowTextProps {
  label?: string;
  variant?: string;
  children?: React.ReactNode;
}

const ArrowText = ({
  label,
  variant = "primary",
  ...props
}: ArrowTextProps) => {
  return (
    <ArrowTextContainer className={`${variant}`} {...props}>
      <h6>{label}</h6>
      <div className="icon">
        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.0001 4.99998L8.5046 5.55494C8.66096 5.4128 8.7501 5.21129 8.7501 4.99998C8.7501 4.78868 8.66096 4.58717 8.5046 4.44503L8.0001 4.99998ZM4.1046 9.55494L8.5046 5.55494L7.49559 4.44503L3.09559 8.44503L4.1046 9.55494ZM8.5046 4.44503L4.1046 0.445029L3.09559 1.55494L7.49559 5.55494L8.5046 4.44503ZM8.0001 4.24998L0.600097 4.24998L0.600097 5.74998L8.0001 5.74998L8.0001 4.24998Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </ArrowTextContainer>
  );
};

export default ArrowText;
