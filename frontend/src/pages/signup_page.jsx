import { Link } from 'react-router-dom'
import { assets } from '../data/blocData'
import '../styles/signup_page.css'

function SignupPage() {
  return (
    <main className="signup">
      <section className="signup__intro" aria-labelledby="signup-title">
        <img className="signup__logo" src={assets.logo} alt="Bloc" />
        <h1 id="signup-title">
          Payments that sound
          <span>like you.</span>
        </h1>
      </section>
      <section className="signup__image-stage" aria-label="Choose your Bloc path">
        <img className="signup__image" src={assets.signupImage} alt="" />
        <div className="signup__curve" />
        <div className="signup__actions">
          <Link className="signup__button" to="/customer-login">Customer</Link>
          <Link className="signup__button signup__button--merchant" to="/merchant-login">Merchant</Link>
        </div>
      </section>
    </main>
  )
}

export default SignupPage
