import { useMutation, useQuery } from "@tanstack/react-query";

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
 * Change password request body
 */
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

/**
 * Success response from API
 */
export interface SuccessResponse {
  success: boolean;
  message: string;
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
 * Change user password
 */
const changePassword = async (
  data: ChangePasswordRequest,
): Promise<SuccessResponse> => {
  return http.put<SuccessResponse>("/api/auth/password", data);
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

/**
 * Hook to change user password
 */
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export default useUserQuery;
