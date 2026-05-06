interface BuildUrlParams {
  baseUrl: string;
  parameters: { key: string; value: string }[];
  redirectUrl?: string | null;
}

export function buildUrl({
  baseUrl,
  parameters,
  redirectUrl,
}: BuildUrlParams): string {
  const url = new URL(baseUrl);

  for (const param of parameters) {
    url.searchParams.append(param.key, param.value);
  }

  let finalUrl = url.toString();

  if (redirectUrl) {
    const separator = finalUrl.includes("?") ? "&" : "?";
    finalUrl = `${finalUrl}${separator}redirect=${redirectUrl}`;
  }

  return finalUrl;
}
