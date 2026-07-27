type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    gtag_report_conversion?: (url?: string) => boolean
  }
}

const googleAdsId = 'AW-17575630630'
const conversionLabel = 'x5ZACJGfxNUcEKau27xB'
const purchaseConversionLabel = 'AQN2CMCI0dccEKau27xB'

export function initGoogleAds() {
  if (!googleAdsId || document.querySelector('script[data-google-ads]')) return
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args))
  window.gtag('js', new Date())
  window.gtag('config', googleAdsId)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAdsId)}`
  script.dataset.googleAds = 'true'
  document.head.appendChild(script)
}

export function trackGoogleAdsConversion(eventName: string, value = 1) {
  if (!googleAdsId || !conversionLabel || !window.gtag) return
  window.gtag('event', 'conversion', {
    send_to: `${googleAdsId}/${conversionLabel}`,
    value,
    currency: 'BRL',
    event_name: eventName
  })
}

export function trackPurchaseConversion(transactionId = '') {
  if (!googleAdsId || !window.gtag) return false
  window.gtag('event', 'conversion', {
    send_to: `${googleAdsId}/${purchaseConversionLabel}`,
    value: 1.0,
    currency: 'BRL',
    transaction_id: transactionId,
  })
  return false
}

/** Registra uma conversão de compra conforme o snippet do Google Ads. */
export function gtag_report_conversion(url?: string) {
  const callback = () => {
    if (typeof url !== 'undefined') window.location.href = url
  }

  if (!googleAdsId || !window.gtag) return false
  window.gtag('event', 'conversion', {
    send_to: `${googleAdsId}/${purchaseConversionLabel}`,
    value: 1.0,
    currency: 'BRL',
    transaction_id: '',
    event_callback: callback,
  })
  return false
}

if (typeof window !== 'undefined') {
  window.gtag_report_conversion = gtag_report_conversion
}
