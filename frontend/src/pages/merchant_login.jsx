import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupMerchant } from '../api/signupMerchant'
import { assets, profiles, setBlocSession, takenHandles } from '../data/blocData'
import '../styles/merchant_login.css'

const businessProfiles = profiles.filter((profile) => profile.type === 'Merchant')
const categories = ['Restaurant', 'Retail', 'Mama Mboga', 'Services', 'Beauty', 'Other']
const payoutOptions = ['Till Number', 'Paybill', 'Personal M-Pesa']

function MerchantLogin() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Restaurant')
  const [payoutType, setPayoutType] = useState('Till Number')
  const [expandedHours, setExpandedHours] = useState(false)
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    handle: '',
    bio: '',
    businessHandle: '',
    businessBio: '',
    location: '',
    till: '',
    paybill: '',
    account: '',
    mpesa: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStatus = useMemo(() => {
    const source = values.handle || values.businessHandle
    const cleanHandle = source.trim().replace(/^@/, '').toLowerCase()
    if (!cleanHandle) return 'idle'
    return takenHandles.includes(cleanHandle) ? 'taken' : 'available'
  }, [values.businessHandle, values.handle])

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => {
      const next = { ...current, [name]: value }
      if (name === 'handle' && !current.businessHandle) next.businessHandle = value
      if (name === 'bio' && !current.businessBio) next.businessBio = value
      return next
    })
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  async function submitForm(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!values.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!values.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (values.phone.trim().length < 9) nextErrors.phone = 'Use a valid phone number.'
    if (!values.email.includes('@')) nextErrors.email = 'Use a valid email.'
    if (values.password.length < 7) nextErrors.password = 'Use at least 7 characters.'
    if (handleStatus !== 'available') nextErrors.handle = 'Choose an available business handle.'
    if (!values.businessBio.trim()) nextErrors.businessBio = 'Add a short business bio.'
    if (!values.location.trim()) nextErrors.location = 'Add your business location.'
    if (payoutType === 'Till Number' && !values.till.trim()) nextErrors.till = 'Add your till number.'
    if (payoutType === 'Paybill' && (!values.paybill.trim() || !values.account.trim())) {
      nextErrors.paybill = 'Add both paybill and account number.'
    }
    if (payoutType === 'Personal M-Pesa' && values.mpesa.trim().length < 9) nextErrors.mpesa = 'Add a valid M-Pesa number.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitting(true)
      try {
        await signupMerchant(values)
        setBlocSession('merchant')
        navigate('/merchant-home')
      } catch (error) {
        setErrors({ form: error.message })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const routingName = values.businessHandle || values.handle || "JOHN'S KITCHEN"

  return (
    <main className="merchant-login">
      <header className="merchant-login__header">
        <img src={assets.logo} alt="Bloc" />
        <h1>
          Look like the business
          <span>you are.</span>
        </h1>
      </header>

      <section className="merchant-login__proof" aria-label="Bloc merchant examples">
        {businessProfiles.map((profile, index) => (
          <article className={`merchant-login__proof-card merchant-login__proof-card--${index + 1}`} key={profile.handle}>
            <img src={profile.image} alt="" />
            <strong>{profile.handle}</strong>
            <p>{profile.bio}</p>
          </article>
        ))}
      </section>

      <form className="merchant-login__form" onSubmit={submitForm} noValidate>
        <section className="merchant-login__card">
          <h2>Merchant account</h2>
          <div className="merchant-login__grid">
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
            <label>
              Phone number
              <input name="phone" value={values.phone} onChange={updateField} />
              {errors.phone ? <span>{errors.phone}</span> : null}
            </label>
            <label>
              Email
              <input name="email" type="email" value={values.email} onChange={updateField} />
              {errors.email ? <span>{errors.email}</span> : null}
            </label>
          </div>
          <label>
            Password
            <div className="merchant-login__password">
              <input name="password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={updateField} />
              <button type="button" onClick={() => setShowPassword((current) => !current)}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            {errors.password ? <span>{errors.password}</span> : null}
          </label>
          <label className="merchant-login__handle">
            @handle for business
            <div>
              <span>@</span>
              <input name="handle" value={values.handle} onChange={updateField} placeholder="yourbusiness" />
              <strong className={`merchant-login__status merchant-login__status--${handleStatus}`}>
                {handleStatus === 'available' ? 'Available' : handleStatus === 'taken' ? 'Taken' : ''}
              </strong>
            </div>
            {errors.handle ? <span>{errors.handle}</span> : null}
          </label>
          <label>
            Business bio
            <textarea name="bio" value={values.bio} onChange={updateField} rows="3" />
          </label>
        </section>

        <section className="merchant-login__card">
          <p className="merchant-login__kicker">Build your store.</p>
          <h2>It only takes two minutes.</h2>
          <label className="merchant-login__handle">
            Business @handle
            <div>
              <span>@</span>
              <input name="businessHandle" value={values.businessHandle} onChange={updateField} placeholder="yourbusiness" />
            </div>
          </label>
          <label>
            Business bio
            <textarea name="businessBio" value={values.businessBio} onChange={updateField} rows="3" />
            {errors.businessBio ? <span>{errors.businessBio}</span> : null}
          </label>
          <div className="merchant-login__chips" aria-label="Shop category">
            {categories.map((category) => (
              <button
                className={category === selectedCategory ? 'merchant-login__chip merchant-login__chip--active' : 'merchant-login__chip'}
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label>
            Business location
            <input name="location" value={values.location} onChange={updateField} placeholder="Map pin  Your location" />
            {errors.location ? <span>{errors.location}</span> : null}
          </label>
          <div className="merchant-login__hours">
            <button type="button" onClick={() => setExpandedHours((current) => !current)}>
              Business hours
            </button>
            {expandedHours ? (
              <div>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <label key={day}>
                    {day}
                    <input placeholder="08:00 - 18:00" />
                  </label>
                ))}
              </div>
            ) : null}
          </div>
          <div className="merchant-login__uploads">
            <label>
              Product photos
              <input type="file" multiple accept="image/*" />
              <div>
                {businessProfiles.map((profile) => <img src={profile.image} alt="" key={profile.handle} />)}
              </div>
            </label>
            <label>
              Menu / catalogue
              <input type="file" accept="image/*,.pdf" />
            </label>
          </div>
        </section>

        <section className="merchant-login__card">
          <p className="merchant-login__kicker">Where should your money land?</p>
          <h2>Customers will pay @{routingName.replace(/^@/, '') || 'yourhandle'}.</h2>
          <div className="merchant-login__payouts">
            {payoutOptions.map((option) => (
              <button
                className={option === payoutType ? 'merchant-login__payout merchant-login__payout--active' : 'merchant-login__payout'}
                key={option}
                type="button"
                onClick={() => setPayoutType(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {payoutType === 'Till Number' ? (
            <label>
              Till Number
              <input name="till" value={values.till} onChange={updateField} />
              {errors.till ? <span>{errors.till}</span> : null}
            </label>
          ) : null}
          {payoutType === 'Paybill' ? (
            <div className="merchant-login__grid">
              <label>
                Paybill number
                <input name="paybill" value={values.paybill} onChange={updateField} />
                {errors.paybill ? <span>{errors.paybill}</span> : null}
              </label>
              <label>
                Account number
                <input name="account" value={values.account} onChange={updateField} />
              </label>
            </div>
          ) : null}
          {payoutType === 'Personal M-Pesa' ? (
            <label>
              Phone number
              <input name="mpesa" value={values.mpesa} onChange={updateField} />
              {errors.mpesa ? <span>{errors.mpesa}</span> : null}
            </label>
          ) : null}
          <p className="merchant-login__confirmation">Payments will route to: {routingName.toUpperCase()}</p>
        </section>

        {errors.form ? <p className="merchant-login__form-error">{errors.form}</p> : null}
        <button className="merchant-login__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </main>
  )
}

export default MerchantLogin
