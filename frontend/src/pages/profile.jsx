import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createPayment } from '../api/createPayment'
import { getMerchant } from '../api/getMerchant'
import BottomNav from '../components/BottomNav/BottomNav'
import { assets, getBlocAccount, getBlocAccountKind, getProfileByHandle } from '../data/blocData'
import '../styles/profile.css'

const amounts = ['50', '100', '500', '1,000', '2,500']
const paymentSteps = [
  '🧾 Preparing KES payment request...',
  '📲 M-Pesa STK push sent to your demo phone.',
  '🔐 Enter PIN on the handset. Waiting for confirmation...',
  '✅ Payment confirmed. Receipt BLC4750. Asante!',
]

function readSelectedProfile() {
  try {
    return JSON.parse(window.localStorage.getItem('bloc-selected-profile')) || null
  } catch {
    return null
  }
}

function normalizeProfile(profile, fallback) {
  const isMerchant = profile.type?.toLowerCase() === 'merchant'

  return {
    ...fallback,
    ...profile,
    type: isMerchant ? 'Merchant' : 'Customer',
    name: profile.name || profile.business_name || fallback.name,
    bio: profile.bio || profile.profile_bio || fallback.bio || 'Bloc profile',
    image: profile.image || profile.profile_picture_url || fallback.image || assets.storeIcon,
    photos: profile.photos || fallback.photos || [profile.profile_picture_url || fallback.image || assets.storeIcon],
    menu: profile.menu || fallback.menu || [
      { item: 'Demo order', description: 'Payment captured for presentation flow', price: 'KES 500' },
      { item: 'Custom amount', description: 'Enter any amount below and add context', price: 'Your choice' },
    ],
    hours: profile.hours || fallback.hours || ['Open today', 'Payments accepted through Bloc demo'],
    location: profile.location || fallback.location || 'Nairobi, Kenya',
    verified: profile.verified ?? true,
  }
}

function Profile() {
  const { handle } = useParams()
  const isGremiosDemo = handle === 'gremiosnakuru'
  const [amount, setAmount] = useState(isGremiosDemo ? '4750' : '')
  const [context, setContext] = useState(isGremiosDemo ? 'Monthly pantry basket 🛒' : '')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [isPaying, setIsPaying] = useState(false)
  const [liveProfile, setLiveProfile] = useState(null)
  const fallbackProfile = getProfileByHandle(handle)
  const selectedProfile = readSelectedProfile()
  const account = getBlocAccount()
  const accountKind = getBlocAccountKind()
  const profile = useMemo(() => {
    const matchingSelected = selectedProfile?.handle?.replace(/^@/, '') === handle
    const matchingAccount = account?.handle?.replace(/^@/, '') === handle
    return normalizeProfile(liveProfile || (matchingSelected ? selectedProfile : null) || (matchingAccount ? account : null) || fallbackProfile, fallbackProfile)
  }, [account, fallbackProfile, handle, liveProfile, selectedProfile])
  const isMerchant = profile.type === 'Merchant'

  useEffect(() => {
    let isMounted = true

    async function loadMerchant() {
      try {
        const payload = await getMerchant(handle)
        if (isMounted) setLiveProfile(payload.merchant)
      } catch {
        if (isMounted) setLiveProfile(null)
      }
    }

    loadMerchant()
    return () => {
      isMounted = false
    }
  }, [handle])

  async function runPaymentDemo() {
    const cleanAmount = Number(amount.replace(/,/g, ''))
    if (!cleanAmount || cleanAmount <= 0) {
      setPaymentStatus('Enter an amount to continue.')
      return
    }

    setIsPaying(true)
    for (const step of paymentSteps.slice(0, -1)) {
      setPaymentStatus(step)
      await new Promise((resolve) => setTimeout(resolve, 700))
    }

    try {
      await createPayment({
        payer_customer_id: account?.id,
        amount_to_pay: cleanAmount,
        text_message: context,
        merchant_handle: isMerchant ? profile.handle : undefined,
        customer_handle: !isMerchant ? profile.handle : undefined,
      })
    } catch {
      // The presentation still completes when the selected static profile is not in the local DB yet.
    }

    setPaymentStatus(paymentSteps.at(-1))
    setIsPaying(false)
  }

  return (
    <main className="profile">
      <section className="profile__header">
        <img src={profile.image} alt="" />
        <h1>
          {profile.name}
          {profile.verified ? <span>✓</span> : null}
        </h1>
        <p>{profile.handle}</p>
        <strong>{profile.type}</strong>
        <p>{profile.bio}</p>
      </section>

      {isMerchant ? (
        <section className="profile__merchant">
          <div className="profile__photos">
            {profile.photos.map((photo) => <img src={photo} alt="" key={photo} />)}
          </div>
          <div className="profile__catalogue">
            <h2>Menu / catalogue</h2>
            <div>
              {profile.menu.map((item) => (
                <article key={item.item}>
                  <h3>{item.item}</h3>
                  <p>{item.description}</p>
                  <strong>{item.price}</strong>
                </article>
              ))}
            </div>
          </div>
          <div className="profile__details">
            <p>Map pin {profile.location}</p>
            <ul>
              {profile.hours.map((hours) => <li key={hours}>{hours}</li>)}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="profile__payment">
        <label className="profile__amount">
          Amount
          <div>
            <span>KES</span>
            <input inputMode="numeric" placeholder="0" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </div>
        </label>
        <div className="profile__chips">
          {amounts.map((quickAmount) => (
            <button key={quickAmount} type="button" onClick={() => setAmount(quickAmount)}>
              {quickAmount}
            </button>
          ))}
        </div>
        <div className="profile__context">
          <h2>Add a little context</h2>
          <textarea
            placeholder="Say something... 'Asante sana', 'Dinner was perfect', 'Goodnight'"
            rows="4"
            value={context}
            onChange={(event) => setContext(event.target.value)}
          />
          <div>
            <button type="button" onClick={() => setContext((current) => `${current} 😊`.trim())}>😊</button>
            <button type="button" onClick={() => setContext((current) => `${current} 🙏`.trim())}>🙏</button>
            <button type="button" onClick={() => setContext((current) => `${current} 🎉`.trim())}>🎉</button>
            <button type="button" onClick={() => setContext('')}>Skip</button>
          </div>
        </div>
        <section className="profile__process" aria-live="polite">
          <span>1. Confirm KES {amount || '0'}</span>
          <span>2. 📲 STK push</span>
          <span>3. ✅ Receipt</span>
          {paymentStatus ? <strong>{paymentStatus}</strong> : null}
        </section>
        <button className="profile__pay-button" type="button" onClick={runPaymentDemo} disabled={isPaying}>
          {isPaying ? 'Processing...' : `Pay ${profile.handle}`}
        </button>
      </section>

      <BottomNav variant={accountKind === 'merchant' ? 'merchant' : 'customer'} />
    </main>
  )
}

export default Profile
