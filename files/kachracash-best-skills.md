# -Best Skills by Field — KachraCash Reference Guide

One best skill per category, picked for KachraCash's specific stack:
Next.js 14 + Convex + Clerk (OTP) + Razorpay + Google Maps + Three.js.
3-sided marketplace. India-first. Real-time bidding. Mobile-first PWA.

---

## 1. 🏛️ Architecture

**Best Skill:** `event-sourcing-architect`

> Expert in event sourcing, CQRS, and event-driven architecture. Masters event store design, projection building, saga orchestration, and eventual consistency.

**Why it's the best:** KachraCash's entire value is in the real-time bidding flow — listing created → bids placed → counter-bid → acceptance → payment → pickup confirmation. Every state change is an event. This skill helps you design that chain so it's reliable, auditable, and doesn't break when two kabadiwalas bid at the same second.

**Your Prompt:**

```
Use the event-sourcing-architect skill to design the event flow for
KachraCash's bidding system.

The chain is:
Citizen posts listing → Kabadiwala places bid → Citizen views/counter-bids
→ Kabadiwala adjusts → Citizen accepts → Listing locks, other bids expire
→ Razorpay payment triggered → Pickup confirmed by both → Wallet credited

Stack: Next.js 14, Convex (real-time DB + backend, authentication), Razorpay.

Design this as an event-driven flow:
1. What are the distinct state transitions (events) in this chain?
2. How do we handle the race condition when two kabadiwalas bid simultaneously?
3. How do we ensure the wallet credit only fires once even if the
   pickup-confirmed event is received twice?
4. What does the Convex schema need to look like to support this reliably?
```

---

## 2. 💼 Business

**Best Skill:** `market-sizing-analysis`

> Use when calculating TAM, determining SAM, estimating SOM, or sizing market opportunity with structured frameworks.

**Why it's the best:** KachraCash is going after India's informal recycling economy — a massive but hard-to-quantify market. This skill helps you build defensible numbers using the kabadiwala population, scrap transaction volumes, and city-by-city pilot data from the research report.

**Your Prompt:**

```
Use the market-sizing-analysis skill to build a defensible market sizing
model for KachraCash.

Known data points from research:
- India generates 170,000 metric tonnes of municipal solid waste daily
- The Kabadiwala app: 20,000+ users across 5 cities
- ExtraCarbon: 41,000 users across 9 cities
- Estimated 1.5 million kabadiwalas operate across India
- Average scrap transaction value: ₹200/pickup
- Pilot cities: Pune, Bengaluru, Indore, Hyderabad

Calculate:
1. TAM — full India informal recycling economy addressable by a
   digital marketplace
2. SAM — urban households in 4 pilot cities with smartphone access
   and scrap to sell
3. SOM — realistic Year 1 capture with 20–50 kabadiwalas onboarded
   in one zone per city

Show your assumptions clearly so they can be challenged and updated.
```

---

## 3. 🤖 Data & AI

**Best Skill:** `autonomous-agents`

> Covers AI systems that independently decompose goals, plan actions, execute tools, and self-correct. Masters agent memory, tool use, and orchestration patterns.

**Why it's the best:** KachraCash's AI stretch goal — Gemini Flash for waste photo recognition — is the foundation for a future agentic layer. This skill helps you architect the AI image recognition feature in a way that can expand into category suggestion, price estimation, and pickup routing without a full rebuild.

**Your Prompt:**

```
Use the autonomous-agents skill to design the AI waste recognition feature
for KachraCash.

Current plan (from TDD):
1. Citizen uploads photo → stored in Convex Storage
2. Convex returns public URL
3. Next.js Server Action calls Gemini Flash
4. Prompt: "Identify the primary waste material. Return strictly one word:
   Plastic, Metal, Paper, or E-Waste."
5. Response auto-fills the category dropdown

Help me:
1. Design this as a proper agent action (not just a one-off API call) so
   it can be extended later to estimate weight, suggest price ranges,
   and flag e-waste for special handling
2. Handle the failure cases — what if Gemini returns something unexpected,
   or the image is too blurry to classify?
3. Keep the UX fast — the citizen shouldn't wait more than 2 seconds for
   the auto-categorization to appear
4. Show the Next.js Server Action + Convex mutation code
```

---

## 4. 💻 Development

**Best Skill:** `nestjs-expert`

> Nest.js framework expert specializing in module architecture, dependency injection, middleware, guards, interceptors, and TypeORM/Mongoose integration.

**Best fit for KachraCash:** `async-python-patterns` doesn't apply. Better pick: **`react-native-architecture`**

> Build production React Native apps with Expo, navigation, native modules, offline sync, and cross-platform patterns.

