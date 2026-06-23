# Bloc Design Document
### Version 1.0 — Summer 2026

---

## What Bloc Is

Money has always been human. Before banks, before mobile money, before USSD menus and Paybill numbers, the act of giving someone money was a gesture. It carried weight. It said something. You handed someone cash and there was eye contact, maybe a word, maybe a reason. The transaction was never just the number — it was the context, the relationship, the moment it happened in.

Somewhere in the process of making payments digital, that humanity got stripped away. What remained was functional but cold: a phone number, an amount, a confirmation message, a reference code. M-Pesa solved the problem of access — and that achievement is real and significant. But solving access is not the same as building something people love. The experience of sending money in Kenya today feels like what it is: infrastructure designed for the constraints of 2007.

Bloc is built on the belief that payments can feel like something again.

Not in an abstract, aspirational way — concretely. When you pay a friend on Bloc, you say something. You leave a note. You drop an emoji. You tag it as "birthday" or "rent" or "just because." The transaction lives in a feed that looks like a conversation, not a receipt log. The person you paid has a face, a handle, a bio — not a phone number. The act of moving money becomes, in a small but meaningful way, an act of human connection.

That same philosophy extends to merchants. A food vendor with a Bloc profile does not have a Paybill number — they have a storefront. A cover photo of their stall. A menu. A location. A bio that tells you who they are before you pay them. A barbershop on Bloc looks like a barbershop: hours, photos of the work, a handle that is actually their name. Customers do not type a number — they visit a page, the same way they might visit an Instagram profile, and they pay with the same ease.

Bloc is, in the simplest possible terms, what payments look like when you design them around people instead of processes. It is social-first in the literal sense: the social layer — identity, expression, context, community — is not a feature built on top of a payments product. It is the product. The payments are what make it real.

---

## Design Philosophy

Bloc draws from the same tradition as the best consumer products of the last decade: products that understood that how something feels is inseparable from what it does. Instagram understood that a photo is not just a photo — it is a statement of self. Venmo understood that a payment is not just a payment — it is a social signal. Cash App understood that a financial product does not have to look like a bank. Square understood that a small business deserves the same quality of digital presence as a large one.

Bloc synthesises these ideas for the Kenyan context. The design borrows the social feed from Venmo, the handle-based identity from Cash App, the merchant storefront from Square, and the visual richness and emotional warmth from the best of consumer product design — and builds it on top of M-Pesa, the rail that already connects almost everyone in Kenya.

The result should feel alive. Every screen should feel like it was built for a person, not a user. The interactions should be fast, the feedback should be human, and the visual language should make it clear that Bloc takes both money and the people who use it seriously.

---

## Global Design Decisions

These decisions apply universally across every page in the product. There are no exceptions.

### Typography
**Gabarito** is the typeface across the entire product — headings, body text, labels, buttons, everything. Gabarito was chosen because it is friendly without being childish, confident without being corporate, and distinctive enough to carry product identity without visual noise. No other typeface appears anywhere in Bloc.

### Colour
All page backgrounds are solid white (`#FFFFFF`). The product's energy comes from content — avatars, photos, transaction notes, business cover images — not from coloured backgrounds fighting for attention. The white canvas lets the human content breathe.

Primary interactive elements — buttons, action cards, input fields — use rounded variants in light grays and soft purples. The palette is intentionally restrained in tone but alive in form: it is the extreme border radii, the hover states, the micro-animations, and the human copy that make the product feel warm, not a loud colour palette.

**Colour tokens:**
- Background: `#FFFFFF`
- Primary text: `#111111`
- Secondary text: `#6B7280`
- Button default: `#F3F4F6` (light gray)
- Button accent: `#EDE9FE` (soft purple) / `#7C3AED` (deep purple for primary CTAs)
- Input border: `#E5E7EB`
- Input focus: `#7C3AED`
- Success: `#10B981`
- Error: `#EF4444`
- Feed card background: `#FAFAFA`

### Border Radius
All interactive elements — buttons, input fields, cards, modals, avatars, image containers — use extremely rounded borders. This is non-negotiable. The roundness is one of the most important carriers of Bloc's personality: it communicates softness, approachability, and modernity. Specific values:
- Buttons: `border-radius: 9999px` (full pill)
- Cards: `border-radius: 24px`
- Input fields: `border-radius: 16px`
- Profile photos: `border-radius: 50%` (circles)
- Bottom navigation capsule: `border-radius: 9999px`

### Animation and Interaction
Hover and transition states are mandatory on all interactive elements. Buttons scale up slightly on hover (`transform: scale(1.02)`), depress on click (`scale(0.97)`). Cards lift on hover (subtle `box-shadow` change). Input fields highlight their border on focus. These animations should feel instant and smooth — `transition: all 0.15s ease` is the baseline timing. Nothing should feel laggy or overwrought.

