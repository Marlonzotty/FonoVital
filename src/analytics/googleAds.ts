type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

const googleAdsId = 'AW-17575630630'
const conversionLabel = 'x5ZACJGfxNUcEKau27xB'
const purchaseConversionLabel = 'xyUICK7kztUcEKau27xB'

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
  if (!googleAdsId || !window.gtag) return
  window.gtag('event', 'conversion', {
    send_to: `${googleAdsId}/${purchaseConversionLabel}`,
    value: 1.0,
    currency: 'BRL',
    transaction_id: transactionId,
  })
}
