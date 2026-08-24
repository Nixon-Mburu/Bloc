import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchPeople } from '../api/searchPeople'
import BottomNav from '../components/BottomNav/BottomNav'
import { assets, customerTransactions, getBlocAccount, profiles } from '../data/blocData'
import '../styles/customer_homepage.css'

const feedProfiles = profiles.slice(0, 6)
const stkSteps = [
  '📲 M-Pesa STK push prepared for your demo phone.',
  '🔐 Prompt sent. Enter your M-Pesa PIN on the handset.',
  '⏳ Waiting for Safaricom confirmation...',
  '✅ Demo STK push completed. Receipt: BLC4750.',
]
const searchableProfiles = profiles.map((profile) => ({
  ...profile,
  type: profile.type.toLowerCase(),
  profile_bio: profile.bio,
  profile_picture_url: profile.image,
}))

function getCustomerProfile() {
  const account = getBlocAccount()
  const fallback = profiles[0]

  if (!account || account.type !== 'customer') return fallback

  return {
    ...fallback,
    name: account.name || `${account.first_name || ''} ${account.last_name || ''}`.trim() || fallback.name,
    handle: account.handle || fallback.handle,
    bio: account.profile_bio || fallback.bio || 'New Bloc customer',
    image: account.profile_picture_url || fallback.image || assets.profileIcon,
  }
}

function CustomerHomepage() {
  const navigate = useNavigate()
  const [showBalance, setShowBalance] = useState(true)
  const [query, setQuery] = useState('')
  const [liveSuggestions, setLiveSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [demoStatus, setDemoStatus] = useState('')
  const [isDemoPushing, setIsDemoPushing] = useState(false)
  const account = getBlocAccount()
  const customer = getCustomerProfile()
  const transactions = account?.type === 'customer' ? [] : customerTransactions

  const suggestions = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase().replace(/^@/, '')
    if (!cleanQuery) return searchableProfiles.filter((profile) => profile.type === 'merchant').slice(0, 4)

    const staticMatches = searchableProfiles.filter((profile) => {
      const haystack = `${profile.name} ${profile.handle} ${profile.bio} ${profile.type}`.toLowerCase()
      return haystack.includes(cleanQuery)
    })

    const seen = new Set()
    return [...liveSuggestions, ...staticMatches].filter((profile) => {
      const key = profile.handle
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }).slice(0, 6)
  }, [liveSuggestions, query])

  async function updateSearch(event) {
    const nextQuery = event.target.value
    setQuery(nextQuery)
    setSearchError('')

    if (!nextQuery.trim()) {
      setLiveSuggestions([])
      return
    }

    setIsSearching(true)
    try {
      const payload = await searchPeople(nextQuery, account?.id)
      setLiveSuggestions(payload.suggestions || [])
    } catch (error) {
      setSearchError(error.message)
      setLiveSuggestions([])
    } finally {
      setIsSearching(false)
    }
  }

  function openProfile(profile) {
    window.localStorage.setItem('bloc-selected-profile', JSON.stringify(profile))
    navigate(`/profile/${profile.handle.replace(/^@/, '')}`)
  }

  async function runStkDemo(finalMessage = stkSteps.at(-1)) {
    if (isDemoPushing) return
    setIsDemoPushing(true)
    setShowBalance(true)
    for (const step of stkSteps.slice(0, -1)) {
      setDemoStatus(step)
      await new Promise((resolve) => setTimeout(resolve, 650))
    }
    setDemoStatus(finalMessage)
    setIsDemoPushing(false)
  }

  function startSendMoney() {
    runStkDemo('✅ Send Money STK push approved. Search Gremios Nakuru below to complete the staged merchant payment.')
    document.querySelector('.customer-homepage__search input')?.focus()
  }

  return (
    <main className="customer-homepage">
      <header className="customer-homepage__header">
        <Link className="customer-homepage__person-link" to={`/profile/${customer.handle.replace(/^@/, '')}`}>
          <img src={customer.image} alt="" />
          <div>
            <strong>{customer.name}</strong>
            <span>{customer.handle}</span>
          </div>
        </Link>
        <Link className="customer-homepage__icon-button" to="/settings" aria-label="Notifications">
          <img src={assets.notificationsIcon} alt="" />
        </Link>
      </header>

      <section className="customer-homepage__search" aria-label="Search Bloc profiles">
        <img src={assets.searchIcon} alt="" />
        <input
          value={query}
          onChange={updateSearch}
          placeholder="find a friend, bar, shop..."
          aria-label="Search for a customer or merchant"
        />
        <div className="customer-homepage__suggestions">
          {suggestions.map((profile) => (
            <button type="button" key={profile.handle} onClick={() => openProfile(profile)}>
              <img src={profile.profile_picture_url || assets.storeIcon} alt="" />
              <span>
                <strong>{profile.name || profile.business_name}</strong>
                <small>{profile.handle} • {profile.type}</small>
              </span>
            </button>
          ))}
          {isSearching ? <p>Searching Bloc...</p> : null}
          {searchError ? <p>{searchError}</p> : null}
        </div>
      </section>

      <section className="customer-homepage__balance-card">
        <div>
          <p>Your Balance</p>
          <h1>{showBalance ? 'KES 0.00' : 'KES ●●●●'}</h1>
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
          <button type="button" onClick={startSendMoney} disabled={isDemoPushing}>
            <img src={assets.sendMoneyIcon} alt="" />
            Send Money
          </button>
          <button type="button" onClick={() => runStkDemo()} disabled={isDemoPushing}>
            <img src={assets.topUpIcon} alt="" />
            Top Up
          </button>
        </div>
        {demoStatus ? <p className="customer-homepage__demo-status">{demoStatus}</p> : null}
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
          {transactions.length ? transactions.map((transaction) => (
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
          )) : (
            <article className="customer-homepage__empty">
              <strong>No transactions yet</strong>
              <span>Your payments, top ups, and received money will appear here after you start using Bloc.</span>
            </article>
          )}
        </div>
      </section>

      <BottomNav variant="customer" />
    </main>
  )
}

export default CustomerHomepage