### File and Folder Structure
Modularity is the single most important architectural principle for the frontend codebase. Every page lives alone, thinks alone, and styles alone. This makes individual pages editable without risk of cascading unintended changes elsewhere.

```
src/
├── assets/           # All images, icons, and static media
├── pages/            # One .jsx file per page, nothing else
│   ├── signup_page.jsx
│   ├── customer_login.jsx
│   ├── merchant_login.jsx
│   ├── customer_homepage.jsx
│   ├── merchant_homepage.jsx
│   ├── profile.jsx
│   ├── settings_page.jsx
│   └── ...
├── styles/           # One .css file per page, named identically
│   ├── signup_page.css
│   ├── customer_login.css
│   ├── merchant_login.css
│   ├── customer_homepage.css
│   ├── merchant_homepage.css
│   ├── profile.css
│   ├── settings_page.css
│   └── ...
└── components/       # Shared atomic components only (BottomNav, etc.)
    └── BottomNav/
        ├── BottomNav.jsx
        └── BottomNav.css
```

**Rules enforced without exception:**
- Every `page_name.jsx` has exactly one corresponding `page_name.css` in `src/styles/`
- No global stylesheets except a single `index.css` that sets the Gabarito font import and CSS reset only — nothing else
- No page imports another page's stylesheet
- No page's class names collide with another — prefix all class names with the page identifier (e.g. `.signup__button`, `.customer-login__card`, `.merchant-homepage__balance`)
- Functions, components, and styles that are genuinely shared (e.g. the bottom navigation capsule) live in `src/components/` with their own isolated stylesheet
- Backend wiring is deferred — all buttons navigate to the correct route and all forms validate locally, but no API calls are made until the backend integration phase

---

## Page Specifications

---

### `signup_page.jsx` — The Root Page

**Route:** `/`

**What this page does:** This is the first thing anyone sees when they open Bloc. Its job is singular: communicate what Bloc is and get people to choose their path (customer or merchant) as fast as possible. It is not an information page. It is an entrance.

**Layout:**

The top 35% of the screen is white. The logo (`src/assets/logo`) sits at the very top, centered. Below it, the tagline renders large — confident and unhurried:

```
Payments that sound
like you.
```

The bottom 65% of the screen is a full-bleed image (`src/assets/signup.jpeg`) that bleeds upward into the white with a gentle U-curve — a soft, organic shape, not a hard edge or a straight line. The image does not have a border or a card container. It simply becomes part of the page. The transition between white and image should feel like the image is emerging from the background, not pasted on top of it.

On top of this image, near the bottom of the screen, two buttons sit side by side, full-pill, well-spaced:

- **"Customer"** — routes to `/customer-login`
- **"Merchant"** — routes to `/merchant-login`

Both buttons have a slight frosted-glass quality so they remain legible against the image behind them. On hover they scale and deepen in tone.

**Design references:** The U-curve transition is inspired by Apple's product marketing pages — the way imagery flows into negative space. The two-button split is borrowed from Duolingo's onboarding, which creates immediate personalisation with a single choice rather than asking five questions upfront.

---

### `customer_login.jsx` — Customer Signup

**Route:** `/customer-login`

**Tagline:**
```
Claim your @.
It's how your people will find you.
```

**What this page does:** Sells the handle-based identity concept to the new customer before they even sign up. It should feel social and exciting — more like joining a community than opening a bank account.

**Layout:**

Logo at the top, centered.

Tagline below it — large, warm, unhurried.

Below the tagline: three tilted profile cards arranged organically, slightly overlapping, each rotated a few degrees off-axis (one slightly left, one center, one right) — never aligned to a straight grid. Each card shows:
- A circular profile photo taking up roughly 80% of the card's visual area (images from `src/assets/`)
- The user's @handle below the photo
- A short human bio — e.g. `@jessmusic — "Music heals everything 🎵"`, `@jamesjames — "Always hungry, never late"`, `@maryanne_105 — "Art, coffee, Sunday markets"`

These cards are not interactive. They are visual evidence that real people live on this platform, that handles are personal and expressive, that this is not a banking app.

Below the cards: a single large pill button — **"Get Me In"** — in deep purple. Pressing it expands (or navigates to) a clean signup form:

- First name
- Last name
- @handle (with real-time availability check — green checkmark when available, red when taken)
- Email
- Phone number
- Password (with strength indicator, show/hide toggle)
- Confirm password
- **"Sign Up"** button — full pill, deep purple

**Design note:** The handle field is the most important field on this form. Give it extra visual weight — slightly larger, with the `@` prefix rendered as a fixed, styled element inside the input box, not as placeholder text that disappears on focus.

