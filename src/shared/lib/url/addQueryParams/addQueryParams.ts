export const getQueryParams = (params: Record<string, string | undefined>) => {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value);
    }
  });

  return `?${searchParams.toString()}`;
};

/**
 * Adding query parameters to URL
 * @param params
 */
export const addQueryParams = (params: Record<string, string>) => {
  window.history.pushState(null, "", getQueryParams(params));
};
