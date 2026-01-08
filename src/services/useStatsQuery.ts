import { useQuery } from "@tanstack/react-query";

import { http } from "./http";

export type StatsSubType = "keyword" | "author" | "pushsum";

export interface SubscriptionStat {
  id: number;
  board: string;
  sub_type: StatsSubType;
  value: string;
  count: number;
  updated_at: string;
}

export const statsQueryKey = ["stats", "subscriptions"] as const;

/**
 * Fetch subscription stats by type
 */
const fetchSubscriptionStats = async (
  type: StatsSubType,
  limit?: number,
): Promise<SubscriptionStat[]> => {
  const params = new URLSearchParams({ type });
  if (limit) {
    params.append("limit", limit.toString());
  }
  return http.get<SubscriptionStat[]>(`/api/stats/subscriptions?${params}`);
};

/**
 * Hook to get subscription stats
 * @param type - The subscription type (keyword, author, pushsum)
 * @param limit - Maximum number of results
 */
export const useStatsQuery = (type: StatsSubType, limit?: number) => {
  return useQuery({
    queryKey: [...statsQueryKey, type, limit],
    queryFn: () => fetchSubscriptionStats(type, limit),
  });
};
