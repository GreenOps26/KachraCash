# Product Requirements — KachraCash

## One-Line Description
**KachraCash** is a 3-sided marketplace where citizens sell household scrap to kabadiwalas through a mutual bidding system — no fixed rates, fair prices for everyone.

## Primary User Story
> "As a citizen, I want to post my scrap with a photo and category so that nearby kabadiwalas can bid on it — and I get the best fair price through negotiation, not luck."

---

## Must-Have Features (P0 — Launch Blockers)

### Feature 1: Citizen Scrap Listing
- Citizen uploads photos of scrap
- Selects category: Plastic / Paper / Metal / E-Waste / Mixed
- Enters rough quantity (weight description like "Approx 5kg")
- **Acceptance Criteria:**
  - Listing created in under 3 minutes
  - At least 4 scrap categories supported
  - Listing appears on kabadiwala's map within 60 seconds

### Feature 2: Kabadiwala Bidding
- Kabadiwalas see nearby listings on a map view
- Can place a price bid (in ₹) on any listing
- **Acceptance Criteria:**
  - Listings visible within configurable radius (default 5km)
  - Kabadiwala can place AND update a bid before acceptance
  - Multiple kabadiwalas can bid on the same listing simultaneously

### Feature 3: Mutual Negotiation & Bid Acceptance
- Citizen can view all bids and counter-bid
- Kabadiwala can adjust their bid in response
- A system-defined price ceiling prevents runaway negotiations
- **Acceptance Criteria:**
  - Citizen can accept OR counter any active bid
  - Kabadiwala can respond to a counter-bid
  - Price ceiling enforced at listing creation time
  - Once citizen accepts → listing locked, all other bids expire

### Feature 4: Location-Based Matching
- Google Maps shows pins for listings within service radius
- Distance calculated via Google Maps Distance Matrix API
- **Acceptance Criteria:**
  - Kabadiwala sees only listings within their set radius
  - Kabadiwala can update their service radius
  - Citizens only see bids from local kabadiwalas

### Feature 5: KachraCash Wallet + UPI Payout
- After pickup confirmed by both parties → money credited to citizen wallet
- Citizen can withdraw anytime via UPI
- **Acceptance Criteria:**
  - Wallet balance visible on citizen dashboard
  - UPI payout initiated within 24 hours of pickup confirmation
  - Razorpay handles all payment processing
  - Transaction history visible in app

---

## NOT in MVP (Save for Version 2+)

| Feature | Why Deferred |
|---------|-------------|
| AI waste photo recognition | Manual category selection works for pilot scale |
| Ratings & reviews | Not enough volume in pilot to be meaningful |
| Eco-points & leaderboard gamification | Nice-to-have; not core to transaction |
| Recycler portal (3rd side) | Prove citizen-kabadiwala loop first |
| Corporate/CSR accounts | Requires separate sales motion |
| EPR credit facilitation | Regulatory complexity |
| In-app chat | WhatsApp via Make.com is sufficient for now |

---

## Success Metrics

### First 30 Days
| Metric | Target |
|--------|--------|
| Completed end-to-end pickups | 50+ in pilot zone |
| Active kabadiwalas (1+ bid/week) | 20–30 |
| Average bid value per pickup | ₹150–300 |

### Months 2–3
| Metric | Target |
|--------|--------|
| Citizens who listed scrap | 200+ unique users |
| Bid acceptance rate | >60% of listings receive accepted bid |
| Repeat usage | >30% of citizens post a 2nd listing |

---

## Design Vibe
**Clean & minimal · Friendly & approachable · Bold & colorful — stands out on a phone screen**

- Every screen does ONE thing — no information overload
- Show ₹ amounts prominently — money is the hook
- Mobile-first: designed for 5-inch screen, Android Chrome minimum
- Green color palette: signals eco-purpose without being preachy
- Large tap targets, minimal text entry, works on low-end Android phones

---

## Key Screens

| Screen | User | Purpose |
|--------|------|---------|
| Home / Dashboard | Citizen | Active listings, wallet balance, "Post Scrap" CTA |
| Post Scrap | Citizen | Photo + category + quantity (3 steps max) |
| My Bids | Citizen | View all bids, counter-bid or accept |
| Map View | Kabadiwala | Nearby listing pins with distance + scrap type |
| Listing Detail + Bid | Kabadiwala | Photo, current bids, place/adjust own bid |
| Pickup Confirmation | Both | Confirm pickup done → triggers wallet credit |
| Wallet | Citizen | Balance, transaction history, UPI withdrawal |

---

## MVP Definition of Done
All 5 P0 features functional end-to-end, PLUS:
- [ ] Works on mobile browsers (Android Chrome minimum)
- [ ] Razorpay KYC complete and UPI payouts tested in Sandbox
- [ ] OTP login works for both Citizens and Kabadiwalas
- [ ] WhatsApp notifications fire on bid update + pickup confirmation
- [ ] 5 beta users complete a full end-to-end test without help
- [ ] Basic analytics tracking (pickups, bid counts) visible in dashboard

---

## Target Users

**Persona 1 — Raj (Citizen):** Urban apartment/PG resident, student or young professional. Has scrap piling up but can't find a kabadiwala. Uses UPI daily, expects WhatsApp notifications. Wants actual rupees, not eco-karma.

**Persona 2 — Raju (Kabadiwala):** Independent scrap collector, owns a basic smartphone, covers a city route. Needs simple UI (Hindi/regional in Phase 2). Wants to stop wasting fuel on routes with no scrap to collect.

---

## Open Questions (Unresolved)
1. Who sets the price ceiling per scrap category — KachraCash admin or market-rate API?
2. How are scrap weight disputes handled at pickup (citizen vs kabadiwala weigh-in)?
3. What is the KachraCash commission model — % of transaction or subscription?
4. Will kabadiwalas require verification/KYC before they can bid?
