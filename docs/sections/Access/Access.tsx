import React, { useState } from "react";
import Image from "next/image";
import { Element } from "react-scroll";
import ImageAndText from "@splitgraph/docs/components/ImageAndText/ImageAndText";
import AccessContainer from "./Access.style";

export interface IAccessProps {}

const Access = () => {
  return (
    <AccessContainer>
      <div>
        <Element name="AccessRef">
          <div className="access-section">
            <div className="access-section__title">
              <div className="tab-icon">
                <Image
                  src={"/static/icon-tab-related.svg"}
                  alt="logo-icon"
                  width={25}
                  height={40}
                />
              </div>
              <h2>
                Many ways <strong>to access</strong>
              </h2>
            </div>

            <div className="access-section__columns">
              <ImageAndText
                title="Bring your own tools"
                text={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros mauris. dictum eros mauris. Mauris dictum eros mauris.  dictum eros mauris"
                }
              />
              <ImageAndText
                title="Data governance"
                text={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros mauris. dictum eros mauris. Mauris dictum eros mauris.  dictum eros mauris"
                }
                imageLeft
              />
              <ImageAndText
                title="A simple web editor"
                text={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros mauris. dictum eros mauris. Mauris dictum eros mauris.  dictum eros mauris"
                }
              />
            </div>
          </div>
        </Element>
      </div>
    </AccessContainer>
  );
};

export default Access;
