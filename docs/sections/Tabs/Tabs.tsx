import React, { useState } from "react";
import Image from "next/image";
import { Element } from "react-scroll";
import StickyTabs from "@splitgraph/docs/components/StickyTabs/StickyTabs";
import TextAndIcon from "@splitgraph/docs/components/TextAndIcon/TextAndIcon";
import TabsContainer from "./Tabs.style";

export interface ITabsProps {}

const Tabs = () => {
  // const [isMenuOpen, setMenuOpen] = useState(false);

  // const onMenuToggle = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  return (
    <TabsContainer>
      <StickyTabs />
      <Element name="IntegrationRef">
        <div className="black-shape top-radius" id="start-section">
          <div className="source-section">
            <div className="source-section__text">
              <div className="source-section__text-top">
                <TextAndIcon
                  title="Start at the source."
                  text="This is where data enters the stack, and it's where problems with
              the stack originate. An out-of-control pipeline leads to surprise
              bandwidth bills from ASW. On top of that, you have to worry about
              missing and out-of-sink data."
                />
              </div>
              <div className="source-section__text-bottom"></div>
            </div>

            <div className="source-section__image">
              <Image
                src={"/static/img-illustration-temp.png"}
                alt="illustration"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </Element>

      <div className="vector-shape reverse">
        <Image
          src={"/static/icon-shape.svg"}
          alt="vector-shape"
          layout="responsive"
          width={1366}
          height={320}
        />
      </div>

      <Element name="StorageRef">
        <div className="white-shape">
          <div className="storage-section">
            <div className="storage-section__left">
              <TextAndIcon
                title="Storage layer title."
                text="Splitgraph supports live data (data federation) and data images (data versioning). This allows you to get the best of both worlds. You can start off just querying datasets at source (the only thing you have to do is add credentials to your database) and then immediately move on to data warehousing wihtout having to... "
              />

              <div className="storage-section__left-image">
                <Image
                  src={"/static/img-illustration-temp.png"}
                  alt="illustration"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            <div className="storage-section__right">
              <div className="storage-section__right-item">
                <h4>Separate compute and storage</h4>
                <p>
                  The integration layer presents your first chance to make sure
                  that the data your teams rely on is accurate, up-to-date, and
                  complete. It's easy to get started, just input your read-only
                  credentials.
                </p>
              </div>

              <div className="storage-section__right-item">
                <h4>Delta compressed</h4>
                <p>
                  Splitgraph supports live data (data federation) and data
                  images (data versioning). This allows you to get the best of
                  both worlds. You can start off just querying datasets at
                  source.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Element>

      <div className="vector-shape rotate">
        <Image
          src={"/static/icon-shape.svg"}
          alt="vector-shape"
          layout="responsive"
          width={1366}
          height={320}
        />
      </div>

      <Element name="ModellingRef">
        <div className="black-shape bottom-radius">
          <div className="model-section">
            <div className="model-section__text">
              <TextAndIcon
                title="A better data model with Splitfiles."
                text="This is where data enters the stack, and it's where problems with the stack originate. An out-of-control pipeline leads to surprise bandwidth bills from ASW. On top of that, you have to worry about missing and out-of-sink data. Splitgraph can integrate with all your disjoint data sources (other databases, e.g. Stripe API, Mailchimp campaign data etc) and put them in one place. Think of it as a magic database"
              />
            </div>

            <div className="model-section__image">
              <Image
                src={"/static/img-illustration-temp.png"}
                alt="illustration"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </Element>

      <Element name="DiscoveryRef">
        <div className="tab-section">
          <h2>Discovery</h2>
          <p>
            This is where data enters the stack, and it's where problems with
            the stack originate. An out-of-control pipeline leads to surprise
            bandwidth bills from ASW. On top of that, you have to worry about
            missing and out-of-sink data.
          </p>
        </div>
      </Element>
      <Element name="AccessRef">
        <div className="tab-section black">
          <h2>Access</h2>
          <p>
            This is where data enters the stack, and it's where problems with
            the stack originate. An out-of-control pipeline leads to surprise
            bandwidth bills from ASW. On top of that, you have to worry about
            missing and out-of-sink data.
          </p>
        </div>
      </Element>
    </TabsContainer>
  );
};

export default Tabs;
