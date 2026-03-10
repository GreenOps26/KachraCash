# Testing Strategy — KachraCash

## Philosophy
Build confidence through frequent manual + automated checks. Don't skip verification for "simple" changes — small bugs compound fast in a marketplace with real money.

---

## Verification Checklist (Run After Every Feature)

### Before Committing
```bash
npm run lint          # ESLint — must pass with 0 errors
npm run type-check    # TypeScript — must pass with 0 errors
npm run build         # Next.js build — must succeed
```

### Manual Smoke Tests by Feature

**Phase 1 — Auth**
- [ ] OTP login flow completes (phone → OTP code → dashboard)
- [ ] Refresh page after login — user stays logged in
- [ ] Sign out → redirected to sign-in page

**Phase 2 — Citizen Loop**
- [ ] Upload a photo → appears in Convex Storage
- [ ] Create listing → appears in "My Listings" dashboard
- [ ] Listing status shows "active"
- [ ] Wallet balance displays (₹0 for new user)

**Phase 3 — Kabadiwala Loop (The "Magic Test")**
- [ ] Open two browser windows (citizen + kabadiwala)
- [ ] Kabadiwala places bid
- [ ] Citizen dashboard updates **without refreshing** — this is the real-time proof
- [ ] Citizen counters bid → kabadiwala sees counter
- [ ] Citizen accepts bid → listing locks, other bids show "expired"

**Phase 4 — Payments**
- [ ] Pickup confirmed by both parties
- [ ] Wallet balance increases by correct amount
- [ ] Razorpay Sandbox: UPI payout initiated
- [ ] Transaction appears in wallet history

---

## Pre-Commit Hooks Setup

```bash
npm install -D husky lint-staged
npx husky init
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

`.husky/pre-commit`:
```bash
npx lint-staged
npm run type-check
```

---

## Key Commands

```bash
npm run dev           # Start Next.js dev server (localhost:3000)
npx convex dev        # Start Convex dev tunnel (in separate terminal)
npm run lint          # ESLint check
npm run type-check    # TypeScript check (no emit)
npm run build         # Production build test
npm run start         # Test production build locally
```

Add to `package.json` scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Convex-Specific Testing

```typescript
// Test your Convex functions in the Convex Dashboard
// Go to: https://dashboard.convex.dev → Functions → Run manually

// Or write simple node tests:
// npx convex run listings:getActiveListings
// npx convex run bids:getBidsForListing '{"listingId": "your_id_here"}'
```

---

## Real-Time Feature Verification Protocol
The bidding system's real-time updates are the core value prop. Use this test every time you change bid/listing logic:

1. Open `localhost:3000` as Citizen (Chrome window)
2. Open `localhost:3000` as Kabadiwala (Chrome Incognito window)
3. Citizen creates a listing
4. Kabadiwala places a bid
5. ✅ Citizen sees the bid appear **within 2 seconds** without any refresh
6. Citizen counters the bid
7. ✅ Kabadiwala sees the counter **within 2 seconds**

If this test fails → do NOT proceed with other features.

---

## Error Monitoring (Post-Launch)
- Use Vercel's built-in error tracking for production
- Add `console.error` for all Convex mutation failures in development
- Check Convex Dashboard logs for function errors: `https://dashboard.convex.dev`
