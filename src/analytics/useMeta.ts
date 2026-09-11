import { useCallback } from "react";
import { trackEvent } from "./fbpixel";

export function useMeta() {
  const track = useCallback(
    (name: string, params?: Record<string, unknown>, eventID?: string) => {
      trackEvent(name, params, eventID ? { eventID } : undefined);
    },
    []
  );
  return { track };
}


