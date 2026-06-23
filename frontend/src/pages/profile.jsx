import { useParams } from 'react-router-dom'
import { useState } from 'react'
import BottomNav from '../components/BottomNav/BottomNav'
import { getBlocAccountKind, getProfileByHandle } from '../data/blocData'
import '../styles/profile.css'

const amounts = ['50', '100', '500', '1,000', '2,500']

function Profile() {
  const { handle } = useParams()
  const [amount, setAmount] = useState('')
  const [sent, setSent] = useState(false)
  const profile = getProfileByHandle(handle)
  const accountKind = getBlocAccountKind()
  const isMerchant = profile.type === 'Merchant'

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
          <textarea placeholder="Say something... 'Asante sana', 'Dinner was perfect', 'Goodnight'" rows="4" />
          <div>
            <button type="button">😊</button>
            <button type="button">🙏</button>
            <button type="button">🎉</button>
            <button type="button">Skip</button>
          </div>
        </div>
        <button className="profile__pay-button" type="button" onClick={() => setSent(true)}>
          {sent ? `Ready to pay ${profile.handle}` : `Pay ${profile.handle}`}
        </button>
      </section>

      <BottomNav variant={accountKind === 'merchant' ? 'merchant' : 'customer'} />
    </main>
  )
}

export default Profile
