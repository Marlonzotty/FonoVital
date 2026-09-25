# Data Model: Organização Administrativa e Pedidos por Data

## Existing entity: Order (`orders`)

| Field | Purpose in this feature | Validation / rule |
|---|---|---|
| `id` | Stable secondary ordering key | Numeric identifier; descending only when dates tie. |
| `created_at` | Primary ordering key | Non-null creation timestamp; results are newest first. |
| `status` | Existing filter input | Does not change ordering. |
| `customer`, `product`, payment references | Existing search and display data | Preserved without schema or shape changes. |

## Relationships and transitions

No entities, relationships, state transitions, or migrations are introduced. The feature only defines how existing `Order` records are sequenced when listed for an authenticated administrator.
