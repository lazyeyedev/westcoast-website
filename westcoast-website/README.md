# WestCoast Construction & Consult website

Static HTML/CSS/JS site. No build step. Live at https://westcoastconstruction.co (Vercel, from the `westcoast-website` folder of the GitHub repo).

```
index.html  about.html  services.html  projects.html  contact.html  404.html
residential.html  land-site-planning.html  design-documentation.html
robots.txt  sitemap.xml  site.webmanifest
assets/css/styles.css   all styling; design tokens at the top
assets/js/main.js       menu, scroll effects, reveals, enquiry form, photo viewer
assets/img/             logo, photos, og-image
assets/icons/           favicon and app icons
```

## Design system
- Type: Outfit (Google Fonts), weights 300-700.
- Colour: navy `#0c2148`, deep navy `#081733`, gold `#bd8f3d`, paper `#f7f4ee`.
- Gold is for fills, rules and icons. Gold text on white uses `#8a611a` (5.5:1); gold text on navy uses `#d9b36b` (8:1).
  Gold buttons use navy text (5.4:1); white on gold fails contrast (2.9:1), so don't use it.
- Respects reduced-motion settings. Layout tested at 390, 768, 1024 and 1440px.

## Still to do
- Social links and the privacy policy link point to `#`.
- `assets/img/design-site-photo.jpg` is an iStock preview; licence it or replace it.
- The contact form sends enquiries to WhatsApp on +233 59 807 4217 (set in `contact.html` as `data-wa`), with an email fallback link. The visitor must tap send in WhatsApp.
