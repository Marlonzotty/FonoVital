# Implementation Plan: Organização Administrativa e Pedidos por Data

**Branch**: `002-order-date-sorting` | **Date**: 2026-09-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-order-date-sorting/spec.md`

**Note**: This template is filled in by the `$speckit-plan` command; its definition describes the execution workflow.

## Summary

Garantir que a lista administrativa de pedidos apresente pedidos mais recentes primeiro em todas as combinações de busca, status e mês. A evolução reforça o contrato já exposto por `GET /api/admin/orders`, usando a data de criação como chave primária e o identificador do pedido como desempate estável. A página administrativa e seus componentes atuais serão preservados; a mudança será coberta por testes de integração do fluxo administrativo.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.8 (frontend); JavaScript ES modules (backend)

**Primary Dependencies**: React 19, React Router 7, Vite 6; Express 5; PostgreSQL driver used by the backend

**Storage**: PostgreSQL; `orders.created_at` is a non-null timestamp and has a descending index

**Testing**: Node.js built-in test runner (`node --test tests`); end-to-end HTTP coverage in `tests/commerce-flow.test.mjs`

**Target Platform**: Web application, served by Vite frontend and Node.js backend

**Project Type**: Web application with React frontend and Express API

**Performance Goals**: The administrative request remains bounded to 500 rows and uses the existing date index; order must be correct for every returned row.

**Constraints**: Preserve authentication, filters, search, month filtering, current admin UI components, and existing route response shape. Do not recreate components.

**Scale/Scope**: One existing endpoint, its regression tests, and the existing `src/pages/Admin.tsx` consumption path. No schema migration or new screen is required.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The current constitution contains only unfilled template placeholders and therefore defines no enforceable project-specific gates. The repository instruction to preserve existing components is treated as a mandatory constraint. **Result: PASS** before and after design; no new component, dependency, service, data store, or migration is proposed.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file ($speckit-plan command output)
├── research.md          # Phase 0 output ($speckit-plan command)
├── data-model.md        # Phase 1 output ($speckit-plan command)
├── quickstart.md        # Phase 1 output ($speckit-plan command)
├── contracts/           # Phase 1 output ($speckit-plan command)
└── tasks.md             # Phase 2 output ($speckit-tasks command - NOT created by $speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
backend/
├── server.js                         # Existing Express administrative endpoint
└── migrations/                       # Existing database migrations (unchanged)

src/
└── pages/
    └── Admin.tsx                     # Existing admin list consumer (reused)

tests/
└── commerce-flow.test.mjs            # Existing HTTP integration suite to extend
```

**Structure Decision**: Keep the existing single-repository web application structure. The API remains the source of truth for ordering, and the existing admin page continues rendering its returned order.
