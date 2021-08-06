import React, { useState } from "react";
import Image from "next/image";
import TextAndIconContainer from "./TextAndIcon.style";

export interface ITextAndIconProps {}

const TextAndIcon = ({ title, text }) => {
  return (
    <TextAndIconContainer>
      <div className="tab-icon">
        <Image
          src={"/static/icon-tab-related.svg"}
          alt="logo-icon"
          width={25}
          height={40}
        />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </TextAndIconContainer>
  );
};

export default TextAndIcon;
