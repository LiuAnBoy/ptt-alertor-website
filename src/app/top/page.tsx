"use client";

import {
  Box,
  Container,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import { StatsSubType, useStatsQuery } from "@/services/useStatsQuery";

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

const TAB_CONFIG: { label: string; type: StatsSubType; valueLabel: string }[] =
  [
    { label: "關鍵字", type: "keyword", valueLabel: "關鍵字" },
    { label: "作者", type: "author", valueLabel: "作者" },
    { label: "推噓文", type: "pushsum", valueLabel: "推文數" },
  ];

const StatsTable = ({
  type,
  valueLabel,
}: {
  type: StatsSubType;
  valueLabel: string;
}) => {
  const { data: stats = [], isLoading } = useStatsQuery(type, 100);

  if (isLoading) {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
        載入中...
      </Typography>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ bgcolor: "#121212" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              排名
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              看板
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              {valueLabel}
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              訂閱數
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat, index) => (
            <TableRow key={stat.id} hover>
              <TableCell sx={{ color: "black" }}>{index + 1}</TableCell>
              <TableCell sx={{ color: "black" }}>{stat.board}</TableCell>
              <TableCell sx={{ color: "black" }}>{stat.value}</TableCell>
              <TableCell sx={{ color: "black" }} align="right">
                {stat.count.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TopPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
        color="#121212"
      >
        熱門訂閱排行
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          {TAB_CONFIG.map((tab) => (
            <Tab key={tab.type} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {TAB_CONFIG.map((tab, index) => (
        <TabPanel key={tab.type} value={tabIndex} index={index}>
          <StatsTable type={tab.type} valueLabel={tab.valueLabel} />
        </TabPanel>
      ))}
    </Container>
  );
};

export default TopPage;
