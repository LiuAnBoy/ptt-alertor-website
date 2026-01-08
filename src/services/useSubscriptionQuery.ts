import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { http } from "./http";

export type SubType = "keyword" | "author" | "pushsum";

export interface Subscription {
  id: number;
  user_id: number;
  board: string;
  sub_type: SubType;
  value: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateSubscriptionRequest {
  board: string;
  sub_type: SubType;
  value: string;
}

export interface UpdateSubscriptionRequest {
  board: string;
  sub_type: SubType;
  value: string;
  enabled: boolean;
}

export const subscriptionQueryKey = ["subscriptions"] as const;

/**
 * Fetch all subscriptions
 */
const fetchSubscriptions = async (): Promise<Subscription[]> => {
  return http.get<Subscription[]>("/api/subscriptions");
};

/**
 * Create a new subscription
 */
const createSubscription = async (
  data: CreateSubscriptionRequest,
): Promise<Subscription> => {
  return http.post<Subscription>("/api/subscriptions", data);
};

/**
 * Update subscription
 */
const updateSubscription = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateSubscriptionRequest;
}): Promise<{ success: boolean; message: string }> => {
  return http.put(`/api/subscriptions/${id}`, data);
};

/**
 * Delete subscription
 */
const deleteSubscription = async (
  id: number,
): Promise<{ success: boolean; message: string }> => {
  return http.delete(`/api/subscriptions/${id}`);
};

/**
 * Hook to get all subscriptions
 * @param enabled - Whether to enable the query (default: true)
 */
export const useSubscriptionQuery = (enabled = true) => {
  return useQuery({
    queryKey: subscriptionQueryKey,
    queryFn: fetchSubscriptions,
    enabled,
  });
};

/**
 * Hook to create subscription
 */
export const useCreateSubscriptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionQueryKey });
    },
  });
};

/**
 * Hook to update subscription
 */
export const useUpdateSubscriptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionQueryKey });
    },
  });
};

/**
 * Hook to delete subscription
 */
export const useDeleteSubscriptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionQueryKey });
    },
  });
};
