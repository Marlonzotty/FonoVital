# Implementation Plan: Refinamento Lógico do ERP

## Objetivo

Tornar o ERP mais coerente e intuitivo, preservando integralmente o contrato com Mercado Pago: checkout, webhook, referências, aprovação e histórico de pagamento não serão alterados.

## Princípios de decisão

1. **Pagamento não é entrega**: status Mercado Pago permanece fonte de verdade financeira; status operacional descreve somente atendimento, preparo e envio.
2. **Origem não muda o layout**: Site e WhatsApp usam o mesmo card de cliente; a origem aparece apenas como selo contextual.
3. **Ações devem explicar consequência**: cada botão indica o que altera e o que não altera.
4. **Uma fonte de verdade por domínio**: Mercado Pago para pagamento; pedido/lancamento para operação; rastreio para entrega.
5. **Evolução, não reconstrução**: reutilizar Admin, FinancialAnalysis e AdminProducts.
6. **Responsividade por prioridade**: em telas pequenas, mostrar primeiro estado, próxima ação e dados essenciais; detalhes permanecem acessíveis sem comprimir a interface.

## Fases

### 1. Auditoria de estados e termos

- Mapear todos os estados atuais de pagamento, pedido, financeiro, rastreio e produto.
- Definir um glossário único e substituir textos ambíguos.
- Identificar ações que hoje parecem alterar pagamento mas são somente operacionais.

### 2. Modelo mental do pedido

- Exibir blocos independentes no detalhe: Pagamento, Operação, Entrega e Cliente.
- Definir transições permitidas para Confirmado, Em preparo, Enviado e Cancelado operacionalmente.
- Adicionar confirmação para cancelamento e ações irreversíveis.

### 3. Financeiro coerente

- Unificar visualmente vendas do site e lançamentos WhatsApp.
- Preservar origem como selo e deixar explícito se o status financeiro é automático ou manual.
- Garantir acesso consistente aos dados do cliente e às ações compatíveis com cada origem.

### 4. Feedback e prevenção de erro

- Padronizar loading, vazio, erro, sucesso e indisponibilidade.
- Desabilitar ações incompatíveis e explicar o motivo.
- Manter atualização visual imediata após ações bem-sucedidas.

### 5. Refinamento visual estratégico e responsivo

- Usar uma hierarquia consistente: título e status no topo; ação primária destacada; ações secundárias agrupadas; detalhes em blocos progressivos.
- No desktop, manter navegação lateral e visão comparativa; no tablet, reorganizar controles em linhas fluidas; no celular, usar cartões operacionais em vez de tabelas comprimidas.
- Padronizar cartões, espaçamento, tipografia, cores de estado, áreas de toque e foco visível nos componentes existentes.
- Posicionar filtros e ações próximas ao conteúdo que afetam; manter cabeçalho e ações principais facilmente acessíveis.
- Exibir cronologia de pedido, pagamento e envio em blocos escaneáveis, sem introduzir novas dependências visuais.

### 6. Proteção da integração Mercado Pago

- Não modificar endpoints de checkout, webhook ou consulta de pagamento sem teste de regressão explícito.
- Executar fluxo de checkout, aprovação repetida, rejeição, cancelamento financeiro e webhook fora de ordem.
- Verificar que ações operacionais não escrevem nos campos de pagamento.

## Arquivos-alvo

- `src/pages/Admin.tsx`: detalhe do pedido, estados, ações e feedback.
- `src/components/FinancialAnalysis.tsx`: origem, cartões de cliente e ações compatíveis.
- `backend/server.js`: somente campos/endpoints operacionais isolados do Mercado Pago, quando necessários.
- `tests/commerce-flow.test.mjs`: proteção de checkout, webhook e pagamentos.
- `tests/admin-commerce.test.mjs`: regressão de interface e termos.

## Validação

1. Rodar `npm test`, `npm run lint` e `npm run build`.
2. Testar manualmente pedidos criados, pendentes, aprovados, recusados, cancelados e reembolsados.
3. Verificar vendas do site e WhatsApp em desktop e celular.
4. Confirmar que nenhuma ação operacional altera status ou histórico Mercado Pago.
