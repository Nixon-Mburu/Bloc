import { Link } from 'react-router-dom'
import { assets, profiles } from '../data/blocData'
import '../styles/signup_page.css'

const sampleProfiles = profiles.slice(0, 4)

function SignupPage() {
  return (
    <main className="signup">
      <header className="signup__header">
        <img className="signup__logo" src={assets.logo} alt="Bloc" />
        <nav className="signup__nav">
          <a href="#why">Benefits</a>
          <a href="#process">Process</a>
          <a href="#compare">Compare</a>
          <a href="#faq">FAQs</a>
        </nav>
        <Link className="signup__top-cta" to="/customer-login">View Plans</Link>
      </header>

      <section className="signup__hero" aria-labelledby="signup-title">
        <div className="signup__hero-copy">
          <p className="signup__hero-chip">New</p>
          <h1 id="signup-title">
            A payments platform that
            <span>feels like a social feed.</span>
          </h1>
          <p className="signup__hero-text">
            Bloc replaces cold transfers with human interactions. Share notes, send money with handles,
            and make payments feel personal again.
          </p>
          <div className="signup__hero-actions">
            <Link className="signup__button signup__button--primary" to="/customer-login">
              Customer
            </Link>
            <Link className="signup__button signup__button--secondary" to="/merchant-login">
              Merchant
            </Link>
          </div>
        </div>

        <div className="signup__hero-cards">
          {sampleProfiles.map((profile, index) => (
            <article key={profile.handle} className={`signup__profile-card signup__profile-card--${index + 1}`}>
              <img src={profile.image} alt={profile.name} />
              <div className="signup__profile-copy">
                <strong>{profile.handle}</strong>
                <span>{profile.bio}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="signup__overview" id="why">
        <div className="signup__copy-block">
          <p className="signup__eyebrow">Quick and Easy Setup</p>
          <h2>Make every payment feel like a conversation.</h2>
          <p>
            Whether you’re sending money to a friend or receiving for your business, Bloc surfaces the human side
            of every transfer. No more phone numbers. No more cold receipts. Just handles, stories, and moments.
          </p>
          <div className="signup__tag-list">
            <span>Social first</span>
            <span>Handle-based payments</span>
            <span>Instant setup</span>
            <span>Merchant-ready</span>
          </div>
        </div>
        <div className="signup__feature-grid">
          <article className="signup__feature-card">
            <h3>Custom profiles</h3>
            <p>Every member gets a handle, a bio, and a visible identity so payments feel personal.</p>
          </article>
          <article className="signup__feature-card">
            <h3>Feed-style history</h3>
            <p>Transactions appear as moments, not receipts—exactly how modern social payments should behave.</p>
          </article>
          <article className="signup__feature-card">
            <h3>Merchant storefront</h3>
            <p>Merchants receive payments through a profile, not a Paybill number, with simple store setup.</p>
          </article>
        </div>
      </section>

      <section className="signup__process" id="process">
        <h2>From first tap to payments that matter</h2>
        <div className="signup__process-grid">
          <div>
            <strong>01</strong>
            <h4>Choose your path</h4>
            <p>Pick customer or merchant to enter a tailored onboarding flow.</p>
          </div>
          <div>
            <strong>02</strong>
            <h4>Claim your handle</h4>
            <p>Get found by friends and customers with a name that feels like you.</p>
          </div>
          <div>
            <strong>03</strong>
            <h4>Share and pay</h4>
            <p>Send money with notes, emojis, and context that make every transfer memorable.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignupPage
