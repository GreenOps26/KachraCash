# UI Design Skills — KachraCash Reference Guide

8 UI design skills with ready-to-paste prompts, tailored to KachraCash's
design requirements: mobile-first, India-first, three distinct user dashboards,
real-time bid animations, Google Maps integration, Three.js 3D visuals,
and a "financially motivating" green/bold design system.

---

## 1. `ui-ux-pro-max` ⭐ Best for: full visual elevation
> UI/UX design intelligence with 50 styles, 21 palettes, 50 font pairings, and support for React + Tailwind + mobile-first stacks.

**Best for:** KachraCash has three completely different user types (Citizen, Kabadiwala, Recycler) who each need a distinct but cohesive visual experience. This skill helps you design a system that feels unified but is tuned per role — critical for adoption in diverse user groups.

**Your Prompt:**
```
Use the ui-ux-pro-max skill to design the visual identity for KachraCash.

Design vibe from PRD:
- "Clean & minimal · Friendly & approachable · Bold & colorful"
- "Financially motivating: Show rupee amounts prominently. Money is the hook."
- "Mobile-first: designed for a 5-inch screen first"
- "Trustworthy: Green palette signals eco-purpose without being preachy"

Three user types with different emotional needs:
- Citizen: wants to feel like they're earning money, not doing chores
  → motivating, reward-focused, prominent ₹ amounts
- Kabadiwala: wants efficiency — quick scan, quick bid, quick route
  → dense info, map-first, fast tap targets
- Recycler (B2B): professional, data-heavy portal (Phase 2)
  → clean tables, neutral tones

Design recommendations for:
1. Color system — primary, secondary, success, warning, error
   (must feel fresh and trustworthy in an Indian mobile context)
2. Typography — what font pair works for Hindi + English mixed content?
3. The "Recycle Coin" visual language — how should the wallet and
   earnings elements look to feel rewarding?
4. CTA hierarchy — what's the most important button on each dashboard?

Give me specific Tailwind classes and hex values.
```

---

## 2. `tailwind-design-system` ⭐ Best for: consistent tokens across 3 dashboards
> Build scalable design systems with Tailwind CSS, design tokens, component libraries, and responsive patterns.

**Best for:** KachraCash has 3 distinct dashboards built in one codebase. Without a locked-down design token system, each dashboard will drift visually over time. This skill creates the single source of truth for colors, spacing, and components.

**Your Prompt:**
```
Use the tailwind-design-system skill to create KachraCash's design system
in Tailwind CSS.

Three dashboards, one codebase:
- /citizen → earnings-focused, warm, inviting
- /kabadiwala → map-dominant, efficient, fast
- /recycler → B2B data portal (Phase 2, but plan for it now)

Define:
1. Color tokens
   - Primary (green family — eco signal): suggest exact values
   - Accent (money/reward — amber or gold): suggest exact values
   - Success (deal confirmed): suggest value
   - Warning (bid expiring): suggest value
   - Error (payment failed): suggest value
   - Neutral surface colors for cards and backgrounds

2. Component classes for shared elements:
   - Bid card (shows amount, kabadiwala name, status badge)
   - Listing card (shows photo thumbnail, category badge, ₹ amount)
   - Wallet balance display (the big ₹ number — make it feel good)
   - Map pin styles (active listing vs. won listing vs. expired)
   - Status badge (active / negotiating / completed / cancelled)

3. Responsive tokens — what changes between 375px mobile and
   768px tablet (for recycler B2B portal)?

Give me the tailwind.config.js and example className strings.
```

---

## 3. `radix-ui-design-system` ⭐ Best for: accessible dropdowns, modals & dialogs
> Build accessible design systems with Radix UI primitives — headless components, theming, and compound patterns.

**Best for:** The bid acceptance flow, counter-bid modal, and category selector all need to be accessible and work perfectly on Android Chrome. Radix gives you the accessibility layer (ARIA, keyboard, focus trap) without having to build it yourself.

**Your Prompt:**
```
Use the radix-ui-design-system skill to build the key interactive
UI components for KachraCash using Radix UI primitives + Tailwind.

Components needed:

1. Counter-Bid Modal (Citizen flow)
   - Triggered when citizen clicks "Counter Bid"
   - Shows current bid amount, input for counter amount,
     price ceiling warning if getting close to limit
   - Must be accessible — screen reader announces "Counter bid dialog"
   - Must work with Android Chrome's virtual keyboard
     (doesn't get pushed behind keyboard)

2. Scrap Category Selector (Citizen listing creation)
   - 4 options: Plastic, Metal, Paper, E-Waste
   - Each option should show an icon + label
   - Should auto-select when Gemini AI returns a category
   - Accessible with proper ARIA labels

3. Pickup Confirmation Dialog (both Citizen and Kabadiwala)
   - "Confirm this pickup is complete?" with ₹[amount] shown prominently
   - Two buttons: Confirm (green, prominent) and Cancel (ghost)
   - Should prevent accidental taps on mobile (require deliberate action)

Style everything with our green/amber Tailwind tokens.
```

