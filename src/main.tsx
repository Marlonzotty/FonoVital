// src/main.tsx
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";

import "./index.css";
import App from "./App";
import TiposAparelhos from "./pages/TiposAparelhos";
import TesteAuditivo from "./pages/TesteAuditivo";
import CadastroModal from "./components/CadastroModal";
import PromoBanner from "./components/PromoBanner";
import Navbar from "./components/Navbar";

import Voxton from "./produtos/voxton";
import Voxcharge from "./produtos/Voxcharge";
import Vitalvoice from "./produtos/Vitalvoice";
import IAvoice from "./produtos/IAvoice";
import VitalAir from "./produtos/VitalAir";
import VoicePro from "./produtos/VoicePro";

import {
  loadFacebookPixel,
  trackPageView,
  refreshFbcFromUrl,
} from "./analytics/fbpixel";

// ID do Pixel via .env (Vite)
const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
if (pixelId) {
  loadFacebookPixel(pixelId);
}

/**
 * Alternativa simples do RoutePageView embutida no main.
 * Se você já usa o componente `RoutePageView` dedicado,
 * pode remover este e usar só o componente.
 */
function InlineRoutePageView() {
  const location = useLocation();
  const key = `${location.pathname}|${location.search}|${location.hash}`;

  useEffect(() => {
    const g = window as any;
    if (g.__LAST_PAGEVIEW_KEY__ === key) return;
    g.__LAST_PAGEVIEW_KEY__ = key;

    // Garante _fbc atualizado a cada mudança de rota
    refreshFbcFromUrl();

    // PageView
    trackPageView();
  }, [key]);

  return null;
}

function BaseLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <PromoBanner />
        <Outlet />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      {/* Use só um dos dois:
          1) Componente dedicado:
             <RoutePageView />
          2) Inline (abaixo):
      */}
      <InlineRoutePageView />

      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/tipos-de-aparelhos" element={<TiposAparelhos />} />
          <Route path="/teste-auditivo" element={<TesteAuditivo />} />
          <Route path="/cadastro" element={<CadastroModal />} />
          <Route path="/produto/voxton" element={<Voxton />} />
          <Route path="/produto/voxcharge" element={<Voxcharge />} />
          <Route path="/produto/vitalvoice" element={<Vitalvoice />} />
          <Route path="/produto/iavoice" element={<IAvoice />} />
          <Route path="/produto/vitalair" element={<VitalAir />} />
          <Route path="/produto/voicepro" element={<VoicePro />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
