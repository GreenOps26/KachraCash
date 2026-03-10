# Error-Related Skills — KachraCash Reference Guide

8 error skills with ready-to-paste prompts, tailored to KachraCash's
specific failure points: real-time Convex bidding, Razorpay payment
webhooks, Google Maps, Clerk OTP auth, and Three.js animations.

---

## 1. `error-detective` ⭐ Best for: hunting bugs across the system
> Searches logs and codebases for error patterns, stack traces, and anomalies. Correlates errors across systems and identifies root causes.

**Best for:** KachraCash has 5+ integrated services (Convex, Clerk, Razorpay, Google Maps, Make.com). When something breaks, it's rarely obvious which layer failed. This skill hunts across all of them.

**Your Prompt:**
```
Use the error-detective skill to investigate a bug in KachraCash.

The symptom: [describe what's wrong — e.g., "a citizen accepted a bid
but their wallet balance didn't update, even though the kabadiwala's
app shows the pickup as complete"]

Please search across:
1. Convex mutations — did the wallet credit mutation fire?
2. Razorpay webhook logs — did the payment success event reach our
   Next.js API route?
3. The bid acceptance flow — did the listing status change to "completed"?
4. Make.com execution logs — did the WhatsApp notification trigger?

Identify which layer failed and why, before suggesting a fix.
```

---

## 2. `error-handling-patterns` ⭐ Best for: building resilient payment flows
> Masters error handling across languages — exceptions, Result types, error propagation, and graceful degradation to build resilient applications.

**Best for:** Razorpay webhook handling is the most critical failure point in KachraCash. A missed or duplicate payment webhook could double-credit a wallet or leave a citizen unpaid. This skill builds the proper error envelope around it.

**Your Prompt:**
```
Use the error-handling-patterns skill to harden KachraCash's payment
error handling.

Three critical failure points to address:

1. Razorpay webhook handler (Next.js API route /api/razorpay/webhook)
   - What if the webhook arrives but Convex is momentarily unavailable?
   - What if the same payment.captured event fires twice?
   - How do we verify the webhook signature to prevent fake payment events?

2. Convex wallet credit mutation
   - Must be idempotent — should never credit twice for the same
     transaction ID
   - What if the mutation fails halfway through?

3. UPI payout initiation
   - What if Razorpay rejects the payout (insufficient balance,
     invalid UPI ID)?
   - Citizen should see a clear message, not a silent failure

Show me the error handling code for each case in TypeScript.
```

---

## 3. `systematic-debugging` ⭐ Best for: any unknown bug — use this first
> Use when encountering any bug, test failure, or unexpected behavior — before proposing any fixes.

**Best for:** Your go-to first step for every KachraCash bug. Forces root-cause analysis before patching — especially important with Convex's reactive system where a UI glitch could be caused by a backend query, a schema mismatch, or a stale subscription.

**Your Prompt:**
```
Use the systematic-debugging skill to help me diagnose this issue
in KachraCash:

Error: [paste the exact error from browser DevTools console or
Convex dashboard logs]

Steps to reproduce:
1. [what you did — e.g., "kabadiwala placed a bid"]
2. [what happened — e.g., "the citizen's listing page didn't update"]

Expected: [what should have happened]
Actual: [what actually happened]

Stack: Next.js 14, Convex (real-time DB), Clerk OTP auth,
Razorpay, Google Maps.

Walk me through:
- Which layer is most likely responsible
- What to check first in the Convex dashboard
- Whether this is a subscription/reactivity issue or a mutation issue
Before suggesting any code changes.
```

---

## 4. `react-ui-patterns` ⭐ Best for: loading, error & empty states
> Modern React UI patterns for loading states, error handling, and data fetching — especially async data and managing UI states.

**Best for:** KachraCash has many async states that need clean handling: the map loading while fetching listings, the "no bids yet" empty state, the error message if Razorpay fails. Convex's `useQuery` returns `undefined` while loading — this skill shows how to handle every state gracefully.

**Your Prompt:**
```
Use the react-ui-patterns skill to design proper UI state handling
for KachraCash's most critical screens.

Convex's useQuery returns:
- undefined → loading
- [] (empty array) → no results
- data → success
- throws → error

Design state handling patterns for:

1. Kabadiwala map screen
   - Loading: "Finding scrap near you..." skeleton
   - Empty: "No active listings in your area right now" with
     a refresh button
   - Error: "Couldn't load listings — check your connection"

2. Citizen listing detail (the bids list)
   - Loading: skeleton bid cards
   - Empty: "No bids yet — kabadiwalas will start bidding soon 🔔"
   - New bid arriving: animate in with a green flash (real-time update)
   - Error: "Couldn't load bids"

3. Wallet screen
   - Loading: show ₹--- with a pulse animation
   - Empty state (₹0): "Complete your first pickup to earn!"
   - Error: "Couldn't load balance"

Show me the TypeScript + Tailwind component code for each.
```

---

## 5. `distributed-debugging-debug-trace` ⭐ Best for: tracing the full bid-to-payment chain
> Expert in setting up distributed tracing and diagnostic tools across systems.

**Best for:** The KachraCash bid acceptance chain spans Convex → Next.js API → Razorpay → webhook → Convex wallet update. When it breaks in production, you need to trace exactly where it failed without digging through 5 separate dashboards manually.