---

## 4. `scroll-experience` ⭐ Best for: making wallet credit feel rewarding
> Expert in scroll-driven experiences — parallax, scroll animations, interactive narratives, and cinematic web experiences.

**Best for:** The moment a citizen's wallet gets credited after a pickup is the emotional peak of the entire KachraCash experience. This skill makes that moment feel genuinely rewarding — which directly drives word-of-mouth ("you should have seen the animation when I got paid!").

**Your Prompt:**
```
Use the scroll-experience skill to design the reward animation sequence
for KachraCash's key "money moment" screens.

Two peak emotional moments to animate:

1. BID RECEIVED (Citizen sees a new bid come in via Convex real-time)
   - A new bid card slides in from the right with a green highlight
   - The amount pulses once: ₹150 → slightly larger → back to normal
   - A subtle "coin drop" sound cue would be ideal (optional)
   - Must not distract if multiple bids arrive in quick succession

2. WALLET CREDITED (After pickup confirmed + payment processed)
   - This is the biggest moment in the app
   - The wallet balance should count up from the old amount to the
     new amount (e.g., ₹0 → ₹180) with a satisfying animation
   - The Three.js "Recycle Coin" (from TDD spec) should spin and land
   - Confetti burst (as specified in TDD Phase 4)
   - Screen should feel celebratory — this is payday

Keep all animations under 800ms total. These are working-class users
on mid-range Android phones — no janky 60fps drops.

Give me the React + Tailwind + Framer Motion (or CSS) code for each.
```

---

## 5. `wcag-audit-patterns` ⭐ Best for: accessibility across 3 user types
> Conduct WCAG 2.2 accessibility audits with automated testing, manual verification, and remediation guidance.

**Best for:** KachraCash serves kabadiwalas who may have limited digital literacy — this makes accessibility doubly important. Large touch targets, clear contrast, and screen reader support aren't just compliance boxes; they're adoption enablers for the harder-to-reach user group.

**Your Prompt:**
```
Use the wcag-audit-patterns skill to audit KachraCash for WCAG 2.1 AA
compliance, with special attention to the Kabadiwala user experience.

Context: Kabadiwalas are often less tech-savvy, may use older Android
phones (Samsung Galaxy A-series), and may switch between Hindi and
English mid-session. The PRD requires "mobile-first: designed for a
5-inch screen first."

Audit priorities:

1. Touch targets — are all buttons and map pins at least 44×44px?
   The "Place Bid" button in particular must be easy to tap while
   the user is outdoors, possibly in sunlight.

2. Color contrast — does our green primary color meet 4.5:1 ratio
   against white backgrounds? Does the ₹ amount text on bid cards
   meet contrast requirements?

3. Map accessibility — Google Maps pins are notoriously inaccessible.
   What's the minimum we need to add so a screen reader user can
   navigate to a listing without using the map?

4. Form labels — does the listing creation form (photo upload, category
   select, weight input) have proper labels for screen readers?

5. Mixed-language content — does the app handle Hindi text in Tailwind
   layouts without breaking (line heights, character widths)?

Give me a prioritized fix list with exact code changes.
```

---

## 6. `react-ui-patterns` ⭐ Best for: the real-time bid list component
> Modern React UI patterns for loading states, error handling, and data fetching — async data and UI state management.

**Best for:** The bid list on the citizen's listing page is KachraCash's most complex UI component — it must handle real-time updates from Convex, show loading skeletons, animate new bids in, highlight the winning bid, and show an empty state — all at once.

