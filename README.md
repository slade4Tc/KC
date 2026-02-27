# Kroba Cards - Premium Collector Gallery

Static-exportable Next.js App Router project for Cloudflare Pages.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Static export (`output: "export"`)

## Development

```bash
npm install
npm run dev
```

## Production Build (Static Export)

```bash
npm run build
```

Exported site is generated into:

- `out/`

## Featured cards setup

Featured cards are controlled by `featuredRank` in `data/cards.json`:

- Set `featuredRank` from `1` to `8`.
- Home Featured row renders exactly 8 cards using the lowest ranks.
- If fewer than 8 ranked cards exist, remaining slots are filled by newest `available` cards.

## Deploy to Cloudflare Pages

1. Push this repository to GitHub.
2. Create a new Cloudflare Pages project and connect your repository.
3. Build command: `npm run build`
4. Build output directory: `out`
5. Or deploy with Wrangler using `wrangler.toml`.

## Routes

- `/`
- `/collections`
- `/collections/[slug]`
- `/cards/[id]`
- `/about`
- `/authenticity`
- `/contact`
