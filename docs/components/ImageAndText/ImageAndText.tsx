import React from "react";
import Image from "next/image";
import CTAArrow from "@splitgraph/docs/components/CTAArrow/CTAArrow";
import ImageAndTextContainer from "./ImageAndText.style";

export interface IImageAndTextProps {
  title?: string;
  text?: string;
  link?: string;
  imageRight?: boolean;
}

const ImageAndText = ({
  title,
  text,
  link,
  imageRight,
}: IImageAndTextProps) => {
  return (
    <ImageAndTextContainer>
      <div className="image-text-col">
        <div className="image-text-col__text">
          <div className="image-text-col__text-wrap">
            <div className="image-text-col__text-icon">
              <Image
                src={"/static/icon-tab-related.svg"}
                alt="logo-icon"
                width={25}
                height={40}
              />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <CTAArrow label="Get started" link="/" />
          </div>
        </div>

        <div className="image-text-col__image">
          <Image
            src={"/static/img-illustration-temp.png"}
            alt="illustration"
            layout="responsive"
            width={1200}
            height={720}
            objectFit="cover"
          />
        </div>
      </div>
    </ImageAndTextContainer>
  );
};

export default ImageAndText;
