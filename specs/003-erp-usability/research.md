# Research: Usabilidade e Responsividade do ERP

## Decision 1: Evoluir a casca administrativa existente

- **Decision**: Ajustar o `Admin.tsx` atual para definir hierarquia, cabeçalho, navegação e áreas de trabalho.
- **Rationale**: Ele já concentra estado, rotas internas e ações administrativas.
- **Alternative**: Recriar o ERP em uma nova página — rejeitado por quebrar a diretriz do projeto e aumentar risco de regressão.

## Decision 2: Usar apresentação responsiva por contexto

- **Decision**: Manter tabela otimizada no desktop e expor pedidos em cartões/linhas empilhadas, com campos essenciais e ações, em telas pequenas.
- **Rationale**: Dados transacionais permanecem legíveis sem comprimir colunas em uma largura impraticável.

## Decision 3: Padronizar feedback em componentes existentes

- **Decision**: Aplicar estados de carregamento, vazio, erro, sucesso, foco e desabilitado de maneira consistente nos controles existentes.
- **Rationale**: A maior melhoria de usabilidade vem de tornar consequências das ações previsíveis.
