"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";

import { prefetchQueryKeys } from "@/shared/constants/prefetchQueryKeys";

interface QueryProviderProps {
  children: ReactNode;
}

function PrefetchWrapper({ children }: { children: ReactNode }) {
  const { status, data: session } = useSession();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const userId = session?.user?.id;

  useEffect(() => {
    if (status === "loading") return;

    const handlePrefetch = async () => {
      const queriesToRun = prefetchQueryKeys.filter(
        ({ requiresUserId }) => !requiresUserId || userId,
      );

      await Promise.all(
        queriesToRun.map(async ({ key, queryFn }) => {
          const queryKey = key(userId);
          await queryClient.prefetchQuery({
            queryKey,
            queryFn: () => queryFn(userId),
          });
        }),
      );

      queriesToRun.forEach(({ key }) => {
        const queryKey = key(userId);
        const state = queryClient.getQueryState(queryKey);
        if (state?.status === "error") {
          enqueueSnackbar(state.error?.message || "Failed to fetch data", {
            variant: "error",
          });
        }
      });
    };

    handlePrefetch();
  }, [queryClient, userId, enqueueSnackbar, status]);

  return <>{children}</>;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PrefetchWrapper>{children}</PrefetchWrapper>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
