export type StatsSubType = "keyword" | "author" | "pushsum";

export interface SubscriptionStat {
  id: number;
  board: string;
  sub_type: StatsSubType;
  value: string;
  count: number;
  updated_at: string;
}
