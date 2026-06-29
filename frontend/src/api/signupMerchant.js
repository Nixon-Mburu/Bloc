import { apiRequest } from './apiRequest'

export function signupMerchant(values) {
  return apiRequest('/api/auth/merchants/signup', {
    method: 'POST',
    body: JSON.stringify({
      business_name: values.businessHandle || values.handle,
      owner_first_name: values.firstName,
      owner_last_name: values.lastName,
      handle: values.businessHandle || values.handle,
      email: values.email,
      phone_number: values.phone,
      password: values.password,
      confirm_password: values.password,
      profile_bio: values.businessBio || values.bio,
      location: values.location,
    }),
  })
}
