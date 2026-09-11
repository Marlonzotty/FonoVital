// Resolve os caminhos legados do catálogo para os arquivos emitidos pelo Vite.
const assets = import.meta.glob<string>('/src/assets/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function productImage(source?: string | null) {
  return source ? assets[source] || source : undefined;
}
