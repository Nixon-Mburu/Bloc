import { useState } from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav/BottomNav'
import { assets, getBlocAccount, getProfileByHandle } from '../data/blocData'
import '../styles/merchant_homepage.css'

function getMerchantShop() {
  const account = getBlocAccount()
  const fallback = getProfileByHandle('greenmarket')

  if (!account || account.type !== 'merchant') return fallback

  return {
    ...fallback,
    name: account.name || account.business_name || fallback.name,
    handle: account.handle || fallback.handle,
    bio: account.profile_bio || fallback.bio,
    image: account.profile_picture_url || fallback.image,
    location: account.location || fallback.location,
  }
}

function MerchantHomepage() {
  const [showNudge, setShowNudge] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const shop = getMerchantShop()
  const shopPath = `/profile/${shop.handle.replace(/^@/, '')}`

  return (
    <main className="merchant-homepage">
      <header className="merchant-homepage__header">
        <Link className="merchant-homepage__shop-link" to={shopPath}>
          <img src={shop.image} alt="" />
          <div>
            <strong>{shop.name}</strong>
            <span>{shop.handle}</span>
          </div>
        </Link>
        <Link className="merchant-homepage__view-shop" to={shopPath}>View your shop</Link>
      </header>

      <section className="merchant-homepage__earnings-card">
        <div>
          <p>Current balance</p>
          <h1>{showBalance ? 'KES 0.00' : 'KES ●●●●'}</h1>
          <span>KES 0 today</span>
        </div>
        <button
          className="merchant-homepage__eye"
          type="button"
          aria-label={showBalance ? 'Hide balance' : 'Show balance'}
          onClick={() => setShowBalance((current) => !current)}
        >
          ◌
        </button>
        <div className="merchant-homepage__actions">
          <button type="button" onClick={() => window.alert('Payment request preview ready.')}>
            <img src={assets.paymentIcon} alt="" />
            Request Payment
          </button>
          <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.origin + shopPath)}>
            <img src={assets.storeIcon} alt="" />
            Share My Shop
          </button>
        </div>
      </section>

      <section className="merchant-homepage__activity">
        <h2>What's Coming In</h2>
        <div className="merchant-homepage__activity-list">
          <article className="merchant-homepage__empty">
            <strong>No payments yet</strong>
            <span>Your first Bloc payment will appear here after a customer pays {shop.handle}.</span>
          </article>
        </div>
      </section>

      {showNudge ? (
        <section className="merchant-homepage__nudge">
          <div>
            <h2>Add your menu</h2>
            <p>Customers want to know what you offer before they pay.</p>
          </div>
          <button type="button" onClick={() => setShowNudge(false)}>Done</button>
        </section>
      ) : null}

      <BottomNav variant="merchant" />
    </main>
  )
}

export default MerchantHomepage
