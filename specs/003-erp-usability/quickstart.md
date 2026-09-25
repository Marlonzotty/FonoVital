# Quickstart: Validar Usabilidade e Responsividade do ERP

## Automated checks

```powershell
npm test
npm run lint
npm run build
```

## Manual responsive checks

1. Inicie o frontend e backend existentes e entre no Admin.
2. Teste as larguras de 360 px, 768 px e 1440 px.
3. Em cada largura, navegue por Visão geral, Financeiro, Métricas, Clientes e Produtos.
4. Busque e filtre pedidos; confirme que data, cliente, valor, status e ações continuam legíveis.
5. Adicione, edite e exclua um lançamento financeiro; confirme feedback claro e ordem preservada.
6. Navegue pelos controles principais usando teclado e confirme foco visível.

## Expected outcomes

- Nenhum controle primário fica escondido, sobreposto ou pequeno demais para toque.
- A navegação e os estados da interface são compreensíveis.
- O ERP preserva todos os fluxos e componentes já existentes.
