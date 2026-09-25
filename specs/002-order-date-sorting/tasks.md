# Tasks: Organização Administrativa e Pedidos por Data

**Input**: Design documents from `/specs/002-order-date-sorting/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/admin-orders.md, quickstart.md

**Tests**: HTTP integration tests are required because the specification requires a stable ordering guarantee.

## Phase 1: Setup

**Purpose**: Confirm the existing implementation surface; no new project structure or components are created.

- [X] T001 Review the existing administrative orders query and current test helpers in backend/server.js and tests/commerce-flow.test.mjs.

---

## Phase 2: User Story 1 - Consultar pedidos em ordem cronológica (Priority: P1) 🎯 MVP

**Goal**: Return the newest administrative orders first with deterministic ordering for equal timestamps.

**Independent Test**: Seed orders with different and equal creation times, call the authenticated existing orders endpoint, and assert `created_at DESC, id DESC`.

- [X] T002 [US1] Add an integration regression test for descending date ordering and equal-date tie breaking in tests/commerce-flow.test.mjs.
- [X] T003 [US1] Make the existing `/api/admin/orders` query deterministic with `created_at DESC, id DESC` in backend/server.js.
- [X] T004 [US1] Run the focused orders integration suite in tests/commerce-flow.test.mjs and verify the contract in specs/002-order-date-sorting/contracts/admin-orders.md.

---

## Phase 3: User Story 2 - Manter a organização durante a operação (Priority: P2)

**Goal**: Preserve date ordering after the existing search, status, and month filters.

**Independent Test**: Use each supported filter with more than one matching order and assert the returned results stay in chronological descending order.

- [X] T005 [US2] Extend the existing orders integration test to assert chronological ordering after search, status, and month filters in tests/commerce-flow.test.mjs.
- [X] T006 [US2] Run the filtered administrative orders scenarios in tests/commerce-flow.test.mjs.

---

## Phase 4: User Story 3 - Preservar o admin existente (Priority: P3)

**Goal**: Deliver the ordering guarantee without replacing any existing administrative UI component or flow.

**Independent Test**: Build the application and confirm `src/pages/Admin.tsx` still consumes the existing endpoint response directly.

- [X] T007 [US3] Verify that no component recreation is required and retain the existing order rendering in src/pages/Admin.tsx.

---

## Phase 5: Polish & Validation

**Purpose**: Validate the completed increment end-to-end.

- [X] T008 Run the full project check defined in package.json and record the result in specs/002-order-date-sorting/quickstart.md if the documented command needs correction.
- [X] T009 Verify all feature requirements and update completion markers in specs/002-order-date-sorting/tasks.md.

## Dependencies & Execution Order

- T001 precedes T002 and T003.
- T002 must be written before T003; the test is expected to fail without the tie-breaker.
- T003 precedes T004 through T009.
- T005 and T006 follow the User Story 1 endpoint change.
- T007 is a verification-only task and follows T003.
- T008 and T009 finish after all story tasks.

## Implementation Strategy

1. Establish an integration test that captures the ordering contract.
2. Make the minimal server-query change necessary to satisfy the contract.
3. Extend coverage for filters, then run the focused and full project validation.
4. Keep `Admin.tsx` and its existing components intact.
