import { useQuery } from "@tanstack/react-query";

import { http } from "./http";

/**
 * User bindings status for different platforms
 */
export interface UserBindings {
  telegram: boolean;
  ptt?: boolean;
}

/**
 * User information from /api/auth/me
 */
export interface User {
  id: number;
  email: string;
  role: string;
  bindings: UserBindings;
  enabled: boolean;
  created_at: string;
}

/**
 * Query key for user data
 */
export const userQueryKey = ["user", "me"] as const;

/**
 * Fetch current user information
 */
const fetchCurrentUser = async (): Promise<User> => {
  return http.get<User>("/api/auth/me");
};

/**
 * Hook to get current user information
 * @param enabled - Whether to enable the query (default: true)
 */
export const useUserQuery = (enabled = true) => {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: fetchCurrentUser,
    enabled,
  });
};

export default useUserQuery;
