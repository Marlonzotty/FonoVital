import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./fbpixel";

export default function RoutePageView() {
  const location = useLocation();

  // dispara PageView no carregamento e a cada navegação
  useEffect(() => {
    trackPageView();
    // se quiser inspeção: console.log("[Pixel] PageView:", location.pathname, location.search, location.hash);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
