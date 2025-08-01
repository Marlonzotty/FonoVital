import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App.tsx';
import TiposAparelhos from './pages/TiposAparelhos.tsx';
import TesteAuditivo from './pages/TesteAuditivo.tsx';
import CadastroModal from './components/CadastroModal';

import Voxton from './produtos/voxton.tsx';
import Voxcharge from './produtos/Voxcharge.tsx';
import Vitalvoice from './produtos/Vitalvoice.tsx';
import IAvoice from './produtos/IAvoice.tsx';
import VitalAir from './produtos/VitalAir.tsx';
import VoicePro from './produtos/VoicePro.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
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
      </Routes>
    </HashRouter>
  </StrictMode>
);
