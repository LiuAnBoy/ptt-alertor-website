import { userQueryKey } from "@/services/useUserQuery";
import { apiClient } from "@/shared/services/apiClient";

interface PrefetchQueryConfig {
  key: (userId?: string) => string[];
  queryFn: (userId?: string) => Promise<unknown>;
  requiresUserId: boolean;
}

export const prefetchQueryKeys: PrefetchQueryConfig[] = [
  {
    key: () => userQueryKey as unknown as string[],
    queryFn: () => apiClient.get("/api/auth/me"),
    requiresUserId: true,
  },
];
