import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets, profiles, setBlocSession, takenHandles } from '../data/blocData'
import '../styles/customer_login.css'

const sampleProfiles = profiles.filter((profile) => profile.type === 'Customer').slice(0, 3)

function getPasswordStrength(password) {
  if (password.length > 9 && /[A-Z]/.test(password) && /\d/.test(password)) return 'Strong'
  if (password.length > 6) return 'Getting there'
  return 'Too short'
}

function CustomerLogin() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    handle: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleStatus = useMemo(() => {
    const cleanHandle = values.handle.trim().replace(/^@/, '').toLowerCase()
    if (!cleanHandle) return 'idle'
    return takenHandles.includes(cleanHandle) ? 'taken' : 'available'
  }, [values.handle])

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function submitForm(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!values.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!values.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (handleStatus !== 'available') nextErrors.handle = 'Choose an available handle.'
    if (!values.email.includes('@')) nextErrors.email = 'Use a valid email address.'
    if (values.phone.trim().length < 9) nextErrors.phone = 'Use a valid phone number.'
    if (getPasswordStrength(values.password) === 'Too short') nextErrors.password = 'Use at least 7 characters.'
    if (values.password !== values.confirmPassword) nextErrors.confirmPassword = 'Passwords must match.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setBlocSession('customer')
      navigate('/customer-home')
    }
  }

  return (
    <main className="customer-login">
      <img className="customer-login__logo" src={assets.logo} alt="Bloc" />
      <section className="customer-login__hero">
        <div>
          <h1>
            Claim your @.
            <span>It's how your people will find you.</span>
          </h1>
          {!showForm ? (
            <button className="customer-login__primary" type="button" onClick={() => setShowForm(true)}>
              Get Me In
            </button>
          ) : null}
        </div>
        <div className="customer-login__cards" aria-label="Bloc customer examples">
          {sampleProfiles.map((profile, index) => (
            <article className={`customer-login__profile-card customer-login__profile-card--${index + 1}`} key={profile.handle}>
              <img src={profile.image} alt="" />
              <strong>{profile.handle}</strong>
              <p>{profile.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {showForm ? (
        <form className="customer-login__form" onSubmit={submitForm} noValidate>
          <div className="customer-login__form-grid">
            <label>
              First name
              <input name="firstName" value={values.firstName} onChange={updateField} />
              {errors.firstName ? <span>{errors.firstName}</span> : null}
            </label>
            <label>
              Last name
              <input name="lastName" value={values.lastName} onChange={updateField} />
              {errors.lastName ? <span>{errors.lastName}</span> : null}
            </label>
          </div>
          <label className="customer-login__handle">
            @handle
            <div>
              <span>@</span>
              <input name="handle" value={values.handle} onChange={updateField} placeholder="yourname" />
              <strong className={`customer-login__status customer-login__status--${handleStatus}`}>
                {handleStatus === 'available' ? 'Available' : handleStatus === 'taken' ? 'Taken' : ''}
              </strong>
            </div>
            {errors.handle ? <span>{errors.handle}</span> : null}
          </label>
          <div className="customer-login__form-grid">
            <label>
              Email
              <input name="email" type="email" value={values.email} onChange={updateField} />
              {errors.email ? <span>{errors.email}</span> : null}
            </label>
            <label>
              Phone number
              <input name="phone" value={values.phone} onChange={updateField} />
              {errors.phone ? <span>{errors.phone}</span> : null}
            </label>
          </div>
          <div className="customer-login__form-grid">
            <label>
              Password
              <div className="customer-login__password">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={updateField}
                />
                <button type="button" onClick={() => setShowPassword((current) => !current)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <small>{getPasswordStrength(values.password)}</small>
              {errors.password ? <span>{errors.password}</span> : null}
            </label>
            <label>
              Confirm password
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={updateField}
              />
              {errors.confirmPassword ? <span>{errors.confirmPassword}</span> : null}
            </label>
          </div>
          <button className="customer-login__submit" type="submit">Sign Up</button>
        </form>
      ) : null}
    </main>
  )
}

export default CustomerLogin
