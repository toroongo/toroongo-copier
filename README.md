# Torongoo Customer Support Hub (CSH)

A modern React workspace for support agents to search products, open prebuilt Bengali reply scripts, and copy responses quickly.

## Features

- Product catalog maintained in `src/data/products.js` (name, category, price, stock, variant count, and a set of ready-to-copy support scripts per product)
- Grid/list product views with category badge, price, variant count, and stock status
- Global search across product name, category, price, and script content
- Mobile-first toolbar: category and sort collapse into compact dropdowns with an icon-only reset button on small screens, expanding to pill filters and labeled controls on desktop
- Per-product support scripts: price & availability, greeting, direct product link, description, key features (where applicable), usage tips, delivery info, and related products
- Quick Copy on each card assembles a full one-click summary (description, features, price, variant status, stock, and product link) for pasting straight to a customer
- Copy-all and per-script copy from the product detail modal
- One-click "Order instructions" button in the toolbar — copies the current website checkout flow to clipboard, since all orders are placed on-site rather than manually through chat
- Responsive design for desktop and mobile support workflows

## Tech Stack

- React + Vite
- Tailwind CSS
- Lucide React icons
- React Hot Toast

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Data source

Product data lives directly in `src/data/products.js` as a hand-maintained array — there is no build-time CSV import. Update prices, add/remove products, or edit script text by editing that file directly.

Each product entry has:

- `id`, `name`, `category`, `price`, `stock`, `variationCount`
- `scripts`: an array of `{ question, answer }` pairs shown in the product detail modal and used to build the Quick Copy summary

## Brand theme

Primary theme color: `#2596be`

Used in:
- `tailwind.config.js`
- `src/index.css`
- `index.html` (`meta theme-color`)

## License

Private - Torongoo Internal Use Only
