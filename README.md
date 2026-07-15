# Torongoo Customer Support Hub (CSH)

A modern React workspace for support agents to search products, open prebuilt replies, and copy responses quickly.

## Features

- CSV-powered product source (`wc-product-export-31-3-2026-1774959409005.csv`)
- Modern card/list view with product images and stock status
- Global search across product name, category, prices, and script content
- Category chips, sorting controls, and clear filters
- Quick-copy on cards and copy-all from the product modal
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

Product data is generated at runtime from `wc-product-export-31-3-2026-1774959409005.csv` in `src/data/products.js`.

- `simple` and `variable` records become product cards
- `variation` rows are merged into parent products for option/price ranges
- Support scripts are auto-generated from CSV descriptions

## Brand theme

Primary theme color: `#2596be`

Used in:
- `tailwind.config.js`
- `src/index.css`
- `index.html` (`meta theme-color`)

## License

Private - Torongoo Internal Use Only
