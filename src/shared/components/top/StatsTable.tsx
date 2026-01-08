import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { SubscriptionStat } from "@/types/stats";

interface StatsTableProps {
  stats: SubscriptionStat[];
  valueLabel: string;
}

/**
 * Table component for displaying subscription statistics
 */
const StatsTable = ({ stats, valueLabel }: StatsTableProps) => {
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

export default StatsTable;
