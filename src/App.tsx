// src/App.tsx
import './App.css';
import Navbar from './components/Navbar';
import ProductPage from './components/ProductPage';
import ProductGallery from './components/ProductGallery';
import ProductSpecs from './components/ProductSpecs';
import Manifesto from './components/Manifesto';
import Comments from './components/Comments'; // Importe o novo componente de Comentários

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F9F9] pt-24 px-4">
      <Navbar />
      <ProductPage />
      <ProductGallery />
      <div className="max-w-5xl mx-auto mt-12">
        <ProductSpecs />
      </div>
      <Manifesto />

      {/* Adicionando o componente de comentários */}
      <Comments />
    </div>
  );
}
