```
# Technical Design Document: KachraCash MVP

| Project Info | Details |
| :--- | :--- |
| **App Name** | KachraCash |
| **Version** | 2.0 (Custom Stack Edition) |
| **Role** | Vibe-Coder (AI-Assisted Build) |
| **Date** | February 2026 |
| **Status** | Ready for Development |

---

## 1. Executive Summary

**KachraCash** is a 3-sided marketplace connecting **Citizens** (sellers) with **Kabadiwalas** (buyers) to monetize household waste.

**Core Goal:** Prove the end-to-end concept works: citizen lists scrap → kabadiwalas bid → deal closes → pickup happens → wallet credited.

**Technical Pivot:**
This design moves away from the original No-Code (Bubble.io) plan to a high-performance **Custom Stack** (Next.js + Convex). This ensures:
1.  **Real-time Bidding:** Instant updates when a Kabadiwala places a bid (critical for marketplace energy).
2.  **Scalability:** No platform lock-in; code is owned and version-controlled on GitHub.
3.  **Modern UX:** A Progressive Web App (PWA) experience that feels native on mobile.

---

## 2. Technology Stack

### Core Frameworks

| Component | Choice | Justification |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14** (App Router) | The industry standard for React. Fast, SEO-friendly, and Vercel-native. |
| **Styling** | **Tailwind CSS** | Rapid UI building. Essential for the "clean & minimal" vibe defined in the PRD. |
| **Database & Realtime** | **Convex** | **The MVP Powerhouse.** Handles the database, backend logic, AND real-time updates (replacing WebSockets). |
| **Authentication** | **Clerk** | Best-in-class for **OTP (Phone) login**, which is critical for Kabadiwala adoption. |
| **Payments** | **Razorpay** | **Essential for India.** Handles UPI payouts and split payments for physical goods (scrap). *Note: RevenueCat is incompatible with physical goods transactions.* |
| **Hosting** | **Vercel** | Zero-config deployment from GitHub. |
| **Animation** | **Three.js** | Via `@react-three/fiber` for premium 3D visuals (e.g., loading screens, gamification tokens). |
| **Version Control** | **GitHub** | For code safety, version history, and collaboration. |

---

## 3. System Architecture

Since we are using **Convex**, the architecture is "Serverless Real-time." We do not manage a separate backend server (Node/Express). Convex acts as the backend logic layer, database, and real-time engine.



**Data Flow:**
1.  **Citizen** snaps a photo → Uploads to **Convex Storage**.
2.  **Citizen** posts listing → Saves to `listings` table in **Convex**.
3.  **Kabadiwala** (listening via `useQuery`) → Instantly sees the new pin on their map.
4.  **Kabadiwala** places bid → Updates `bids` table via `mutation`.
5.  **Citizen** accepts → Triggers **Razorpay** payment flow via Next.js API route.

---

## 4. Database Schema (Convex)

### `users` table
* `_id`: Id (System generated)
* `clerkId`: String (Link to Clerk auth)
* `role`: String ("citizen" \| "kabadiwala" \| "recycler")
* `phone`: String (From Clerk)
* `displayName`: String
* `location`: Object `{ lat: Number, lng: Number }`
* `walletBalance`: Number (Current earnings)
* `creationTime`: Number

### `listings` table
* `_id`: Id
* `userId`: Id (Reference to `users`)
* `imageStorageId`: String (ID of photo in Convex storage)
* `category`: String ("Plastic", "Metal", "Paper", "E-Waste")
* `weightDescription`: String (e.g., "Approx 5kg")
* `status`: String ("active", "negotiating", "completed", "cancelled")
* `location`: Object `{ lat: Number, lng: Number }` (For map plotting)
* `winningBidId`: Id (Optional, link to `bids`)
* `creationTime`: Number

### `bids` table
* `_id`: Id
* `listingId`: Id (Reference to `listings`)
* `bidderId`: Id (Reference to `users`)
* `amount`: Number (e.g., 150)
* `status`: String ("open", "accepted", "rejected")
* `creationTime`: Number

---

## 5. Real-Time Logic (The "Secret Sauce")

We leverage Convex's reactivity to handle the **Kabadiwala Bidding System** without writing complex WebSocket code.

### Backend Function (`convex/bids.ts`)
```typescript
// This function runs automatically whenever data changes!
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getBidsForListing = query({
  args: { listingId: v.id("listings") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bids")
      .withIndex("by_listing", (q) => q.eq("listingId", args.listingId))
      .collect();
  },
});
```

### Frontend Implementation (`app/listing/[id]/page.tsx`)

**TypeScript**

```
// The UI updates instantly when a kabadiwala bids. No "refresh" needed.
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ListingPage({ params }) {
  const bids = useQuery(api.bids.getBidsForListing, { listingId: params.id });

  return (
    <div>
      <h2>Current Bids</h2>
      {bids?.map(bid => (
         <div key={bid._id} className="animate-pulse bg-green-50 p-4 rounded">
            New Bid: ₹{bid.amount}
         </div>
      ))}
    </div>
  );
}
```

---

## 6. Stretch Goal: AI Waste Recognition 🤖

**Tool:** Google Gemini Flash API (via Server Action).

**Implementation Strategy:**

1. **User uploads image** to Convex Storage.
2. **Convex** returns a public URL.
3. **Frontend** triggers a Next.js Server Action with the URL.
4. **Server Action** calls Gemini Flash:
   * **Prompt:** *"Identify the primary waste material in this image. Return strictly one word: 'Plastic', 'Metal', 'Paper', or 'E-Waste'."*
5. **Auto-Fill:** The response populates the "Category" dropdown on the frontend form.

---

## 7. Project Structure

**Bash**

```
kachra-cash/
├── app/
│   ├── (auth)/             # Clerk Sign-in/up pages
│   ├── (dashboard)/        # Protected routes
│   │   ├── citizen/        # Citizen view
│   │   └── kabadiwala/     # Kabadiwala view
│   ├── api/                # Next.js API routes (Razorpay webhooks)
│   ├── layout.tsx
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Shadcn/Tailwind components
│   ├── maps/               # Google Maps wrapper
│   └── three/              # 3D Animation components
├── convex/
│   ├── auth.config.ts      # Clerk integration
│   ├── schema.ts           # Database definitions
│   ├── listings.ts         # CRUD logic
│   └── bids.ts             # Real-time logic
├── lib/
│   └── utils.ts
├── public/
├── .env.local              # Keys for Clerk, Convex, Razorpay, Maps
└── package.json
```

---

## 8. Phase-by-Phase Build Plan

### Phase 1: The Skeleton (Week 1)

* [ ] Initialize Next.js + Tailwind + TypeScript.
* [ ] Initialize GitHub repository.
* [ ] Wrap app in `<ClerkProvider>` and `<ConvexProvider>`.
* [ ] Create Sign-In/Sign-Up pages with OTP support.
* [ ] Run `npx convex dev` to set up the database schema.
* [ ] **Visuals:** Install `@react-three/fiber` and create a rotating 3D "Recycle Coin" for the loading screen.

### Phase 2: The Citizen Loop (Week 2-3)

* [ ] **Upload:** Build the "Post Scrap" form using Convex file storage.
* [ ] **Listing:** Display "My Listings" grid on the dashboard.
* [ ] **Wallet:** Create a placeholder "Wallet" UI component to show balance.

### Phase 3: The Kabadiwala Loop (Week 4-5)

* [ ] **Map:** Integrate `react-google-maps`. Fetch all `active` listings from Convex and plot markers.
* [ ] **Bidding:** Create the "Place Bid" button. Connect it to the `bids` table in Convex.
* [ ] **Real-time:** Test the "Magic Update" (open two windows, bid in one, watch the other update instantly).

### Phase 4: Payments & Polish (Week 6)

* [ ] **Razorpay:** Add the "Pay Now" button (use Sandbox mode for testing).
* [ ] **AI Stretch:** Connect the Gemini API for auto-categorization.
* [ ] **Animations:** Add confetti animations (Three.js) when a pickup is confirmed.

---

## 9. Budget & Costs (MVP)

| **Service**          | **Tier** | **Est. Cost (Dev)**                                       | **Est. Cost (Live)**       |
| -------------------------- | -------------- | --------------------------------------------------------------- | -------------------------------- |
| **Next.js (Vercel)** | Hobby          | $0                        | $20/mo (Pro - optional)             |                                  |
| **Convex**           | Free Dev       | $0                        | $25/mo (Pro - needed for scale)     |                                  |
| **Clerk**            | Free           | $0                                                              | Free (<10k Monthly Active Users) |
| **Razorpay**         | Standard       | 2% per txn                                                      | 2% per txn                       |
| **Google Maps**      | Free Credit    | $0                        | $0 (covered by $200 monthly credit) |                                  |
| **Gemini Flash**     | Free Tier      | $0                                                              | Pay-per-token (negligible)       |

**Total Monthly Fixed Cost:** ~$0 (Dev) -> ~$25-45 (Scale).
