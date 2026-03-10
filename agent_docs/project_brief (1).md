# Project Brief — KachraCash (Persistent Rules)

## Product Vision
A 3-sided marketplace that makes selling household scrap as easy as ordering food. Citizens get fair prices through competition; kabadiwalas get guaranteed pickup jobs. Money moves via UPI.

## Business Context
- **Pilot geography:** One zone in Pune or Bengaluru → expand to 4 cities by Month 12
- **Target launch:** End of 2026
- **Budget:** ~$0/month in dev, ~$25–45/month at scale
- **Commission model:** TBD (open question — see product_requirements.md)

## Quality Gates
Before any feature is considered "done":
1. `npm run lint` passes with 0 errors
2. `npm run type-check` passes with 0 errors
3. `npm run build` succeeds
4. Manual smoke test for that feature passes (see testing.md)
5. Real-time test passes if bids/listings were touched

## Coding Conventions

### TypeScript
- Strict mode ON (`"strict": true` in tsconfig)
- No `any` — use `unknown` with type guards
- All props interfaces explicitly typed
- Return types on all Convex functions

### File Structure
- Components: `components/[category]/ComponentName.tsx`
- Convex functions: `convex/[domain].ts` (listings, bids, users)
- One component per file
- Co-locate styles with components (Tailwind classes inline)

### Naming
- Components: PascalCase
- Functions/variables: camelCase
- Files: kebab-case
- Convex tables: lowercase plural (`listings`, `bids`, `users`)
- Database IDs: always type as `Id<"tableName">` not `string`

### Git Workflow
- Commit after each completed checklist item in AGENTS.md
- Commit message format: `feat: add [feature name]` or `fix: resolve [issue]`
- Never commit with failing lint/type checks

## Key Commands Quick Reference
```bash
npm run dev         # Start dev server
npx convex dev      # Start Convex (separate terminal, always needed)
npm run lint        # Check code
npm run type-check  # Check types
npm run build       # Test production build
```

## Third-Party Service Dashboards
- **Convex:** https://dashboard.convex.dev
- **Clerk:** https://dashboard.clerk.com
- **Razorpay:** https://dashboard.razorpay.com (use Test mode during dev)
- **Vercel:** https://vercel.com/dashboard
- **Google Cloud (Maps API):** https://console.cloud.google.com

## Update Cadence
Update this brief when:
- A new phase begins
- New dependencies are added
- Architectural decisions change
- New team members join
