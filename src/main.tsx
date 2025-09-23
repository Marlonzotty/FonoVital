// src/main.tsx
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import './index.css';
import App from './App';
import TiposAparelhos from './pages/TiposAparelhos';
import TesteAuditivo from './pages/TesteAuditivo';
import CadastroModal from './components/CadastroModal';

import Voxton from './produtos/voxton';
import Voxcharge from './produtos/Voxcharge';
import Vitalvoice from './produtos/Vitalvoice';
import IAvoice from './produtos/IAvoice';
import VitalAir from './produtos/VitalAir';
import VoicePro from './produtos/VoicePro';

import { loadFacebookPixel, trackPageView } from './analytics/fbpixel'

// ✅ Importa o MetaTest da pasta analytics

const pixelId = import.meta.env.VITE_META_PIXEL_ID

if (pixelId) {
  loadFacebookPixel(pixelId)
  // trackPageView() // agora é disparado pelo PageViewTracker para evitar duplicidade
}

// 🔹 Componente interno que dispara PageView a cada mudança de rota
function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView();
    // console.log('[Pixel] PageView:', location.pathname, location.search, location.hash);
  }, [location.pathname, location.search, location.hash]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      {/* Dispara PageView no load e em toda navegação */}
      <PageViewTracker />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tipos-de-aparelhos" element={<TiposAparelhos />} />
        <Route path="/teste-auditivo" element={<TesteAuditivo />} />
        <Route path="/cadastro" element={<CadastroModal />} />
        {/* Produtos */}
        <Route path="/produto/voxton" element={<Voxton />} />
        <Route path="/produto/voxcharge" element={<Voxcharge />} />
        <Route path="/produto/vitalvoice" element={<Vitalvoice />} />
        <Route path="/produto/iavoice" element={<IAvoice />} />
        <Route path="/produto/vitalair" element={<VitalAir />} />
        <Route path="/produto/voicepro" element={<VoicePro />} />

        {/* ✅ Nova rota para testar Meta Pixel / CAPI */}
       
      </Routes>
    </HashRouter>
  </StrictMode>
);
