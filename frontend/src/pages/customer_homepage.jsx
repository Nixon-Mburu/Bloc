import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchPeople } from '../api/searchPeople'
import BottomNav from '../components/BottomNav/BottomNav'
import { assets, customerTransactions, getBlocAccount, profiles } from '../data/blocData'
import '../styles/customer_homepage.css'

const feedProfiles = profiles.slice(0, 6)
const searchableProfiles = profiles.map((profile) => ({
  ...profile,
  type: profile.type.toLowerCase(),
  profile_bio: profile.bio,
  profile_picture_url: profile.image,
}))

function CustomerHomepage() {
  const navigate = useNavigate()
  const [showBalance, setShowBalance] = useState(true)
  const [query, setQuery] = useState('')
  const [liveSuggestions, setLiveSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [demoStatus, setDemoStatus] = useState('')
  const account = getBlocAccount()

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

  function startTopUp() {
    setShowBalance(true)
    setDemoStatus('Connecting to M-Pesa via STK push. Check your phone to complete the demo top up.')
  }

  function startSendMoney() {
    setDemoStatus('Choose a recipient below. Bloc will open a demo payment flow with an M-Pesa STK push screen.')
    document.querySelector('.customer-homepage__search input')?.focus()
  }

  return (
    <main className="customer-homepage">
      <header className="customer-homepage__header">
        <img src={assets.logo} alt="Bloc" />
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
          <button type="button" onClick={startSendMoney}>
            <img src={assets.sendMoneyIcon} alt="" />
            Send Money
          </button>
          <button type="button" onClick={startTopUp}>
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