---

### `merchant_login.jsx` — Merchant Signup

**Route:** `/merchant-login`

**Tagline:**
```
Look like the business
you are.
```

**What this page does:** Sets a tone of professional dignity for small business owners who are used to being invisible behind a Paybill number. The page should feel like the beginning of having a real presence.

**Layout:**

Logo on the left side (not centered — this is the first visual distinction from the customer flow, signalling a different kind of experience).

Tagline large and confident.

**Merchant account form:**
- First name
- Last name
- Phone number
- Email
- Password (with show/hide toggle)
- @handle for business (same real-time check as customer)
- Business bio (short text area — note: can be edited later in Settings)

**"Create Your Store" section** — a distinct card below the main form, with its own tagline:
```
Build your store.
It only takes two minutes.
```

Fields inside this section:
- Business @handle (pre-filled from above, editable)
- Business bio (pre-filled from above, editable)
- Shop category — pill-style chip selector: Restaurant / Retail / Mama Mboga / Services / Beauty / Other (not a dropdown — tap to select, selected chip fills with purple)
- Business location — text field with map pin icon
- Business hours — simple open/close time per day, expandable
- Product photos — multi-image upload, grid preview
- Menu / catalogue — file upload (PDF or image)

**"Get Paid" section** — a distinct card below the store setup:

Tagline: `"Where should your money land?"`

Subtext: `"Customers will pay @yourhandle — you choose where it goes."`

Three selectable options rendered as tappable cards (not a dropdown):
- **Till Number** (Buy Goods) — single numeric input
- **Paybill** — Paybill number + Account number
- **Personal M-Pesa** — phone number input

Below the input, a confirmation line renders dynamically: `"Payments will route to: JOHN'S KITCHEN"` — giving the merchant confidence they connected the right account.

Example business handles rendered on this page for social proof (same tilted card approach as customer login): `@jamesnyama`, `@greenmarket`, `@jaques_barbershop` — images from `src/assets/`.

Final **"Sign Up"** button — full pill, deep purple.

---

### `customer_homepage.jsx` — Customer Home

**Route:** `/customer-home`

**What this page does:** This is the screen customers will see dozens of times a day. It must be instantly readable, calm, and alive — all at once. Think less banking dashboard, more a social app that happens to hold your money.

**Layout (top to bottom):**

**Header:** Logo top-left. Notification bell icon top-right.

**Search bar:** Directly below the header. Full-width pill input with the search icon from `src/assets/`. Placeholder: `"find a friend, bar, shop..."`. Tapping it routes to the search/pay flow.

**Balance card:** A large, softly rounded card. Shows:
- "Your Balance" label in secondary text
- Balance amount in large Gabarito — `KES 4,200.00`
- A small eye icon to toggle visibility (balance shown / balance hidden as `KES ●●●●`)
- Two pill buttons inside the card: **"Send Money"** and **"Top Up"** — icons from `src/assets/`

**Your Feed:** Section header `"Your Feed"` in medium weight. Below it, a horizontal scrollable row of profile cards — each card shows a circular avatar, a @handle, and a one-line bio. These are people and businesses the user has interacted with, or businesses nearby. Scrolls horizontally, not vertically, so the main page scroll remains uninterrupted.

**Recent transactions:** A vertical scroll of transaction items below the feed row — each item shows the counterparty avatar, their name and handle, the amount (green for received, neutral for sent), the note or occasion tag if one exists, and the timestamp. This is the ledger made human.

**Bottom navigation capsule:** Full-pill floating capsule at the bottom of the screen containing four icons: `home.jpeg` / `profile` / `pay.jpeg` / `settings.jpeg` — routing to their respective pages. Active icon is highlighted in deep purple.

---

### `merchant_homepage.jsx` — Merchant Home

**Route:** `/merchant-home`

**What this page does:** Gives a merchant the pulse of their business at a glance. Warmer than a dashboard, cleaner than a finance app.

**Layout (top to bottom):**

**Header:** Shop avatar (circular) + business name + @handle. Tap to go to the public-facing store profile. Small "View your shop" link beside the name.

**Earnings card:** Similar rounded card to the customer balance card. Shows:
- Current balance: `KES 12,400.00`
- Today's collected total: `"KES 3,200 today"` — in small secondary text below the main balance
- Toggle visibility eye icon
- Two pill buttons: **"Request Payment"** and **"Share My Shop"**

**Recent activity feed:** Section header `"What's Coming In"`. Vertical scroll of incoming payments — payer avatar + handle, amount, note if attached, timestamp. Same visual treatment as customer transaction history. Warm, human, readable.

