# Architecture SOP: Authentication & Roles

## Goal
Securely manage Users (Creators) and Recyclers (Collectors) with strict Role-Based Access Control (RBAC).

## roles
- `user`: Can post listings, view own listings, accept bids.
- `recycler`: Can view all open listings, bid on listings, complete pickups.

## onboarding_flow
1.  **Sign Up**: User provides Email/Password or Magic Link.
2.  **Profile Creation**: Triggered via Database Trigger on `auth.users` insert.
    - Default `role` = 'user'.
    - `credits_balance` = 0.
3.  **Role Selection**: User can opt-in to become a 'recycler' via UI (updates `profiles.role`).

## security_rules
1.  **RLS (Row Level Security)** is the primary enforcement mechanism.
2.  **Profiles**:
    - `SELECT`: Public for `full_name`, `avatar_url`, `role`. Private for `email`, `phone`.
    - `UPDATE`: Users can only update their own profile.
3.  **Auth State**: handled by `@supabase/auth-helpers-nextjs`.

## edge_cases
- **Role Switching**: If a `recycler` switches back to `user`, what happens to pending bids? -> *Decision: Prevent role switch if active bids exist.*
