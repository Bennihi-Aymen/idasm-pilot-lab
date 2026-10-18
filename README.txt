IDASM Pilot Lab - installable app
=================================

This folder is the whole app. It runs from any web address that uses https.

Publish it (no coding)
  Netlify Drop: open app.netlify.com/drop and drag this whole folder onto the page.
  You get a web address straight away; you can attach your own domain later.
  GitHub Pages or Cloudflare Pages also work: upload the folder as it is.

People install it
  PC or Android (Chrome or Edge): press "Install the app" at the top of the page,
  or the install icon in the address bar. The app then has its own window and the
  IDASM icon on the desktop / Start menu / home screen, and it also opens offline.
  iPhone or iPad (Safari): Share, then "Add to Home Screen".

Update it later
  Replace index.html, and change VERSION in sw.js (for example idasm-pilot-v2)
  so installed copies refresh the next time they are online.