**Why it's the best:** KachraCash is mobile-first PWA — designed for Android Chrome minimum, with most users on 5-inch screens. This skill covers the exact patterns needed: navigation between citizen/kabadiwala dashboards, offline handling when a kabadiwala is in a low-connectivity area, and cross-platform UI consistency.

**Your Prompt:**

```
Use the react-native-architecture skill to help design the mobile-first
PWA architecture for KachraCash.

Context:
- Stack: Next.js 14 App Router + Tailwind CSS
- Target: Android Chrome minimum, mobile-first design
- Two distinct user flows: Citizen dashboard and Kabadiwala dashboard
- Must handle intermittent connectivity (kabadiwalas are often moving)

Help me design:
1. Navigation architecture — how to separate Citizen and Kabadiwala
   route groups cleanly (already started with app/(dashboard)/citizen/
   and app/(dashboard)/kabadiwala/)
2. Offline handling — what happens when a kabadiwala places a bid
   while their connection drops? How does Convex handle this?
3. PWA manifest and service worker setup for "add to home screen" UX
4. Image upload flow — citizen photo upload should work on slow
   connections without the form losing state if the upload takes 10+ seconds
```

---

## 5. 🌐 General

**Best Skill:** `i18n-localization`

> Internationalization and localization patterns. Detecting hardcoded strings, managing translations, locale files, RTL support.

**Why it's the best:** KachraCash pilots in Pune, Bengaluru, Indore, and Hyderabad — that's Marathi, Kannada, Hindi, and Telugu speaker populations. Kabadiwalas specifically may not be English-comfortable. This skill is the difference between an app that works and an app that actually gets adopted in these cities.

**Your Prompt:**

```
Use the i18n-localization skill to design a localization strategy for
KachraCash.

Context:
- Stack: Next.js 14 App Router
- Pilot cities and their primary languages:
  - Pune → Marathi + Hindi
  - Bengaluru → Kannada + Hindi
  - Indore → Hindi
  - Hyderabad → Telugu + Hindi

- Two very different user types:
  - Citizens: likely smartphone-comfortable, may prefer English or Hindi
  - Kabadiwalas: likely prefer their regional language, less tech-savvy

Help me:
1. Set up next-intl (or equivalent) for Next.js App Router
2. Identify which strings are highest priority to translate first
   (hint: anything a kabadiwala sees before they place their first bid)
3. Design the language selector UX — where does it live, how does it
   persist per user account vs device?
4. Flag any UI elements that might break with longer translated strings
   (e.g., button labels, map callouts)
```

---

## 6. ⚙️ Infrastructure

**Best Skill:** `aws-serverless`

> Specialized skill for building production-ready serverless applications. Covers Lambda, API Gateway, DynamoDB, SQS/SNS event-driven patterns.

**Best fit for KachraCash:** **`inngest`**

> Expert for serverless-first background jobs, event-driven workflows, and durable execution without managing queues or workers.

**Why it's the best:** KachraCash has several deferred operations that can't fail silently: UPI payout after pickup confirmation, WhatsApp notification on bid update, wallet credit after payment. Inngest gives you durable background jobs that retry on failure — critical for payments in India where network reliability varies.

**Your Prompt:**

```
Use the inngest skill to design the background job architecture for
KachraCash's post-acceptance flow.

After a citizen accepts a bid, these things must happen reliably:
1. Lock the listing (set status to "negotiating")
2. Expire all other open bids on that listing
3. Trigger Razorpay payment initiation
4. On payment success → credit citizen's wallet
5. Send WhatsApp notification to both citizen and kabadiwala
6. Log the completed transaction to Convex

Stack: Next.js 14, Convex (primary DB), Razorpay webhooks, WhatsApp
via Interakt/MSG91.

Design these as Inngest functions so:
- Each step retries independently if it fails (e.g., Razorpay timeout)
- The wallet is never double-credited
- If WhatsApp notification fails, the payment still goes through
- All steps are visible in the Inngest dashboard for debugging

Show me the Inngest function code for this flow.
```

---

## 7. 🔒 Security

**Best Skill:** `auth-implementation-patterns`

> Masters authentication and authorization patterns including JWT, OAuth2, session management, and RBAC to build secure, scalable access control systems.

**Why it's the best:** KachraCash has three distinct user roles (Citizen, Kabadiwala, Recycler) with completely different permissions — a kabadiwala should never be able to modify a listing, a citizen should never be able to access the kabadiwala map view. Plus, Clerk OTP (phone-based) auth needs proper role assignment post-signup. Getting this wrong means one user type can accidentally (or deliberately) access another's data.

**Your Prompt:**

