import logo from '../assets/bloc_logo.png'
import homeIcon from '../assets/homepage_icon.png'
import sendMoneyIcon from '../assets/send_money.png'
import paymentIcon from '../assets/payment_icon.png'
import storeIcon from '../assets/store.png'
import profileIcon from '../assets/profile.png'
import topUpIcon from '../assets/top_up.png'
import searchIcon from '../assets/search_icon.png'
import notificationsIcon from '../assets/notifications.png'
import settingsIcon from '../assets/settings_icon.png'
import greenMarket from '../assets/@greenmarket.jpeg'
import jamesNyama from '../assets/@jamesnyama.jpeg'
import jaquesBarbershop from '../assets/@jaques_barbershop.jpeg'
import jamesJames from '../assets/@jamesjames.jpeg'
import maryanne from '../assets/@maryanne_105.jpeg'
import jessMusic from '../assets/jessmusic.jpeg'
import signupImage from '../assets/Social Media Mobile App.jpeg'
import creatorImage from '../assets/𝗩𝗜𝗞𝗥𝗔𝗠 • UI_UX DESIGNER on Instagram_ _Moments that feel like magic ✨ Capt.jpeg'

export const assets = {
  logo,
  homeIcon,
  sendMoneyIcon,
  paymentIcon,
  storeIcon,
  profileIcon,
  topUpIcon,
  searchIcon,
  notificationsIcon,
  settingsIcon,
  signupImage,
  creatorImage,
}

export const profiles = [
  {
    name: 'Jess Music',
    handle: '@jessmusic',
    bio: 'Music heals everything',
    image: jessMusic,
    type: 'Customer',
    verified: false,
  },
  {
    name: 'James James',
    handle: '@jamesjames',
    bio: 'Always hungry, never late',
    image: jamesJames,
    type: 'Customer',
    verified: true,
  },
  {
    name: 'Maryanne',
    handle: '@maryanne_105',
    bio: 'Art, coffee, Sunday markets',
    image: maryanne,
    type: 'Customer',
    verified: false,
  },
  {
    name: 'Green Market',
    handle: '@greenmarket',
    bio: 'Fresh produce, fair prices, daily baskets from local farms.',
    image: greenMarket,
    type: 'Merchant',
    verified: true,
    location: 'Kilimani Market Lane, Nairobi',
    hours: ['Mon-Fri 7:00-20:00', 'Saturday 8:00-18:00', 'Sunday 9:00-15:00'],
    photos: [greenMarket, creatorImage, signupImage],
    menu: [
      { item: 'Family veggie basket', description: 'Seasonal greens, herbs, tomatoes', price: 'KES 1,850' },
      { item: 'Fruit box', description: 'Mangoes, bananas, passion fruit', price: 'KES 1,200' },
      { item: 'Market flowers', description: 'Fresh mixed bouquet', price: 'KES 900' },
    ],
  },
  {
    name: 'James Nyama',
    handle: '@jamesnyama',
    bio: 'Charcoal grill, lunch plates, and weekend nyama choma.',
    image: jamesNyama,
    type: 'Merchant',
    verified: true,
    location: 'Ngong Road, Nairobi',
    hours: ['Mon-Sat 10:00-22:00', 'Sunday 11:00-20:00'],
    photos: [jamesNyama, signupImage, greenMarket],
    menu: [
      { item: 'Nyama choma plate', description: 'Beef, kachumbari, ugali', price: 'KES 1,100' },
      { item: 'Lunch special', description: 'Rice, stew, greens', price: 'KES 650' },
    ],
  },
  {
    name: 'Jaques Barbershop',
    handle: '@jaques_barbershop',
    bio: 'Sharp fades, beard trims, and clean weekend appointments.',
    image: jaquesBarbershop,
    type: 'Merchant',
    verified: false,
    location: 'Westlands, Nairobi',
    hours: ['Tue-Sat 9:00-21:00', 'Sunday 10:00-16:00'],
    photos: [jaquesBarbershop, creatorImage, maryanne],
    menu: [
      { item: 'Fade', description: 'Clean cut with finish', price: 'KES 800' },
      { item: 'Beard trim', description: 'Shape, steam towel, oil', price: 'KES 500' },
    ],
  },
]

export const takenHandles = ['jessmusic', 'greenmarket', 'jamesnyama', 'jaques_barbershop']

export const customerTransactions = [
  {
    name: 'Maryanne',
    handle: '@maryanne_105',
    image: maryanne,
    amount: '-KES 1,250',
    note: 'Sunday market split',
    time: '9 min ago',
    received: false,
  },
  {
    name: 'Green Market',
    handle: '@greenmarket',
    image: greenMarket,
    amount: '-KES 3,420',
    note: 'Fresh basket',
    time: '28 min ago',
    received: false,
  },
  {
    name: 'James James',
    handle: '@jamesjames',
    image: jamesJames,
    amount: '+KES 2,000',
    note: 'Rent top-up',
    time: 'Yesterday',
    received: true,
  },
]

export const merchantPayments = [
  {
    name: 'Jess Music',
    handle: '@jessmusic',
    image: jessMusic,
    amount: '+KES 1,400',
    note: 'Two veggie baskets',
    time: '3 min ago',
  },
  {
    name: 'Maryanne',
    handle: '@maryanne_105',
    image: maryanne,
    amount: '+KES 900',
    note: 'Flowers',
    time: '18 min ago',
  },
  {
    name: 'James James',
    handle: '@jamesjames',
    image: jamesJames,
    amount: '+KES 2,850',
    note: 'Weekly groceries',
    time: '1 hr ago',
  },
]

export function getProfileByHandle(handle) {
  const normalized = handle?.startsWith('@') ? handle : `@${handle}`
  return profiles.find((profile) => profile.handle === normalized) || profiles[3]
}

export function isSessionValid() {
  return window.localStorage.getItem('bloc-session') === 'active'
}

export function setBlocSession(kind) {
  window.localStorage.setItem('bloc-session', 'active')
  window.localStorage.setItem('bloc-account-kind', kind)
}

export function getBlocAccountKind() {
  return window.localStorage.getItem('bloc-account-kind') || 'customer'
}
