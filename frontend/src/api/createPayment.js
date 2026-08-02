import { apiRequest } from './apiRequest'

export function createPayment(values) {
  return apiRequest('/api/payments', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
