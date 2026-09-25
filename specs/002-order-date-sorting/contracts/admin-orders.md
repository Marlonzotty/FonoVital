# Administrative Orders Contract

## `GET /api/admin/orders`

Returns the existing administrative order list for an authenticated administrator.

### Existing query inputs

| Input | Meaning |
|---|---|
| `search` | Optional text match across existing supported order fields. |
| `status` | Optional existing order status filter. |
| `month` | Optional month filter in `YYYY-MM` format. |

### Ordering guarantee

The response is an array of existing order objects ordered as follows:

1. `created_at` descending (newest first).
2. `id` descending when two orders share the same `created_at`.

The guarantee applies after all supported filters are applied. The response fields and authentication behavior remain unchanged.

### Error behavior

Existing authorization and validation behavior is preserved: unauthenticated requests are rejected; an invalid month value produces the existing validation error; unavailable storage returns the existing unavailable-service error.
