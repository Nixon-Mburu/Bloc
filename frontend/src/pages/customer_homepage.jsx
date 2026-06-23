import { useState } from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav/BottomNav'
import { assets, customerTransactions, profiles } from '../data/blocData'
import '../styles/customer_homepage.css'

const feedProfiles = profiles.slice(0, 6)

function CustomerHomepage() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <main className="customer-homepage">
      <header className="customer-homepage__header">
        <img src={assets.logo} alt="Bloc" />
        <Link className="customer-homepage__icon-button" to="/settings" aria-label="Notifications">
          <img src={assets.notificationsIcon} alt="" />
        </Link>
      </header>

      <Link className="customer-homepage__search" to="/profile/greenmarket">
        <img src={assets.searchIcon} alt="" />
        <span>find a friend, bar, shop...</span>
      </Link>

      <section className="customer-homepage__balance-card">
        <div>
          <p>Your Balance</p>
          <h1>{showBalance ? 'KES 4,200.00' : 'KES ●●●●'}</h1>
        </div>
        <button
          className="customer-homepage__eye"
          type="button"
          aria-label={showBalance ? 'Hide balance' : 'Show balance'}
          onClick={() => setShowBalance((current) => !current)}
        >
          ◌
        </button>
        <div className="customer-homepage__balance-actions">
          <Link to="/profile/jessmusic">
            <img src={assets.sendMoneyIcon} alt="" />
            Send Money
          </Link>
          <button type="button" onClick={() => setShowBalance(true)}>
            <img src={assets.topUpIcon} alt="" />
            Top Up
          </button>
        </div>
      </section>

      <section className="customer-homepage__feed">
        <h2>Your Feed</h2>
        <div className="customer-homepage__feed-row">
          {feedProfiles.map((profile) => (
            <Link className="customer-homepage__profile-card" to={`/profile/${profile.handle.slice(1)}`} key={profile.handle}>
              <img src={profile.image} alt="" />
              <strong>{profile.handle}</strong>
              <span>{profile.bio}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="customer-homepage__transactions">
        <h2>Recent transactions</h2>
        <div className="customer-homepage__transaction-list">
          {customerTransactions.map((transaction) => (
            <article className="customer-homepage__transaction" key={`${transaction.handle}-${transaction.time}`}>
              <img src={transaction.image} alt="" />
              <div>
                <strong>{transaction.name}</strong>
                <span>{transaction.handle} • {transaction.note}</span>
              </div>
              <div>
                <strong className={transaction.received ? 'customer-homepage__amount--received' : ''}>{transaction.amount}</strong>
                <span>{transaction.time}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BottomNav variant="customer" />
    </main>
  )
}

export default CustomerHomepage
