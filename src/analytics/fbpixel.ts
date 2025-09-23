// src/analytics/fbpixel.ts

type Fbq = ((method: string, ...args: any[]) => void) & {
  callMethod?: (...args: any[]) => void;
  push?: (...args: any[]) => void;
  loaded?: boolean;
  version?: string;
  queue?: any[];
};

function getWindowFbq(): Fbq | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { fbq?: Fbq }).fbq;
}

function setWindowFbq(fbq: Fbq) {
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  w.fbq = fbq;
  w._fbq = fbq;
}

export function loadFacebookPixel(pixelId: string) {
  if (typeof window === "undefined" || !pixelId) return;

  // já carregado?
  if (getWindowFbq()) return;

  // cria função fbq compatível
  const fbq: Fbq = function (...args: any[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
    } else {
      (fbq.queue as any[]).push(args);
    }
  } as Fbq;

  fbq.push = fbq as any;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  // injeta script
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(s, first);

  // publica no window e inicializa
  setWindowFbq(fbq);
  fbq("init", pixelId);
}

export function trackPageView() {
  const fbq = getWindowFbq();
  if (!fbq) return;
  fbq("track", "PageView");
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
  opts?: { eventID?: string }
) {
  const fbq = getWindowFbq();
  if (!fbq) return;
  if (opts?.eventID) {
    fbq("track", name, params ?? {}, { eventID: opts.eventID });
  } else {
    fbq("track", name, params ?? {});
  }
}
