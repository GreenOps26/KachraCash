# Project Plan: KachraCash

## Phase 1: Blueprint (Current)
- [x] Discovery Questions Answered
- [x] Data Schema Defined (`gemini.md`)
- [x] Research & Constraints Identified

## Phase 2: Link (Connectivity)
- [ ] **Verify Credentials**: Check `.env` for Supabase, Mapbox, Roboflow, RevenueCat.
- [ ] **Handshake Scripts**:
    - [ ] `tools/verify_supabase.py`
    - [ ] `tools/verify_mapbox.py`
    - [ ] `tools/verify_roboflow.py`

## Phase 3: Architect (The Build)
### Layer 1: SOPs
- [ ] `architecture/auth_sop.md`: User/Recycler Registration & RBAC.
- [ ] `architecture/market_sop.md`: Listing lifecycle (Post -> Bid -> Accept).
- [ ] `architecture/verification_sop.md`: The "Zero-Inference" completion logic.

### Layer 3: Tools & Setup
- [ ] **Database Migration**: Create tables in Supabase (`profiles`, `listings`, `bids`, `transactions`).
- [ ] **Row Level Security**: Apply RLS policies from `gemini.md`.
- [ ] **Storage Buckets**: Create `waste-images` bucket.

## Phase 4: Stylize (Frontend)
- [ ] **Scaffold**: Next.js 14 + Tailwind + Shadcn/UI.
- [ ] **Auth Pages**: Login/Register (Magic Link or OTP).
- [ ] **Dashboard**:
    - User: "My Listings", "Post Waste".
    - Recycler: "Job Board" (Mapbox), "My Bids".
- [ ] **Real-time**: Subscribe to `bids` and `listings` changes.

## Phase 5: Trigger (Launch)
- [ ] **Deployment**: Vercel (Frontend) + Supabase (Backend).
- [ ] **CI/CD**: GitHub Actions (optional).
