import './App.css'
import ProductPage from './components/ProductPage'
import imgDiaDosPaisDesktop from "./assets/ia (1).jpeg";
import imgDiaDosPaisMobile from "./assets/ia (3).jpeg";
import ResponsiveYouTube from './components/ResponsiveYouTube'
import Manifesto from './components/Manifesto'
import Comments from './components/Comments'
import Footer from './components/Footer'
import PurchaseAlert from './components/PurchaseAlert'

// Imagens para diferentes tamanhos de tela

// ...


export default function App() {
  return (
    <div className="min-h-screen">
      <ResponsiveYouTube videoId="Z4-1AfiPFQ0" />
      

      <PurchaseAlert />
      <ProductPage />
    <div className="w-full bg-[#008693]">
  {/* Imagem para desktop */}
  <img
    src={imgDiaDosPaisDesktop}
    alt="Imagem Dia dos Pais versão desktop"
    className="hidden md:block w-full h-full object-cover"
  />
  {/* Imagem para mobile */}
  <img
    src={imgDiaDosPaisMobile}
    alt="Imagem Dia dos Pais versão mobile"
    className="block md:hidden w-full h-full object-cover"
  />
  
</div>

      <Manifesto />
      <Comments />

      <section className="w-full bg-white px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="overflow-hidden rounded-3xl shadow-lg border border-[#cde7ed]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.122083025319!2d-44.2522057!3d-21.1475393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1c963c59a1c0f%3A0x53f730cb26c74473!2sFonovital%20LTDA!5e0!3m2!1spt-BR!2sbr!4v1759945084576!5m2!1spt-BR!2sbr"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Fonovital"
            ></iframe>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p className="font-semibold text-[#028794]">Fonovital LTDA</p>
            <p>CNPJ:  61.894.698/0001-20</p>
            <p>Avenida Eduardo Magalhaes, 202 - Centro, São João del-Rei - MG</p>
          </div>
        </div>
      </section>
      
      <Footer />
      
    </div>
  )
}
