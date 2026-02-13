# Architecture SOP: Market Mechanics

## Goal
Manage the lifecycle of a waste listing from creation to bid acceptance.

## listing_lifecycle
1.  **Draft/Creation**:
    - User captures photo.
    - **Tool**: Roboflow API classifies waste.
    - User confirms details (weight, location).
    - **State**: `status = 'OPEN'`.
2.  **Bidding**:
    - Recyclers view 'OPEN' listings on Map.
    - Recycler places Metadata: `amount`.
    - **Constraint**: `recycler.credits_balance >= BID_FEE`.
    - **State**: Listing remains 'OPEN'. Bid is created with `status='PENDING'`.
3.  **Acceptance**:
    - User reviews Bids.
    - User selects one Bid.
    - **Transaction**:
        - Bid `status` -> 'ACCEPTED'.
        - Other Bids -> 'REJECTED' (or kept as backup? -> *Decision: REJECTED*).
        - Listing `status` -> 'IN_PROGRESS'.
        - Contact details revealed to both parties.

## technical_logic
- **Concurrency**: PostgreSQL Row Locking not strictly needed due to single-accepter model, but RLS prevents race conditions on "Accept".
- **Notifications**: Realtime subscription on `bids` table notifies User of new bids.
