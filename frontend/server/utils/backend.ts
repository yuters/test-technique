export function buildBackendUrl(path: string, baseUrl: string): string {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${normalizedBaseUrl}${normalizedPath}`
}
