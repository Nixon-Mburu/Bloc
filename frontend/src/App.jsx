import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signup_page'
import CustomerLogin from './pages/customer_login'
import MerchantLogin from './pages/merchant_login'
import CustomerHomepage from './pages/customer_homepage'
import MerchantHomepage from './pages/merchant_homepage'
import Profile from './pages/profile'
import SettingsPage from './pages/settings_page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/merchant-login" element={<MerchantLogin />} />
        <Route path="/customer-home" element={<CustomerHomepage />} />
        <Route path="/merchant-home" element={<MerchantHomepage />} />
        <Route path="/profile/:handle" element={<Profile />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
