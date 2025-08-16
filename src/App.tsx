import './App.css'
import PromoBanner from "./components/PromoBanner";
import Navbar from './components/Navbar'
import ProductPage from './components/ProductPage'
import imgDiaDosPais from "./assets/ia (1).jpg";
import ResponsiveYouTube from './components/ResponsiveYouTube'
import ProductGallery from './components/ProductGallery'
import Manifesto from './components/Manifesto'
import Comments from './components/Comments'
import Footer from './components/Footer'
import PurchaseAlert from './components/PurchaseAlert'

// Imagens para diferentes tamanhos de tela


export default function App() {
  return (

    <div className="min-h-screen pt-17">
      <PromoBanner />

      <Navbar />
      <ResponsiveYouTube videoId="Z4-1AfiPFQ0" />

      <PurchaseAlert />
      <ProductPage />
    <div className="w-full px-4 py-0 bg-[#008693]">
  {/* Imagem para desktop */}
  <img
    src={imgDiaDosPais}
    alt="Imagem Dia dos Pais versão desktop"
    className="hidden md:block w-full max-w-4xl mx-auto rounded-lg"
  />
  {/* Imagem para mobile */}
  <img
    src={imgDiaDosPais}
    alt="Imagem Dia dos Pais versão mobile"
    className="block md:hidden w-full max-w-md mx-auto rounded-lg"
  />
</div>
    

      <ProductGallery />
      <Manifesto />
      <Comments />
      <Footer />
    </div>
  )
}
