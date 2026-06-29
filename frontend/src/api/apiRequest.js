import { getApiBaseUrl } from './getApiBaseUrl'

export async function apiRequest(path, options = {}) {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '')
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.error || 'Something went wrong. Please try again.')
  }

  return payload
}
