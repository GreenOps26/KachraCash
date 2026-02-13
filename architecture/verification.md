# Architecture SOP: Verification & Settlement

## Goal
Ensure physical exchange of waste and funds without fraud ("Zero-Inference").

## protocols
1.  **The Handshake**:
    - Recycler arrives at location.
    - Waste is weighed. Final weight/price agreed.
2.  **Digital Confirmation**:
    - **Step A**: Recycler taps "Confirm Pickup" in App.
        - Updates `transactions.recycler_confirmed = TRUE`.
        - Updates `transactions.final_weight` & `final_amount`.
    - **Step B**: User sees "Recycler Confirmed $X".
    - **Step C**: User taps "Release Waste" (Confirm).
        - Updates `transactions.user_confirmed = TRUE`.
3.  **Completion**:
    - Database Trigger watches for `(user_confirmed=TRUE AND recycler_confirmed=TRUE)`.
    - **Action**:
        - Sets `transactions.completed_at = NOW()`.
        - Sets `listings.status = 'COMPLETED'`.
        - Updates `profile` stats (Total Waste Recycled).

## failure_modes
- **Dispute**: One party refuses to confirm.
    - **Resolution**: Transaction stuck in 'IN_PROGRESS'. Manual Support intervention required (Flag button).
    - **Timeout**: If not confirmed in 24h, auto-cancel? -> *Decision: No auto-cancel, flag for review.*
