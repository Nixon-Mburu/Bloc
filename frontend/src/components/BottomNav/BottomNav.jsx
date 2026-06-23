import { NavLink } from 'react-router-dom'
import { assets } from '../../data/blocData'
import './BottomNav.css'

const customerItems = [
  { to: '/customer-home', label: 'Home', icon: assets.homeIcon },
  { to: '/profile/jessmusic', label: 'Profile', icon: assets.profileIcon },
  { to: '/profile/greenmarket', label: 'Pay', icon: assets.paymentIcon },
  { to: '/settings', label: 'Settings', icon: assets.settingsIcon },
]

const merchantItems = [
  { to: '/merchant-home', label: 'Home', icon: assets.homeIcon },
  { to: '/profile/jessmusic', label: 'Pay', icon: assets.paymentIcon },
  { to: '/profile/greenmarket', label: 'Store', icon: assets.storeIcon },
  { to: '/settings', label: 'Settings', icon: assets.settingsIcon },
]

function BottomNav({ variant = 'customer' }) {
  const items = variant === 'merchant' ? merchantItems : customerItems

  return (
    <nav className="bottom-nav" aria-label={`${variant} bottom navigation`}>
      {items.map((item) => (
        <NavLink
          className={({ isActive }) => (isActive ? 'bottom-nav__item bottom-nav__item--active' : 'bottom-nav__item')}
          key={`${item.label}-${item.to}`}
          to={item.to}
          aria-label={item.label}
        >
          <img src={item.icon} alt="" />
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
