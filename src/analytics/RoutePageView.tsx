import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./fbpixel";

export default function RoutePageView() {
  const location = useLocation();
  const lastKeyRef = useRef<string | null>(null);

  // chave única por rota
  const key = `${location.pathname}|${location.search}|${location.hash}`;

  useEffect(() => {
    // evita disparo duplicado (StrictMode DEV e re-mounts)
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    trackPageView();
    // console.log("[Pixel] PageView:", key);
  }, [key]);

  return null;
}
