import React, { useState } from "react";
import Image from "next/image";
import ShapeContainer from "./Shape.style";

export interface IShapeProps {}

const Shape = () => {
  return (
    <ShapeContainer>
      <div className="black-shape top-radius" />
      <div className="vector-shape">
        <Image
          src={"/static/icon-shape.svg"}
          alt="vector-shape"
          layout="responsive"
          width={1366}
          height={320}
        />
      </div>
      <div className="white-shape" />
      <div className="vector-shape reverse">
        <Image
          src={"/static/icon-shape.svg"}
          alt="vector-shape"
          layout="responsive"
          width={1366}
          height={320}
        />
      </div>
      <div className="black-shape bottom-radius" />
    </ShapeContainer>
  );
};

export default Shape;
