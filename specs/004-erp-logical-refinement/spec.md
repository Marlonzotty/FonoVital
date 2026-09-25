# Feature Specification: Refinamento Lógico do ERP

**Created**: 2026-09-24
**Status**: Draft
**Input**: Refinar todo o ERP para que seus fluxos sejam coerentes e intuitivos, sem afetar a integração Mercado Pago.

## User Scenarios & Testing

### User Story 1 - Entender o estado de cada venda (Priority: P1)

Um administrador entende rapidamente o que aconteceu com uma venda, o que deve fazer a seguir e quais ações são seguras.

**Acceptance Scenarios**:

1. **Given** uma venda com pagamento aprovado, **When** o administrador abre o pedido, **Then** vê separadamente o pagamento e o andamento operacional.
2. **Given** uma venda vinda do WhatsApp, **When** o administrador a visualiza, **Then** entende que é um lançamento manual sem confundi-la com uma transação Mercado Pago.

### User Story 2 - Executar ações sem ambiguidade (Priority: P1)

Um administrador executa ações em pedidos, clientes, produtos e financeiro sabendo o resultado, as limitações e o próximo passo.

**Acceptance Scenarios**:

1. **Given** uma ação operacional, **When** ela é concluída, **Then** a interface confirma o resultado e atualiza o estado correspondente.
2. **Given** uma ação que não deve alterar o pagamento, **When** o administrador a usa, **Then** a interface deixa essa separação explícita.

### User Story 3 - Navegar entre informações relacionadas (Priority: P2)

Um administrador alterna entre pedido, cliente, financeiro e rastreio sem perder contexto.

## Requirements

### Functional Requirements

- **FR-001**: O ERP MUST separar visual e semanticamente o status de pagamento do status operacional de entrega.
- **FR-002**: O ERP MUST manter Mercado Pago, checkout, webhook, referência externa e regras de aprovação sem alteração de comportamento.
- **FR-003**: O ERP MUST usar termos consistentes para venda do site, lançamento do WhatsApp, cliente, pedido, pagamento e envio.
- **FR-004**: O ERP MUST indicar origem do registro e quais ações se aplicam a ele sem alterar o layout-base de clientes.
- **FR-005**: O ERP MUST apresentar feedback claro para carregamento, sucesso, erro, ação indisponível e atualização concluída.
- **FR-006**: O ERP MUST confirmar ações destrutivas e impedir ações operacionais incompatíveis com o estado atual.
- **FR-007**: O ERP MUST preservar componentes, rotas e dados existentes, evoluindo-os incrementalmente.
- **FR-008**: O ERP MUST adaptar cada fluxo para celular, tablet e desktop, priorizando as informações e ações do contexto atual.
- **FR-009**: O ERP MUST usar hierarquia visual consistente para diferenciar informação, ação primária, ação secundária, alerta e estado concluído.

## Success Criteria

- **SC-001**: Em testes de fluxo, 100% dos estados de pagamento e operação podem ser identificados sem abrir documentação externa.
- **SC-002**: Nenhum teste de checkout, webhook ou aprovação Mercado Pago sofre regressão.
- **SC-003**: Administradores concluem a identificação e atualização de um pedido em até 3 interações principais.
- **SC-004**: Em larguras de 360 px, 768 px e 1440 px, nenhuma ação essencial fica oculta, sobreposta ou dependente de uma tabela comprimida.

## Assumptions

- Cancelamento operacional não cancela, estorna ou altera um pagamento Mercado Pago automaticamente.
- Lançamentos manuais podem ter acompanhamento operacional, mas não passam a se comportar como transações Mercado Pago.
