# Tech Stack & Tools — KachraCash

## Core Stack

| Layer | Choice | Version | Why |
|-------|--------|---------|-----|
| **Frontend** | Next.js (App Router) | 14 | Industry standard React, Vercel-native, SEO-friendly |
| **Styling** | Tailwind CSS | Latest | Rapid UI building, "clean & minimal" design vibe |
| **Database + Realtime** | Convex | Latest | DB + backend logic + real-time subscriptions in one |
| **Auth** | Clerk | Latest | Best-in-class OTP (phone) login — critical for kabadiwala adoption |
| **Payments** | Razorpay | Latest | India-native, handles UPI payouts for physical goods |
| **Hosting** | Vercel | — | Zero-config GitHub deploys |
| **3D Animations** | Three.js via `@react-three/fiber` | Latest | Premium loading screen + gamification visuals |
| **UI Components** | shadcn/ui | Latest | Accessible, composable Tailwind components |
| **Maps** | `@vis.gl/react-google-maps` | Latest | Google Maps integration for listing pins |

---

## Setup Commands

```bash
# 1. Initialize project
npx create-next-app@latest kachracash --typescript --tailwind --app --src-dir

# 2. Install Convex
npm install convex
npx convex dev   # starts local dev tunnel + generates types

# 3. Install Clerk
npm install @clerk/nextjs

# 4. Install Razorpay
npm install razorpay

# 5. Install Google Maps
npm install @vis.gl/react-google-maps

# 6. Install Three.js
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three

# 7. Install shadcn/ui
npx shadcn@latest init
```

---

## Environment Variables (`.env.local`)

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Razorpay
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...

# Gemini (Stretch Goal)
GEMINI_API_KEY=...
```

---

## Example: Convex Real-Time Query (The Magic)

```typescript
// convex/bids.ts — Backend query (auto-reactive)
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

```tsx
// app/listing/[id]/page.tsx — Frontend (updates INSTANTLY when bids change)
"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ListingPage({ params }: { params: { id: string } }) {
  const bids = useQuery(api.bids.getBidsForListing, { listingId: params.id });

  if (bids === undefined) return <div>Loading bids...</div>;

  return (
    <div className="space-y-2">
      <h2 className="font-bold text-lg">Live Bids</h2>
      {bids.map((bid) => (
        <div key={bid._id} className="bg-green-50 border border-green-200 p-4 rounded-xl">
          <span className="text-green-700 font-bold text-xl">₹{bid.amount}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## Example: Clerk OTP Auth Setup

```tsx
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/ConvexClientProvider.tsx
"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

---

## Naming Conventions

- **Files:** `kebab-case.tsx` for components, `camelCase.ts` for utilities
- **Components:** PascalCase (`BidCard`, `ListingMap`, `WalletBalance`)
- **Convex functions:** camelCase (`getBidsForListing`, `createListing`)
- **CSS classes:** Tailwind utility classes only — no custom CSS files
- **Types:** Always explicit — never use `any`, use `unknown` with guards
- **Env vars:** `NEXT_PUBLIC_` prefix for client-side, plain for server-only

---

## Error Handling Pattern

```typescript
// Always wrap Convex mutations in try/catch
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const placeBid = useMutation(api.bids.placeBid);

async function handleBid(amount: number) {
  try {
    await placeBid({ listingId, amount });
    // Show success toast
  } catch (error) {
    // Show error toast — never let errors fail silently
    console.error("Failed to place bid:", error);
  }
}
```
