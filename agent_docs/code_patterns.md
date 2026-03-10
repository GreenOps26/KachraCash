# Code Patterns — KachraCash

## Architecture Rules

### The Golden Rule
- **Routes/Pages** handle request/response and rendering ONLY
- **Convex functions** (`convex/*.ts`) handle ALL business logic and data access
- **No direct DB calls from route handlers** — always go through Convex

```
app/ (Next.js pages)     →    convex/ (business logic + DB)
components/ (UI only)    →    convex/ (mutations/queries)
app/api/ (webhooks only) →    Razorpay payment verification
```

---

## Project Structure

```
kachracash/
├── app/
│   ├── (auth)/              # Clerk sign-in/up pages
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (dashboard)/         # Protected routes (require login)
│   │   ├── citizen/
│   │   │   ├── page.tsx           # Citizen dashboard
│   │   │   ├── post-scrap/page.tsx
│   │   │   ├── my-bids/page.tsx
│   │   │   └── wallet/page.tsx
│   │   └── kabadiwala/
│   │       ├── page.tsx           # Map view
│   │       └── listing/[id]/page.tsx
│   ├── api/
│   │   └── razorpay/
│   │       └── webhook/route.ts   # Payment webhook
│   ├── layout.tsx
│   └── page.tsx                   # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── maps/                # Google Maps wrapper components
│   │   ├── ListingsMap.tsx
│   │   └── LocationPicker.tsx
│   └── three/               # 3D animation components
│       └── RecycleCoin.tsx
├── convex/
│   ├── auth.config.ts       # Clerk integration
│   ├── schema.ts            # Database definitions
│   ├── users.ts             # User CRUD
│   ├── listings.ts          # Listing CRUD + queries
│   └── bids.ts              # Bid logic + real-time queries
├── lib/
│   └── utils.ts             # cn() and other helpers
├── public/
├── .env.local
└── package.json
```

---

## Convex Schema Pattern

```typescript
// convex/schema.ts — Single source of truth for ALL data shapes
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    role: v.union(v.literal("citizen"), v.literal("kabadiwala"), v.literal("recycler")),
    phone: v.string(),
    displayName: v.string(),
    location: v.object({ lat: v.number(), lng: v.number() }),
    walletBalance: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  listings: defineTable({
    userId: v.id("users"),
    imageStorageId: v.string(),
    category: v.union(
      v.literal("Plastic"),
      v.literal("Metal"),
      v.literal("Paper"),
      v.literal("E-Waste"),
      v.literal("Mixed")
    ),
    weightDescription: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("negotiating"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    location: v.object({ lat: v.number(), lng: v.number() }),
    winningBidId: v.optional(v.id("bids")),
  }).index("by_status", ["status"]).index("by_user", ["userId"]),

  bids: defineTable({
    listingId: v.id("listings"),
    bidderId: v.id("users"),
    amount: v.number(),
    status: v.union(v.literal("open"), v.literal("accepted"), v.literal("rejected")),
  }).index("by_listing", ["listingId"]).index("by_bidder", ["bidderId"]),
});
```

---

## Convex Mutation Pattern

```typescript
// convex/listings.ts — Business logic stays HERE, not in components
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query: reactive (auto-updates UI)
export const getActiveListings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("listings")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
  },
});

// Mutation: write to DB
export const createListing = mutation({
  args: {
    imageStorageId: v.string(),
    category: v.string(),
    weightDescription: v.string(),
    location: v.object({ lat: v.number(), lng: v.number() }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("listings", {
      userId: user._id,
      imageStorageId: args.imageStorageId,
      category: args.category as "Plastic" | "Metal" | "Paper" | "E-Waste" | "Mixed",
      weightDescription: args.weightDescription,
      status: "active",
      location: args.location,
    });
  },
});
```

---

## React Component Pattern

```tsx
// components/BidCard.tsx — UI only, no business logic
interface BidCardProps {
  amount: number;
  bidderId: string;
  status: "open" | "accepted" | "rejected";
  onAccept: () => void;
  onCounter: (newAmount: number) => void;
}

export function BidCard({ amount, status, onAccept, onCounter }: BidCardProps) {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <span className="text-green-600 font-bold text-xl">₹{amount}</span>
      {status === "open" && (
        <div className="flex gap-2">
          <button
            onClick={onAccept}
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => onCounter(amount + 10)}
            className="border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
          >
            Counter
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## Type Safety Rules

```typescript
// ❌ FORBIDDEN — never do this
const processData = (data: any) => { ... }

// ✅ CORRECT — always type everything
import type { Id } from "../convex/_generated/dataModel";

interface ListingData {
  id: Id<"listings">;
  category: "Plastic" | "Metal" | "Paper" | "E-Waste" | "Mixed";
  status: "active" | "negotiating" | "completed" | "cancelled";
  location: { lat: number; lng: number };
}

// For unknown external data, use unknown + type guard
function isValidCategory(value: unknown): value is ListingData["category"] {
  return typeof value === "string" &&
    ["Plastic", "Metal", "Paper", "E-Waste", "Mixed"].includes(value);
}
```

---

## Mobile-First Tailwind Pattern

```tsx
// Always design for mobile first, then scale up
// Base styles = mobile, md: = tablet, lg: = desktop

<div className="
  grid grid-cols-1 gap-3        {/* Mobile: single column */}
  md:grid-cols-2                 {/* Tablet: 2 columns */}
  lg:grid-cols-3                 {/* Desktop: 3 columns */}
">
```
