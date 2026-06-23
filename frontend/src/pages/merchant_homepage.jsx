import { useState } from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav/BottomNav'
import { assets, getProfileByHandle, merchantPayments } from '../data/blocData'
import '../styles/merchant_homepage.css'

function MerchantHomepage() {
  const [showNudge, setShowNudge] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const shop = getProfileByHandle('greenmarket')

  return (
    <main className="merchant-homepage">
      <header className="merchant-homepage__header">
        <Link className="merchant-homepage__shop-link" to="/profile/greenmarket">
          <img src={shop.image} alt="" />
          <div>
            <strong>{shop.name}</strong>
            <span>{shop.handle}</span>
          </div>
        </Link>
        <Link className="merchant-homepage__view-shop" to="/profile/greenmarket">View your shop</Link>
      </header>

      <section className="merchant-homepage__earnings-card">
        <div>
          <p>Current balance</p>
          <h1>{showBalance ? 'KES 12,400.00' : 'KES ●●●●'}</h1>
          <span>KES 3,200 today</span>
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
          <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.origin + '/profile/greenmarket')}>
            <img src={assets.storeIcon} alt="" />
            Share My Shop
          </button>
        </div>
      </section>

      <section className="merchant-homepage__activity">
        <h2>What's Coming In</h2>
        <div className="merchant-homepage__activity-list">
          {merchantPayments.map((payment) => (
            <article className="merchant-homepage__payment" key={`${payment.handle}-${payment.time}`}>
              <img src={payment.image} alt="" />
              <div>
                <strong>{payment.handle}</strong>
                <span>{payment.note}</span>
              </div>
              <div>
                <strong>{payment.amount}</strong>
                <span>{payment.time}</span>
              </div>
            </article>
          ))}
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
