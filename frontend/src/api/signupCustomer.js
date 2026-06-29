import { apiRequest } from './apiRequest'

export function signupCustomer(values) {
  return apiRequest('/api/auth/customers/signup', {
    method: 'POST',
    body: JSON.stringify({
      first_name: values.firstName,
      last_name: values.lastName,
      handle: values.handle,
      email: values.email,
      phone_number: values.phone,
      password: values.password,
      confirm_password: values.confirmPassword,
    }),
  })
}
