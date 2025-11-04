import { config } from "@/consts/apiConfig";

export const buildApiUrl = (
  endpoint: string,
  params?: Record<string, string | number>
): string => {
  const baseUrl = `${config.ecwid.apiUrl}/${config.ecwid.storeId}${endpoint}`;

  if (params && Object.keys(params).length > 0) {
    const urlParams = new URLSearchParams(params as Record<string, string>);
    return `${baseUrl}?${urlParams.toString()}`;
  }

  return baseUrl;
};

/**
 * Wrapper around fetch that includes authentication headers
 * and handles common error scenarios
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: {
    params?: Record<string, string | number>;
    init?: RequestInit;
  }
): Promise<T> {
  const url = buildApiUrl(endpoint, options?.params);

  const response = await fetch(url, {
    ...options?.init,
    headers: {
      ...options?.init?.headers,
      Authorization: `Bearer ${config.ecwid.apiToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
