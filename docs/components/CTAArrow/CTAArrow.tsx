import React, { useState } from "react";
import Link from "next/link";
import ArrowSVG from "@splitgraph/docs/public/static/icon-arrow-right.svg";
import CTAArrowContainer from "./CTAArrow.style";

export interface ICTAArrowProps {
  label: string;
  link: string;
}

const CTAArrow = ({ label, link }) => {
  return (
    <CTAArrowContainer>
      <Link href={link}>
        <a>
          <span>{label}</span>
          <div className="arrow-icon">
            <svg
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99998 5L8.50448 5.55495C8.66084 5.41281 8.74998 5.21131 8.74998 5C8.74998 4.78869 8.66084 4.58719 8.50448 4.44504L7.99998 5ZM4.10448 9.55496L8.50448 5.55495L7.49547 4.44504L3.09547 8.44504L4.10448 9.55496ZM8.50448 4.44504L4.10448 0.445044L3.09547 1.55495L7.49547 5.55495L8.50448 4.44504ZM7.99998 4.25L0.599975 4.25L0.599975 5.75L7.99998 5.75L7.99998 4.25Z"
                fill="currentcolor"
              />
            </svg>
          </div>
        </a>
      </Link>
    </CTAArrowContainer>
  );
};

export default CTAArrow;
