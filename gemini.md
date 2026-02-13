# Project Constitution: KachraCash

> **STATUS**: Phase 2 - Link (Connectivity)
> **LAST UPDATED**: 2026-02-13

## 1. Discovery Answers (Immutable Constraints)

- **North Star**: Functional, real-time web marketplace for waste trading. "Waste-to-Wallet" transaction. Success = Post to Payout in one session.
- **Integrations**:
    - **Supabase**: Auth, DB, Realtime, Storage.
    - **Mapbox GL JS**: Job Board, Geolocation.
    - **Roboflow**: AI Waste Classification.
    - **RevenueCat**: Recycler Credits/Subscriptions.
    - **VerceL**: Hosting & Deployments.
    - **ThreeJS**: 3D Animations & Visual Flair.
- **Source of Truth**: Supabase PostgreSQL (State), Supabase Storage (Images).
- **Delivery Payload**: Production-ready GitHub Repo & Vercel Deployment URLs.
- **Behavioral Rules**:
    - **Strict Type Safety**: TypeScript everywhere.
    - **Mobile-First**: Responsive UI for field usage.
    - **Recycler Bid Gate**: Minimum credit balance required to bid.
    - **Zero-Inference Verification**: Dual confirmation (Recycler + User) for completion.

---

## 2. Data Schema (The "Law")

### 2.1. `profiles` (Supabase Auth Extended)
Links to `auth.users`.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | PK, References `auth.users.id` |
| `email` | `text` | User email |
| `role` | `enum` | `'user'` or `'recycler'` |
| `full_name` | `text` | Display name |
| `avatar_url` | `text` | Profile picture |
| `credits_balance` | `int` | Current purchasable credits (for Recyclers) |
| `created_at` | `timestamptz` | Account creation |

### 2.2. `listings` (The Waste)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `creator_id` | `uuid` | FK -> `profiles.id` |
| `image_url` | `text` | Supabase Storage URL |
| `ai_label` | `jsonb` | Roboflow output (e.g., `{"class": "plastic", "temp": 0.98}`) |
| `description` | `text` | User provided details |
| `est_weight` | `float` | Estimated weight in kg |
| `location` | `geography` | PostGIS Point (Lat/Lng) |
| `address_text` | `text` | Human readable address |
| `status` | `enum` | `'OPEN'`, `'BIDDED'`, `'IN_PROGRESS'`, `'COMPLETED'`, `'CANCELLED'` |
| `created_at` | `timestamptz` | |

### 2.3. `bids` (The Market)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `listing_id` | `uuid` | FK -> `listings.id` |
| `recycler_id` | `uuid` | FK -> `profiles.id` |
| `amount` | `decimal` | Bid amount in currency |
| `status` | `enum` | `'PENDING'`, `'ACCEPTED'`, `'REJECTED'` |
| `created_at` | `timestamptz` | |

### 2.4. `transactions` (The Settlement)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `listing_id` | `uuid` | FK -> `listings.id` |
| `recycler_id` | `uuid` | FK -> `profiles.id` |
| `user_id` | `uuid` | FK -> `profiles.id` |
| `final_amount` | `decimal` | Agreed final price |
| `final_weight` | `float` | Weigh-in at pickup |
| `user_confirmed` | `boolean` | Verification Step 1 |
| `recycler_confirmed` | `boolean` | Verification Step 2 |
| `completed_at` | `timestamptz` | Only set when both confirmed |

---

## 3. Behavioral Rules (Logic)

### 3.1. The "Bid Gate"
`IF recycler.credits_balance < MIN_BID_COST THEN create_bid() FAILS`

### 3.2. Access Policies (RLS)
- **Listings:** Publicly readable (Job Board). Writable only by Creator.
- **Bids:** Visible to Creator and Bidder.
- **Profiles:** Private except for public profile fields.

### 3.3. State Transitions
- **OPEN -> BIDDED**: Remains OPEN until User ACCEPTS a bid.
- **OPEN -> IN_PROGRESS**: User accepts a bid.
- **IN_PROGRESS -> COMPLETED**: Both `user_confirmed` and `recycler_confirmed` are TRUE.

---

## 4. Architectural Invariants

1.  **Framework**: Next.js 14+ (App Router).
2.  **Language**: TypeScript (Strict).
3.  **Styling**: TailwindCSS + Shadcn/UI (Mobile First).
4.  **State Management**: React Query + Supabase Realtime.
5.  **Visuals**: ThreeJS for high-impact animations.
