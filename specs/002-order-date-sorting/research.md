# Research: Organização Administrativa e Pedidos por Data

## Decision 1: Keep ordering authoritative in the administrative API

- **Decision**: Preserve ordering in `GET /api/admin/orders`, returning orders by `created_at` descending.
- **Rationale**: The endpoint is the common source for the existing admin page, filters, search, and month selection. Server-side ordering avoids differing browser behavior and ensures the response is ordered before rendering.
- **Alternatives considered**:
  - Sorting only in the browser: rejected because it duplicates business behavior in the UI and may diverge from paginated or filtered results.
  - Creating a separate sorting endpoint: rejected because the existing endpoint already serves this use case.

## Decision 2: Use the order identifier as a deterministic tie-breaker

- **Decision**: When `created_at` values are equal, order by `id` descending.
- **Rationale**: This makes equal-time results stable and places the most recently assigned record first without changing the response shape.
- **Alternatives considered**:
  - Relying on database natural order: rejected because it is not guaranteed.
  - Adding a new timestamp column: rejected because existing `created_at` meets the requirement.

## Decision 3: Add regression coverage at the HTTP boundary

- **Decision**: Extend the existing commerce flow tests to create orders with controlled dates and assert descending order, including equal timestamps and filtered results.
- **Rationale**: The user-facing behavior originates from the authenticated endpoint and this test suite already exercises it.
- **Alternatives considered**:
  - Snapshot-only UI test: rejected because it would not prove the API ordering contract.
  - Manual validation only: rejected because the ordering requirement can regress silently.
