import { apiRequest } from './apiRequest'

export function searchPeople(query, customerId) {
  const params = new URLSearchParams({ q: query })
  if (customerId) params.set('customer_id', customerId)

  return apiRequest(`/api/search?${params.toString()}`)
}
