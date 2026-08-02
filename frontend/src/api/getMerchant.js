import { apiRequest } from './apiRequest'

export function getMerchant(handle) {
  return apiRequest(`/api/merchants/${handle.replace(/^@/, '')}`)
}
