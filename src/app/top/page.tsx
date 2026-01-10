import { Container, Typography } from "@mui/material";
import { Metadata } from "next";

import TopTabs from "@/shared/components/top/TopTabs";
import { SubscriptionStat } from "@/types/stats";

export const metadata: Metadata = {
  title: "PTT Alertor | TOP 100",
  description: "PTT 熱門訂閱排行榜",
};

/**
 * Fetch subscription stats from API
 */
async function fetchStats(type: string): Promise<SubscriptionStat[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090";
  const res = await fetch(
    `${apiUrl}/api/stats/subscriptions?type=${type}&limit=100`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function TopPage() {
  const [keywordStats, authorStats, pushsumStats] = await Promise.all([
    fetchStats("keyword"),
    fetchStats("author"),
    fetchStats("pushsum"),
  ]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 3 }}
        color="text.secondary"
      >
        TOP 100
      </Typography>

      <TopTabs
        keywordStats={keywordStats}
        authorStats={authorStats}
        pushsumStats={pushsumStats}
      />
    </Container>
  );
}
