// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import TiposAparelhos from './pages/TiposAparelhos.tsx'
import TesteAuditivo from './pages/TesteAuditivo.tsx' // <-- novo

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tipos-de-aparelhos" element={<TiposAparelhos />} />
        <Route path="/teste-auditivo" element={<TesteAuditivo />} /> {/* nova rota */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
