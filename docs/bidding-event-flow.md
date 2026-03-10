# KachraCash Bidding Event Flow (Event-Sourced)

## Scope
Citizen posts listing -> kabadiwala bids/counters -> citizen accepts -> listing locks -> payment captured -> dual pickup confirmation -> wallet credited.

## Aggregate and Stream
- Aggregate: `Listing`
- Stream ID: `listing:<listingId>`
- Stream version: monotonically increasing `listings.streamVersion`

## Domain Events
1. `ListingPosted`
2. `BidPlaced`
3. `BidCountered`
4. `BidAdjusted`
5. `BidAccepted`
6. `ListingLocked`
7. `NonWinningBidExpired`
8. `PaymentOrderRequested`
9. `PaymentOrderCreated`
10. `PaymentCaptured`
11. `PickupConfirmedByCitizen`
12. `PickupConfirmedByKabadiwala`
13. `WalletCreditRequested`
14. `WalletCredited`
15. `ListingCompleted`

## Race and Idempotency Rules
- Concurrent bidding: both writes are serialized by Convex mutation OCC and committed in stream-version order.
- Single winner lock: `acceptBid` checks `listing.acceptedBidId` before lock. If set to another bid, reject.
- Client command dedupe: optional `commandId` goes into `commandInbox`.
- Webhook dedupe: `provider + providerEventId` goes into `webhookInbox`.
- Wallet credit dedupe: transaction `idempotencyKey = listing:<id>:bid:<id>:wallet-credit`.

## Projections
- `listings` is write-optimized projection with lock and lifecycle state.
- `bids` is current bid projection with `revision` and `expired` state.
- `dealStates` tracks settlement choreography:
  - payment status
  - both pickup confirmations
  - wallet credit status/key

## Operational Notes
- Events are immutable facts in `events` table.
- Rebuildable read models: `listings`, `bids`, `dealStates` can be recomputed from event stream if required.
- Money movement (`transactions`) is idempotent and tied to source event IDs.
