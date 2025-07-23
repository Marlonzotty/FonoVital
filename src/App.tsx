import './App.css'
import Navbar from './components/Navbar'
import ProductPage from './components/ProductPage'
import ResponsiveYouTube from './components/ResponsiveYouTube'
import ProductGallery from './components/ProductGallery'
import Manifesto from './components/Manifesto'
import Comments from './components/Comments'
import Footer from './components/Footer'
import PurchaseAlert from './components/PurchaseAlert'
import VideoIntroModal from './components/VideoIntroModal'

// Imagens para diferentes tamanhos de tela
import imgDesktop from './assets/ia (1).jpg'
import imgMobile from './assets/ia (3).jpg'

export default function App() {
  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      <VideoIntroModal videoId="Z4-1AfiPFQ0" />
      <PurchaseAlert />
      <ProductPage />
      <ResponsiveYouTube videoId="Z4-1AfiPFQ0" />

      {/* Imagem adaptativa - com fundo e tamanho ajustado */}
      <div className="w-full px-4 py-8 bg-[#008693]">
        {/* Imagem para desktop */}
        <img
          src={imgDesktop}
          alt="Imagem versão desktop"
          className="hidden md:block w-full max-w-6xl mx-auto rounded-lg "
        />
        {/* Imagem para mobile */}
        <img
          src={imgMobile}
          alt="Imagem versão mobile"
          className="block md:hidden w-full max-w-md mx-auto rounded-lg "
        />
      </div>

      <ProductGallery />
      <Manifesto />
      <Comments />
      <Footer />
    </div>
  )
}