**Your Prompt:**
```
Use the distributed-debugging-debug-trace skill to design lightweight
tracing for KachraCash's bid acceptance and payment chain.

The full chain:
1. Citizen clicks "Accept Bid" → Convex mutation runs
2. Listing status → "negotiating", other bids expire
3. Next.js API route triggers Razorpay payment order creation
4. User completes payment in Razorpay checkout
5. Razorpay fires webhook → /api/razorpay/webhook
6. Webhook handler updates Convex wallet
7. WhatsApp notification fires via Make.com

I want to be able to see, for any given transaction:
- Did each step complete successfully?
- At what timestamp?
- If a step failed, what was the error code?

Design a lightweight tracing system using Convex's own database
(add a `transaction_events` table) to log each step, so I can
debug any failed payment by querying a single Supabase-style table.
Show me the schema and the logging code for each step.
```

---

## 6. `sharp-edges` ⭐ Best for: pre-launch safety sweep
> Identifies error-prone APIs and dangerous configurations before they cause production problems.

**Best for:** KachraCash handles real money (Razorpay UPI payouts), real user locations (Google Maps), and real-time data (Convex). Dangerous configurations here have financial and legal consequences, not just UX bugs.

**Your Prompt:**
```
Use the sharp-edges skill to identify dangerous configurations and
error-prone patterns in KachraCash before pilot launch.

Focus on these high-risk areas:

1. Razorpay webhook signature verification
   - Are we verifying the X-Razorpay-Signature header on every
     incoming webhook? An unverified webhook means anyone could
     fake a payment success and get wallet credit.

2. Convex mutations — are any of them callable without authentication?
   - A citizen should never be able to call a mutation that credits
     a wallet. A kabadiwala should never be able to accept their own bid.

3. Google Maps API key exposure
   - Is the Maps API key restricted to our domain only?
   - Is it exposed in client-side bundles?

4. Clerk OTP abuse
   - Can someone request unlimited OTPs to a phone number?
   - Is there rate limiting on the OTP endpoint?

5. Photo upload — can a user upload a 100MB video and crash Convex Storage?

List each sharp edge with risk level (Critical/High/Medium) and
the exact fix.
```

---

## 7. `debugging-strategies` ⭐ Best for: intermittent real-time bugs
> Masters systematic debugging techniques for tracking down bugs across any codebase, especially intermittent ones.

**Best for:** Convex's real-time reactivity is the core magic of KachraCash — but when it breaks intermittently (bid appears for some users but not others, or update is delayed), it's very hard to reproduce and debug. This skill handles exactly that.

**Your Prompt:**
```
Use the debugging-strategies skill to help me track down an intermittent
real-time bug in KachraCash.

The symptom: "When a kabadiwala places a bid, the citizen's listing
page usually updates instantly (within 1 second) — but about 20% of
the time, the update takes 10–15 seconds or doesn't appear at all
until the page is manually refreshed."

This is critical because the real-time update is the core value
proposition of the bidding system.

Stack: Convex useQuery subscription on the frontend,
Convex mutation on the kabadiwala side.

Walk me through a systematic approach to:
1. Reproduce the issue consistently (what conditions make it happen?)
2. Determine if the delay is in the Convex mutation itself, the
   subscription delivery, or the React re-render
3. Add temporary logging to capture the exact timing of each step
4. Common causes of Convex subscription delays and how to rule each out
```

---

## 8. `github-issue-creator` ⭐ Best for: turning pilot feedback into trackable bugs
> Converts raw notes, error logs, or screenshots into crisp GitHub-flavored markdown issue reports.

**Best for:** During the pilot with 20–50 kabadiwalas, feedback will come in via WhatsApp, verbal, and screenshots. This skill turns that chaos into clean, prioritized GitHub issues your developer can actually act on.

**Your Prompt:**
```
Use the github-issue-creator skill to convert this pilot feedback
into a clean GitHub issue for the KachraCash repo.

Raw feedback from kabadiwala pilot user:
[paste the WhatsApp message, verbal note, or screenshot description here]

Example: "The map shows listings but when I click on one to bid,
sometimes it says 'listing not found' even though I can still see
it on the map. This happened 3 times today on my Samsung Galaxy A14
on Airtel 4G in Pune."

The issue should include:
- Clear title
- User role affected (Citizen / Kabadiwala / Both)
- Steps to reproduce
- Device + browser + network conditions
- Severity (Critical = blocks a transaction / High / Medium / Low)
- Any error messages seen on screen
- Label suggestions: bug, real-time, maps, payments, etc.
```

---

## Quick Reference — Error Skills

| Skill | Best Moment to Reach For It |
|---|---|
| `error-detective` | Something broke and you don't know which of the 5 services caused it |
| `error-handling-patterns` | Building/improving Razorpay webhook + wallet credit error handling |
| `systematic-debugging` | Any bug — use this FIRST before anything else |
| `react-ui-patterns` | Loading/empty/error states on map, bids list, wallet screen |
| `distributed-debugging-debug-trace` | Tracing the full bid → payment → wallet credit chain |
| `sharp-edges` | Pre-pilot safety sweep for Razorpay, Convex, Google Maps, Clerk |
| `debugging-strategies` | Intermittent Convex real-time update delays |
| `github-issue-creator` | Turning kabadiwala pilot WhatsApp feedback into GitHub issues |
