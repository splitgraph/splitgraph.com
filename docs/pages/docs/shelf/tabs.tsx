import { useState } from "react";
import { CircularProgress } from "@mui/material";
import {
  Tabs,
  Tab,
  TabBody,
  IconAccount,
  IconSQLCred,
  IconSettings,
} from "@splitgraph/tdesign";

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const TabsDemo = () => {
  const [currentTab, setTab] = useState("repositories");
  const [loading] = useState(false);

  return (
    <>
      <br />
      (vertical)
      <Tabs
        currentTab={currentTab}
        handleChange={(_, newTab) => setTab(`${newTab}`)}
        orientation="vertical"
      >
        <Tab
          label={
            <TabBody
              icon={
                loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <IconAccount
                    color={
                      "repositories" === currentTab ? "flambeeRed.main" : null
                    }
                    sx={{ display: "flex" }}
                  />
                )
              }
              label={"Account"}
              value={1}
            />
          }
          value={"repositories"}
          {...a11yProps(1)}
        />
        <Tab
          label={
            <TabBody
              icon={
                <IconSQLCred
                  color={"namespaces" === currentTab ? "flambeeRed.main" : null}
                  sx={{ display: "flex" }}
                />
              }
              label={"SQL Credentials"}
            />
          }
          value={"namespaces"}
          {...a11yProps(2)}
        />
        <Tab
          sx={{ marginRight: "16px" }}
          label={
            <TabBody
              icon={
                <IconSettings
                  color={"topics" === currentTab ? "flambeeRed.main" : null}
                  sx={{ display: "flex" }}
                />
              }
              label={"Settings"}
            />
          }
          value={"topics"}
          {...a11yProps(3)}
        />
      </Tabs>
      <br />
      (horizontal)
      <Tabs
        currentTab={currentTab}
        handleChange={(_, newTab) => setTab(`${newTab}`)}
        orientation="horizontal"
      >
        <Tab
          label={
            <TabBody
              icon={
                loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <IconAccount
                    color={
                      "repositories" === currentTab ? "flambeeRed.main" : null
                    }
                    sx={{ display: "flex" }}
                  />
                )
              }
              label={"Account"}
              value={1}
            />
          }
          value={"repositories"}
          {...a11yProps(1)}
        />
        <Tab
          label={
            <TabBody
              icon={
                <IconSQLCred
                  color={"namespaces" === currentTab ? "flambeeRed.main" : null}
                  sx={{ display: "flex" }}
                />
              }
              label={"SQL Credentials"}
            />
          }
          value={"namespaces"}
          {...a11yProps(2)}
        />
        <Tab
          sx={{ marginRight: "16px" }}
          label={
            <TabBody
              icon={
                <IconSettings
                  color={"topics" === currentTab ? "flambeeRed.main" : null}
                  sx={{ display: "flex" }}
                />
              }
              label={"Settings"}
            />
          }
          value={"topics"}
          {...a11yProps(3)}
        />
      </Tabs>
    </>
  );
};

export default TabsDemo;
