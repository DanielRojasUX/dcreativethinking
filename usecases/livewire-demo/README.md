# LiveWire Fleet Intelligence — Dashboard

A static, framework-free dashboard. Open `index.html` in a browser (or serve
the folder with any static file server) — no build step required.

## Structure

```
livewire-dashboard/
├── index.html            All markup + view templates
├── css/
│   └── styles.css        Full design system (tokens, layout, components)
├── js/
│   └── app.js            Navigation, favorites, charts, dynamic content
└── assets/
    ├── video/
    │   └── bkg-loop.mp4  Background loop video (1280×720, ~640KB, muted)
    ├── images/
    │   ├── bg-poster.webp        Poster frame shown before the video loads
    │   ├── bike.webp             Full side-profile bike (hero shots)
    │   ├── bike-cut-front.webp   Front-end detail crop
    │   ├── bike-cut-rear.webp    Rear-end detail crop
    │   └── charge-port.webp      Charge-port close-up
    └── logo/
        ├── livewire-full.svg     Full wordmark (white)
        └── livewire-isotype.svg  Mark only (white)
```

## Swapping the background video

Replace `assets/video/bkg-loop.mp4` with a new file of the same name, or
change the `<source>` path in `index.html` (search for `bkg-loop.mp4`).
Keep it short and muted — it loops behind frosted-glass panels, so heavy
detail is wasted; 720p at a modest bitrate looks identical to source once
blurred and is far lighter to load.

## External dependencies (loaded from CDN, require internet access)

- Google Fonts — Space Grotesk (display) + JetBrains Mono (data/labels)
- Chart.js 4.4.4 (`cdnjs.cloudflare.com`)

Everything else — images, video, logos, CSS, JS — is local to this folder.

## Data

All numbers are illustrative, pulled from the reference dashboard mockup
provided during development. Wire real data into `js/app.js`: the chart
definitions, the mileage-details table rows, and the KPI values in
`index.html` are the places to start.
