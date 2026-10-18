/* IDASM Pilot Lab service worker: works offline after the first visit.
   When you publish a new index.html, raise VERSION so installed copies refresh. */
const VERSION = 'idasm-pilot-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './vendor/papaparse.min.js', './vendor/xlsx.full.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === 'navigate') {            /* newest page when online, saved copy when offline */
      e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(ch => ch.put('./index.html', c)); return r; }).catch(() => caches.match('./index.html')));
    } else {
      e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(ch => ch.put(req, c)); return r; })));
    }
  } else if (/(googleapis|gstatic)\.com$/.test(url.hostname)) {   /* fonts: keep a copy for offline use */
    e.respondWith(caches.open(VERSION).then(ch => ch.match(req).then(hit => {
      const net = fetch(req).then(r => { ch.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
