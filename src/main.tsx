// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App.tsx';
import TiposAparelhos from './pages/TiposAparelhos.tsx';
import TesteAuditivo from './pages/TesteAuditivo.tsx'; // <-- Componente de Teste Auditivo
import CadastroModal from './components/CadastroModal'; // <-- Novo componente de cadastro
import Voxton from './produtos/voxton.tsx'
import Voxcharge from './produtos/Voxcharge.tsx'
import Vitalvoice from './produtos/Vitalvoice.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tipos-de-aparelhos" element={<TiposAparelhos />} />
        <Route path="/teste-auditivo" element={<TesteAuditivo />} /> {/* Rota do Teste Auditivo */}
        <Route path="/cadastro" element={<CadastroModal />} /> {/* Rota do Cadastro Modal */}
        <Route path="/produto/voxton" element={<Voxton />} />
        <Route path="/produto/voxcharge" element={<Voxcharge />} />
        <Route path="/produto/vitalvoice" element={<Vitalvoice />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