```
Use the auth-implementation-patterns skill to design the authentication
and authorization system for KachraCash.

Stack: Clerk (OTP phone login) + Convex + Next.js 14 App Router.

Three user roles with completely different permissions:
- Citizen: can create listings, view/counter bids on own listings,
  confirm pickup, withdraw from wallet
- Kabadiwala: can view all nearby active listings on map, place/update
  bids, mark pickup as complete — CANNOT modify any listing they don't own
- Recycler: B2B portal only — views bulk material availability (Phase 2)
- Admin: full access (internal only)

Help me design:
1. Role assignment flow — when a new user signs up via Clerk OTP,
   how do they select their role? How is that role stored and verified?
2. Convex query authorization — how do Convex queries enforce that a
   kabadiwala can only read listings, never write them?
3. Next.js middleware — how do we redirect users to the correct
   dashboard based on role after login?
4. Prevent a kabadiwala from accepting their own bid (if they somehow
   had a citizen account too)
```

---

## 8. 🧪 Testing

**Best Skill:** `playwright-skill`

> Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts. Test pages, fill forms, take screenshots, check responses.

**Why it's the best:** KachraCash's end-to-end flow is the MVP Definition of Done — "a citizen can list scrap, receive bids, negotiate, confirm pickup, and get paid without any manual intervention." Playwright lets you automate that entire journey as a test, so you can verify it works before every launch and after every change.

**Your Prompt:**

```
Use the playwright-skill to write end-to-end tests for KachraCash's
core marketplace flow.

The MVP Definition of Done requires this full journey to work:
1. Citizen signs up via OTP phone login (Clerk)
2. Citizen creates a listing: uploads photo, selects "Plastic",
   enters "Approx 5kg", submits
3. Listing appears on Kabadiwala's map view within 60 seconds
4. Kabadiwala (second browser session) places a bid of ₹150
5. Citizen sees the bid in real-time (Convex reactivity — no refresh)
6. Citizen counter-bids ₹180
7. Kabadiwala accepts ₹180
8. Listing locks — other bids expire
9. Payment flow triggers (Razorpay sandbox)
10. Citizen wallet shows ₹180 credited

Write Playwright tests for:
- The citizen listing creation flow (steps 1–2)
- The real-time bid update (step 5 — open two browser contexts,
  verify update appears without refresh)
- The wallet credit after payment (step 10)

Use Razorpay sandbox mode. Flag any steps that require manual
verification (e.g., actual UPI payout).
```

---

## 9. 🔄 Workflow

**Best Skill:** `zapier-make-patterns`

> No-code automation for workflow building. Zapier and Make let non-developers automate business processes including notifications, data sync, and multi-step triggers.

**Why it's the best:** KachraCash needs WhatsApp notifications (bid updates, pickup confirmation) and potentially SMS OTP fallback — all wired through Make.com (Integromat) as specified in the research report. This skill covers exactly that without needing to build a custom notification backend.

**Your Prompt:**

```
Use the zapier-make-patterns skill to design the notification workflow
for KachraCash using Make.com.

Required notifications (from PRD):
1. When a kabadiwala places a bid → WhatsApp message to citizen:
   "₹[amount] bid received for your [category] scrap! View and respond: [link]"
2. When a citizen counter-bids → WhatsApp to kabadiwala:
   "The citizen has countered with ₹[amount]. Update your bid: [link]"
3. When a bid is accepted → WhatsApp to both parties:
   "Deal confirmed! ₹[amount] for [category] scrap. Pickup details: [link]"
4. When pickup is confirmed by kabadiwala → WhatsApp to citizen:
   "Your pickup is complete! ₹[amount] has been added to your wallet."

Stack: Make.com, Convex webhooks, Interakt (WhatsApp Business API),
Next.js 14.

Design the Make.com scenarios for each notification, including:
- How to trigger from a Convex database change (webhook setup)
- The WhatsApp message templates (must comply with WhatsApp Business
  template approval requirements)
- Error handling if WhatsApp delivery fails (retry? fallback to SMS?)
```

---

## Quick Reference Table

| # | Field          | Best Skill                       | When to Use                                      |
| - | -------------- | -------------------------------- | ------------------------------------------------ |
| 1 | Architecture   | `event-sourcing-architect`     | Designing the bidding state machine reliably     |
| 2 | Business       | `market-sizing-analysis`       | TAM/SAM/SOM for India's recycling market         |
| 3 | Data & AI      | `autonomous-agents`            | Gemini waste photo recognition + future AI layer |
| 4 | Development    | `react-native-architecture`    | Mobile-first PWA, offline handling, routing      |
| 5 | General        | `i18n-localization`            | Multi-language support for 4 pilot cities        |
| 6 | Infrastructure | `inngest`                      | Reliable post-payment background jobs            |
| 7 | Security       | `auth-implementation-patterns` | 3-role RBAC with Clerk OTP + Convex              |
| 8 | Testing        | `playwright-skill`             | End-to-end bidding flow automation               |
| 9 | Workflow       | `zapier-make-patterns`         | WhatsApp notifications via Make.com              |
