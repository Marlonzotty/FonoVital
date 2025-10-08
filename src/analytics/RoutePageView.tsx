// src/analytics/RoutePageView.tsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, refreshFbcFromUrl } from "./fbpixel";

/**
 * Dispara PageView em mudanças de rota e garante atualização do _fbc
 * quando o fbclid vier na URL (query ou após o "#").
 */
export default function RoutePageView() {
  const location = useLocation();
  const lastKeyRef = useRef<string | null>(null);

  // chave única por rota (inclui query e hash)
  const key = `${location.pathname}|${location.search}|${location.hash}`;

  useEffect(() => {
    // evita disparo duplicado (StrictMode DEV e re-mounts)
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    // Garante _fbc atualizado conforme fbclid da rota
    refreshFbcFromUrl();

    // PageView
    trackPageView();
  }, [key]);

  return null;
}
