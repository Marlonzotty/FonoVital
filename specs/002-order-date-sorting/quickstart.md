# Quickstart: Validate Administrative Order Sorting

## Prerequisites

- Project dependencies installed.
- A test database configuration accepted by the existing test harness.

## Automated validation

Run the focused suite:

```powershell
node --test tests/commerce-flow.test.mjs
```

Then run the project verification suite:

```powershell
npm run check
```

Expected outcomes:

- The authenticated administrative orders endpoint returns orders in the sequence defined in the [administrative orders contract](./contracts/admin-orders.md).
- Search, status, and month filters retain that sequence.
- Existing commerce and admin flows remain passing.

## Manual validation

1. Start the existing frontend and backend services.
2. Sign in to the existing administrative page.
3. Confirm that the most recently created order is at the top of the orders table.
4. Apply an existing search, status, or month filter with multiple results and confirm the newest matching order remains first.
5. Open an existing order detail and use its available actions to confirm the current UI remains intact.
