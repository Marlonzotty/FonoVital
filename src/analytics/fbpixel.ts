// src/analytics/fbpixel.ts

type Fbq = ((method: string, ...args: any[]) => void) & {
  callMethod?: (...args: any[]) => void;
  push?: (...args: any[]) => void;
  loaded?: boolean;
  version?: string;
  queue?: any[];
};

/* ----------------------------- fbc/fbp helpers ---------------------------- */

function ensureFbcCookie() {
  if (typeof window === "undefined") return;
  try {
    let fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (!fbclid && window.location.hash) {
      const hq = window.location.hash.split("?")[1] || "";
      fbclid = new URLSearchParams(hq).get("fbclid");
    }
    if (!fbclid) return;

    if (document.cookie.split("; ").some(c => c.startsWith("_fbc="))) return;
    const epochSecs = Math.floor(Date.now() / 1000);
    const fbc = `fb.1.${epochSecs}.${fbclid}`;
    document.cookie = `_fbc=${encodeURIComponent(fbc)};path=/;max-age=${60*60*24*90};SameSite=Lax`;
  } catch {}
}

function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  return document.cookie.split("; ").find(r => r.startsWith(name + "="))?.split("=")[1];
}

export function getFbc() {
  const v = readCookie("_fbc");
  return v ? decodeURIComponent(v) : undefined;
}
export function getFbp() {
  const v = readCookie("_fbp");
  return v ? decodeURIComponent(v) : undefined;
}

/* ------------------------------- fbq bootstrap ---------------------------- */

declare global { interface Window { __PIXELS_INITED__?: Set<string> } }

function getWindowFbq(): Fbq | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { fbq?: Fbq }).fbq;
}

function setWindowFbq(fbq: Fbq) {
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  w.fbq = fbq; w._fbq = fbq;
}

export function loadFacebookPixel(pixelId: string) {
  if (typeof window === "undefined" || !pixelId) return;

  window.__PIXELS_INITED__ ??= new Set<string>();
  if (window.__PIXELS_INITED__.has(pixelId)) return;
  window.__PIXELS_INITED__.add(pixelId);

  ensureFbcCookie();

  const existing = getWindowFbq();
  if (!existing) {
    const fbq: Fbq = function (...args: any[]) {
      if ((fbq as any).callMethod) {
        (fbq as any).callMethod.apply(fbq, args);
      } else {
        ((fbq as any).queue as any[]).push(args);
      }
    } as Fbq;
    (fbq as any).push = fbq as any;
    (fbq as any).loaded = true;
    (fbq as any).version = "2.0";
    (fbq as any).queue = [];

    const hasScript = !!document.querySelector('script[src*="fbevents.js"]');
    if (!hasScript) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      const first = document.getElementsByTagName("script")[0];
      first?.parentNode?.insertBefore(s, first);
    }

    setWindowFbq(fbq);
  }

  getWindowFbq()!("init", pixelId);
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

type PurchaseParams = {
  value: number;
  currency: string;
  contents?: Array<any>;
  endpoint?: string;
};

export async function trackPurchaseAndSendToCapi({
  value,
  currency,
  contents,
  endpoint = "http://localhost:3001/api/meta/capi/purchase",
}: PurchaseParams) {
  const eventId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  trackEvent("Purchase", { value, currency, contents }, { eventID: eventId });

  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value,
      currency,
      contents,
      event_id: eventId,
      event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      user_data: { fbc: getFbc(), fbp: getFbp() },
    }),
  });
}
