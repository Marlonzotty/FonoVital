import { useEffect, useCallback } from "react";
import { loadFacebookPixel, trackEvent, trackPageView } from "./fbpixel";

export function useMeta(pixelId: string) {
  useEffect(() => {
    if (!pixelId) return;
    loadFacebookPixel(pixelId);
    trackPageView(); // dispara ao montar
  }, [pixelId]);

  const track = useCallback(
    (name: string, params?: Record<string, any>, eventID?: string) => {
      trackEvent(name, params, eventID ? { eventID } : undefined);
    },
    []
  );

  return { track };
}
