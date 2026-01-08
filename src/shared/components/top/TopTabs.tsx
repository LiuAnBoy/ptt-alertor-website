"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import { SubscriptionStat } from "@/types/stats";

import StatsTable from "./StatsTable";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ py: 3 }}>
      {value === index && children}
    </Box>
  );
};

interface TabConfig {
  label: string;
  valueLabel: string;
}

interface TopTabsProps {
  keywordStats: SubscriptionStat[];
  authorStats: SubscriptionStat[];
  pushsumStats: SubscriptionStat[];
}

const TAB_CONFIG: TabConfig[] = [
  { label: "關鍵字", valueLabel: "關鍵字" },
  { label: "作者", valueLabel: "作者" },
  { label: "推噓文", valueLabel: "推文數" },
];

/**
 * Tabs component for switching between different stats types
 */
const TopTabs = ({ keywordStats, authorStats, pushsumStats }: TopTabsProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const statsData = [keywordStats, authorStats, pushsumStats];

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          {TAB_CONFIG.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {TAB_CONFIG.map((tab, index) => (
        <TabPanel key={tab.label} value={tabIndex} index={index}>
          <StatsTable stats={statsData[index]} valueLabel={tab.valueLabel} />
        </TabPanel>
      ))}
    </>
  );
};

export default TopTabs;
