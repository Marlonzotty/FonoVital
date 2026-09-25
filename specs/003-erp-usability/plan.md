# Implementation Plan: Usabilidade e Responsividade do ERP

**Branch**: `003-erp-usability` | **Date**: 2026-09-24 | **Spec**: [spec.md](./spec.md)

## Summary

Evoluir a aparência do ERP existente para uma operação mais clara e responsiva. A implementação reutilizará `Admin`, `FinancialAnalysis` e `AdminProducts`: reorganiza hierarquia, controles e estados; adapta a navegação; e transforma a apresentação de pedidos para telas menores sem alterar regras de negócio, APIs ou dados.

## Technical Context

**Language/Version**: TypeScript 5.8 e React 19 no frontend; JavaScript/Express 5 no backend.
**Primary Dependencies**: React Router, Tailwind CSS e ícones Phosphor já usados no ERP.
**Storage**: PostgreSQL existente; nenhuma mudança de modelo de dados.
**Testing**: Node test runner, TypeScript build, ESLint e validação visual responsiva manual.
**Target Platform**: Navegadores modernos em celular, tablet e desktop.
**Project Type**: Aplicação web React com API Express existente.
**Performance Goals**: Não acrescentar carregamentos de dados ou dependências; preservar respostas e atualizações atuais do ERP.
**Constraints**: Não recriar componentes do zero; preservar rotas, endpoints, autenticação, dados, ordem de pedidos/lançamentos e fluxos atuais.
**Scale/Scope**: `src/pages/Admin.tsx`, `src/components/FinancialAnalysis.tsx`, `src/components/AdminProducts.tsx` e estilos já existentes, quando necessário.

## Constitution Check

O arquivo de constituição contém somente campos-modelo e não possui gates aplicáveis. A instrução do projeto de não recriar componentes é um gate obrigatório. **PASS**: o plano evolui os componentes atuais e não cria arquitetura, dependências ou dados novos.

## Project Structure

```text
src/
├── pages/Admin.tsx                 # Casca, navegação e lista de pedidos existentes
├── components/FinancialAnalysis.tsx # Fluxo financeiro existente
├── components/AdminProducts.tsx     # Catálogo existente
└── index.css                        # Tokens e utilidades visuais existentes

tests/
├── admin-commerce.test.mjs          # Regressão de interface conectada
└── commerce-flow.test.mjs           # Regressão de fluxos administrativos e API
```

**Structure Decision**: Manter a estrutura atual. Mudanças visuais serão incrementais nos componentes que já renderizam cada função.
