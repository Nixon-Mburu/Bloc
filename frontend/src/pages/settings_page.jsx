import { Link, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav/BottomNav'
import { getBlocAccountKind, getProfileByHandle } from '../data/blocData'
import '../styles/settings_page.css'

function SettingsPage() {
  const navigate = useNavigate()
  const kind = getBlocAccountKind()
  const profile = kind === 'merchant' ? getProfileByHandle('greenmarket') : getProfileByHandle('jessmusic')

  function logOut() {
    window.localStorage.removeItem('bloc-session')
    navigate('/')
  }

  return (
    <main className="settings-page">
      <h1>Settings</h1>

      <section className="settings-page__section settings-page__you">
        <h2>You</h2>
        <Link to={`/profile/${profile.handle.slice(1)}`}>
          <img src={profile.image} alt="" />
          <div>
            <strong>{profile.name}</strong>
            <span>{profile.handle}</span>
            <em>View your profile</em>
          </div>
        </Link>
      </section>

      <section className="settings-page__section">
        <h2>Your Money</h2>
        <div className="settings-page__row">
          <span>Linked payout method</span>
          <strong>{kind === 'merchant' ? 'Till Number •••• 420' : 'M-Pesa •••• 118'}</strong>
        </div>
        <button type="button">Change payment method</button>
      </section>

      <section className="settings-page__section">
        <h2>Stay in the Loop</h2>
        {['Payment received', 'Payment request', 'Reactions', kind === 'merchant' ? 'Business updates' : null]
          .filter(Boolean)
          .map((label) => (
            <label className="settings-page__toggle" key={label}>
              {label}
              <input type="checkbox" defaultChecked />
              <span />
            </label>
          ))}
      </section>

      <section className="settings-page__section">
        <h2>Who Sees What</h2>
        <div className="settings-page__segmented">
          <span>Transaction feed</span>
          <div>
            <button className="settings-page__segment--active" type="button">Everyone</button>
            <button type="button">Contacts only</button>
            <button type="button">Just me</button>
          </div>
        </div>
        <div className="settings-page__segmented">
          <span>Find me by handle</span>
          <div>
            <button className="settings-page__segment--active" type="button">On</button>
            <button type="button">Off</button>
          </div>
        </div>
      </section>

      <section className="settings-page__section">
        <h2>The boring stuff</h2>
        <button type="button">Change password</button>
        {kind === 'customer' ? <button type="button">Switch to business account</button> : null}
        <button type="button" onClick={logOut}>Log out</button>
        <button className="settings-page__danger" type="button">Delete account</button>
      </section>

      <section className="settings-page__section">
        <h2>Support & About</h2>
        <button type="button">Help</button>
        <button type="button">Terms</button>
        <button type="button">Privacy Policy</button>
        <p>Bloc v1.0 • Summer 2026</p>
      </section>

      <BottomNav variant={kind === 'merchant' ? 'merchant' : 'customer'} />
    </main>
  )
}

export default SettingsPage
