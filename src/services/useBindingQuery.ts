import { useMutation, useQueryClient } from "@tanstack/react-query";

import { http } from "./http";
import { userQueryKey } from "./useUserQuery";

/**
 * Response from POST /api/bindings/bind-code
 */
export interface BindCodeResponse {
  bind_code: string;
  expires_at: string;
  service: string;
  bind_url: string;
  message: string;
}

/**
 * Response from DELETE /api/bindings/:service
 */
export interface UnbindResponse {
  success: boolean;
  message: string;
}

/**
 * Generate bind code for a service
 */
const generateBindCode = async (service: string): Promise<BindCodeResponse> => {
  return http.post<BindCodeResponse>("/api/bindings/bind-code", { service });
};

/**
 * Unbind a service
 */
const unbindService = async (service: string): Promise<UnbindResponse> => {
  return http.delete<UnbindResponse>(`/api/bindings/${service}`);
};

/**
 * Hook to generate bind code
 */
export const useBindMutation = () => {
  return useMutation({
    mutationFn: generateBindCode,
  });
};

/**
 * Hook to unbind a service
 */
export const useUnbindMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unbindService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
  });
};

/**
 * Request to bind PTT account
 */
export interface BindPTTAccountRequest {
  username: string;
  password: string;
}

/**
 * Bind PTT account
 */
const bindPTTAccount = async (
  data: BindPTTAccountRequest,
): Promise<UnbindResponse> => {
  return http.post<UnbindResponse>("/api/ptt-account", data);
};

/**
 * Unbind PTT account
 */
const unbindPTTAccount = async (): Promise<UnbindResponse> => {
  return http.delete<UnbindResponse>("/api/ptt-account");
};

/**
 * Hook to bind PTT account
 */
export const useBindPTTAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bindPTTAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
  });
};

/**
 * Hook to unbind PTT account
 */
export const useUnbindPTTAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unbindPTTAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
  });
};
