# Technical Design Reference

## Database Schema (Convex)

**users**

- `clerkId`: String
- `role`: "citizen" | "kabadiwala"
- `walletBalance`: Number

**listings**

- `imageStorageId`: String (Convex Storage ID)
- `category`: "Plastic" | "Metal" | "Paper" | "E-Waste"
- `status`: "active" | "negotiating" | "completed"
- `location`: { lat, lng }
- `winningBidId`: Id (optional)

**bids**

- `listingId`: Id
- `bidderId`: Id
- `amount`: Number
- `status`: "open" | "accepted"

## AI Implementation (Gemini)

- Trigger: Image Upload.
- Action: Send image URL to Gemini Flash.
- Prompt: "Identify waste material. Return strictly one word: 'Plastic', 'Metal'..."
- Result: Auto-fill dropdown.
