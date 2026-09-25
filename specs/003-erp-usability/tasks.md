# Tasks: Usabilidade e Responsividade do ERP

**Input**: Design documents from `/specs/003-erp-usability/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

## Phase 1: Setup

**Purpose**: Map the existing administrative components and preserve their behavior.

- [X] T001 Review responsive breakpoints and existing states in src/pages/Admin.tsx, src/components/FinancialAnalysis.tsx, src/components/AdminProducts.tsx, and src/index.css.
- [X] T002 Add regression assertions for responsive administrative rendering in tests/admin-commerce.test.mjs.

---

## Phase 2: User Story 1 - Operar o ERP em qualquer tela (Priority: P1) 🎯 MVP

**Goal**: Make the existing navigation, header and order presentation usable on mobile, tablet and desktop.

**Independent Test**: At 360 px, 768 px and 1440 px, navigate to every section and inspect an order without overlap, clipping or an unreadable compressed table.

- [X] T003 [US1] Refine the existing shell, desktop sidebar and mobile navigation in src/pages/Admin.tsx without replacing components.
- [X] T004 [US1] Add a mobile-first order presentation that reuses the existing order data and actions in src/pages/Admin.tsx.
- [X] T005 [US1] Improve responsive spacing, overflow and touch targets using existing utilities in src/pages/Admin.tsx and src/index.css.
- [X] T006 [US1] Verify navigation, order details, WhatsApp and refresh actions at the specified viewport widths.

---

## Phase 3: User Story 2 - Encontrar e executar ações com clareza (Priority: P1)

**Goal**: Improve visual hierarchy and action feedback in the current operational flows.

**Independent Test**: Search/filter orders and import, edit or delete a financial record while observing clear controls and state feedback.

- [X] T007 [US2] Group the existing search, status filter, refresh and contextual actions into responsive action areas in src/pages/Admin.tsx.
- [X] T008 [US2] Clarify loading, empty, error, success and disabled states in src/pages/Admin.tsx and src/components/FinancialAnalysis.tsx.
- [X] T009 [US2] Refine financial and product form layout for narrow screens in src/components/FinancialAnalysis.tsx and src/components/AdminProducts.tsx.
- [X] T010 [US2] Verify existing order, financial and product actions continue using the same endpoints and data.

---

## Phase 4: User Story 3 - Manter consistência visual e acessibilidade (Priority: P2)

**Goal**: Apply a consistent visual system and accessible controls across the existing ERP components.

**Independent Test**: Traverse primary actions with keyboard and verify visible focus, labels, contrast and usable touch targets.

- [X] T011 [US3] Apply consistent focus, hover, disabled and contrast treatment to existing administrative controls in src/pages/Admin.tsx and src/index.css.
- [X] T012 [US3] Review accessible labels, headings and responsive content order in src/pages/Admin.tsx, src/components/FinancialAnalysis.tsx and src/components/AdminProducts.tsx.
- [X] T013 [US3] Perform keyboard and mobile viewport validation following specs/003-erp-usability/quickstart.md.

---

## Phase 5: Polish & Validation

- [X] T014 Run npm test, npm run lint and npm run build; fix only regressions caused by this feature.
- [X] T015 Verify all requirements in specs/003-erp-usability/spec.md and mark completed tasks in specs/003-erp-usability/tasks.md.

## Dependencies & Execution Order

- T001 and T002 precede UI changes.
- T003 through T006 form the responsive MVP.
- T007 through T010 build on the responsive shell.
- T011 through T013 refine the completed flows.
- T014 and T015 finish after all implementation work.

## Implementation Strategy

1. Improve the existing `Admin` shell and mobile order experience first.
2. Improve operational feedback and responsive forms in existing feature components.
3. Apply accessibility refinements and validate all current business flows.
