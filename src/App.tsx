import './App.css';
import Navbar from './components/Navbar';
import ProductPage from './components/ProductPage';
import ProductGallery from './components/ProductGallery';
import ProductSpecs from './components/ProductSpecs';
import Manifesto from './components/Manifesto';
import Comments from './components/Comments';
import Footer from './components/Footer';
import PurchaseAlert from './components/PurchaseAlert';

export default function App() {
  return (
    <div className="min-h-screen  pt-24">
      <Navbar />
      <PurchaseAlert />
      <ProductPage />
      <ProductGallery />
      <ProductSpecs />
      <Manifesto />
      <Comments />
      <Footer />
    </div>
  );
}