**Your Prompt:**
```
Use the react-ui-patterns skill to build the bid list component for
KachraCash's citizen listing detail page.

This component receives live data from Convex useQuery and must handle:

State 1 — Loading (useQuery returns undefined)
→ Show 2 skeleton bid cards with pulse animation

State 2 — Empty (no bids yet)
→ "No bids yet — nearby kabadiwalas will see your listing on their map 📍"
→ Show a subtle animated radar/ping effect to suggest "being seen"

State 3 — Bids present
→ List of bid cards showing: kabadiwala name, ₹ amount, time ago,
  action buttons (Accept / Counter)
→ Sort by highest bid amount
→ Show a "BEST OFFER" badge on the top bid

State 4 — New bid arrives via Convex real-time
→ New card slides in from top with green highlight that fades after 2s
→ If new bid is higher than current top, swap the "BEST OFFER" badge
  with a subtle animation

State 5 — Bid accepted (listing locked)
→ All other bid cards grey out with "Offer Expired" label
→ Winning bid card shows green "ACCEPTED ✓" badge

Show me the complete TypeScript + Tailwind component code.
```

---

## 7. `canvas-design` ⭐ Best for: marketing and onboarding visuals
> Create beautiful visual art in .png and .pdf documents using design philosophy. Use for posters, social media visuals, and marketing assets.

**Best for:** KachraCash's pilot launch needs WhatsApp-shareable graphics to recruit kabadiwalas and apartment resident communities. A well-designed "Turn Your Scrap Into Cash" poster sent via WhatsApp groups is likely the most effective marketing channel for the pilot.

**Your Prompt:**
```
Use the canvas-design skill to create two marketing assets for
KachraCash's pilot launch in Pune.

Asset 1: Kabadiwala Recruitment Poster (WhatsApp image, 1080×1080px)
- Headline (in Hindi): "कचरा बेचो, पैसे कमाओ" (Sell scrap, earn money)
- Sub-headline (English): "Join KachraCash — Get paid pickups in your area"
- Visual: a kabadiwala with a smile, mobile phone, and green checkmark
- KachraCash branding: green + amber color scheme, app name prominent
- Download CTA: "Download / WhatsApp: [number]"
- Feel: trustworthy, professional, financially motivating

Asset 2: Citizen App Screenshot Card (for apartment WhatsApp groups)
- Shows the before/after of the experience:
  Left: "Your scrap sitting at home" → Right: "₹180 in your wallet"
- App name and tagline: "KachraCash — Turn Waste into Wallet"
- One-line instruction: "Post a photo → Get bids → Get paid"
- Green eco-friendly aesthetic

Generate both as .png files.
```

---

## 8. `3d-web-experience` ⭐ Best for: the Three.js Recycle Coin and animations
> Expert in building 3D experiences for the web — Three.js, React Three Fiber, Spline, WebGL, and interactive 3D scenes.

**Best for:** The TDD explicitly specs Three.js via `@react-three/fiber` for the rotating "Recycle Coin" loading screen and confetti animations on pickup confirmation. This skill is the exact expert you need for those features — critical for making KachraCash feel premium despite being a web app.

**Your Prompt:**
```
Use the 3d-web-experience skill to build the Three.js components
specified in KachraCash's TDD.

Component 1: Rotating 3D "Recycle Coin" (Loading Screen)
- A coin-like object with the KachraCash logo or ♻️ symbol embossed
- Should rotate smoothly on the Y axis (like a coin spinning)
- Green metallic material (#22c55e or similar)
- Used on the app's initial loading screen while Convex/Clerk initialize
- Must be lightweight — target devices are mid-range Android phones
  (Samsung Galaxy A14, Redmi Note series)
- Fallback: if Three.js fails to load, show a simple CSS spinner

Component 2: Confetti Burst (Pickup Confirmation)
- Fires when citizen confirms a pickup is complete and wallet is credited
- Confetti pieces in green + amber (brand colors)
- Duration: 2 seconds max, then disappears
- Should not block any UI elements underneath
- Must not crash on low-RAM devices

Stack: @react-three/fiber, @react-three/drei, Next.js 14.

Give me the complete component code for both, with performance
optimization notes for mid-range Android devices.
```

---

## Quick Reference — UI Design Skills

| Skill | Best Moment to Reach For It |
|---|---|
| `ui-ux-pro-max` | Overall visual identity — colors, type, design language for 3 user types |
| `tailwind-design-system` | Locking in tokens and component classes across all 3 dashboards |
| `radix-ui-design-system` | Counter-bid modal, category selector, pickup confirmation dialog |
| `scroll-experience` | Wallet credit animation and bid arrival animation |
| `wcag-audit-patterns` | Accessibility audit — especially for Kabadiwala users on Android |
| `react-ui-patterns` | Real-time bid list component (all 5 states) |
| `canvas-design` | WhatsApp marketing posters for pilot kabadiwala and resident recruitment |
| `3d-web-experience` | Three.js Recycle Coin loading screen + confetti burst on payment |