**Shop completeness nudge** *(conditional — only renders if the shop profile is incomplete)*: A soft-bordered card with a gentle prompt, e.g. `"Add your menu — customers want to know what you offer."` with a small CTA button. Disappears once dismissed or completed.

**Bottom navigation capsule:** Four icons: `home` / `pay` / `store` / `settings` — pill capsule, same treatment as customer nav.

---

### `profile.jsx` — User / Business Profile and Pay Screen

**Route:** `/profile/:handle`

**What this page does:** The destination when you tap someone from search or the feed. It is simultaneously a profile page and a payment page — the two things are inseparable on Bloc.

**Layout:**

**Profile header:** Large circular profile photo at the top, centered. Name, @handle, and a small verified badge if applicable. Account type label (`Customer` or `Merchant`) in a small pill tag. Bio below — full text, no truncation.

**For merchant accounts only:** Below the bio, a horizontal scroll of product/shop photos. Then a menu or catalogue section if one has been uploaded — rendered as a simple card grid with item name, description, and price. Business location rendered as a one-line address with a map pin icon. Operating hours rendered as a clean weekly list.

**Payment section:**

Amount input — large, centered numeric field. The `KES` currency label is rendered as a fixed prefix inside the input, styled identically to the `@` prefix on the handle field. Below the input, quick-amount suggestion chips: `50` / `100` / `500` / `1,000` / `2,500`.

**"Add a little context" card:** A card at the bottom of the payment section. This is where the social layer lives. It behaves like a flat messaging composer — a text input for a note, an emoji picker, sticker suggestions. Placeholder text: `"Say something... 'Asante sana 🙏', 'Dinner was perfect', 'Goodnight'"`. This field is optional — skip is always available. The tone of the placeholder copy is deliberately warm and specific, modelling the behaviour you want users to adopt.

**Pay button:** Full-width, full-pill, deep purple. `"Pay @handle"` — the handle of the recipient is embedded in the button label itself, one last identity confirmation before committing. Payment logic wired in later.

---

### `settings_page.jsx` — Settings

**Route:** `/settings`

**What this page does:** The settings page should not feel like a different product. It is still Bloc — the personality does not evaporate when you need to change your password.

**Sections:**

**"You"** — Top of the page. Mini profile card: photo, name, @handle. Tap to edit. "View your profile" link. This section mirrors the profile page header.

**"Your Money"** — Linked payout method (Till / Paybill / personal number). Currency display. Change payment method CTA.

**"Stay in the Loop"** — Notification toggles. Four maximum: Payment received / Payment request / Reactions / Business updates (merchant only). Styled as large, rounded toggle switches — not small checkbox lists.

**"Who Sees What"** — Privacy controls. Who can see your transaction feed (Everyone / Contacts only / Just me). Who can find you by handle. Rendered as segmented pill selectors, not dropdowns.

**"The boring stuff"** — Change password. Switch to business account (if personal). Log out. Delete account (bottom, small, unfilled button — present but not calling attention to itself).

**"Support & About"** — Help, Terms, Privacy Policy, version number.

**Design note:** Section headers use the friendly labels above rather than generic ones ("Notification Preferences", "Privacy Settings"). The voice of the product is present even in its most utilitarian screen.

---

## Frontend State and Navigation Rules

- If a form submission fails, the user returns to the form with the error surfaced inline on the relevant field — not a redirect to the homepage, not a generic error screen. The user never loses their input.
- Navigation between pages uses React Router. All routing is client-side.
- Protected routes (any page post-authentication) redirect to `/` if no valid session is present.
- The bottom navigation capsule is a shared component (`src/components/BottomNav/`) with two variants: `customer` and `merchant`. It receives its variant as a prop. It has its own isolated stylesheet (`BottomNav.css`). No page imports this stylesheet directly — the component manages its own styles.
- Active route is tracked in the BottomNav component and the active icon renders in deep purple.

---

## Design References

The following products and designers informed the visual and interaction language of Bloc:

- **Venmo** — social transaction feed, the idea that payments belong in a timeline
- **Cash App** — handle-based identity, minimalist card-heavy layout, the confidence of making a financial product feel cool
- **Square** — merchant storefront as a first-class concept, the dignity of small business digital presence
- **Instagram** — the tilted card arrangement on the login page, the idea of a feed as a window into other people's lives
- **Linear** — micro-animation philosophy: everything interactive responds, nothing is static, transitions are fast and purposeful
- **Apple Human Interface Guidelines** — the U-curve image blending on the signup page, the principle that the best interfaces disappear and leave only the content
- **Refactoring UI (Adam Wathan & Steve Schoger)** — the use of extreme border radii to create warmth, the principle that good design is mostly spacing and weight decisions

---

*Bloc Design Document — Version 1.0*
*Nixon Mburu Wainaina — Summer 2026*