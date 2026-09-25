# Tasks: Refinamento Lógico e Visual do ERP

> **Pausado em 2026-09-24**: Retomar pela Fase 3. A separação entre pagamento Mercado Pago e operação já foi iniciada; ainda faltam o acompanhamento operacional dos lançamentos WhatsApp, o refinamento visual final e a validação completa.

## Phase 1: Mapeamento e proteção

- [ ] T001 Mapear estados, rótulos e ações atuais em src/pages/Admin.tsx, src/components/FinancialAnalysis.tsx e backend/server.js.
- [ ] T002 Criar regressões que protejam checkout, webhook e aprovação Mercado Pago em tests/commerce-flow.test.mjs.

## Phase 2: User Story 1 - Estado claro de venda (P1)

- [ ] T003 [US1] Organizar o detalhe existente em blocos de Pagamento, Operação, Entrega e Cliente em src/pages/Admin.tsx.
- [ ] T004 [US1] Diferenciar visualmente status Mercado Pago e status operacional sem alterar campos de pagamento em src/pages/Admin.tsx.
- [ ] T005 [US1] Validar transições operacionais compatíveis e confirmação de cancelamento em backend/server.js e src/pages/Admin.tsx.

## Phase 3: User Story 2 - Ações intuitivas (P1)

- [ ] T006 [US2] Padronizar rótulos, ações primárias, estados de feedback e ações indisponíveis em src/pages/Admin.tsx.
- [ ] T007 [US2] Aplicar o mesmo padrão de cliente para Site e WhatsApp, preservando origem como selo, em src/components/FinancialAnalysis.tsx.
- [ ] T008 [US2] Adicionar acompanhamento operacional compatível aos lançamentos manuais sem confundir com pagamento Mercado Pago em backend/server.js e src/components/FinancialAnalysis.tsx.

## Phase 4: User Story 3 - Contexto e responsividade (P2)

- [ ] T009 [US3] Refinar cartões, tabela e detalhes para celular, tablet e desktop em src/pages/Admin.tsx e src/index.css.
- [ ] T010 [US3] Verificar foco, contraste, toque e ordem de conteúdo em src/pages/Admin.tsx, src/components/FinancialAnalysis.tsx e src/components/AdminProducts.tsx.

## Phase 5: Validação

- [ ] T011 Executar npm test, npm run lint e npm run build.
- [ ] T012 Validar manualmente aprovação Mercado Pago, venda WhatsApp, transições operacionais e rastreio; marcar tarefas concluídas.

## Dependencies

- T001 e T002 precedem toda alteração de estado.
- T003–T005 formam o MVP de pedido lógico.
- T006–T008 dependem da separação de pagamento e operação.
- T009–T012 finalizam responsividade e regressão.
