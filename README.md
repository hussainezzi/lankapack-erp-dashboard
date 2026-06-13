# 🏭 LankaPack Zennix ERP Dashboard

A live dashboard for LankaPack's production ERP, showing raw material stock, job cards, and key metrics.

## Live URL

https://tahamurtaza.github.io/lankapack-erp-dashboard/

## Features

- **KPIs**: Customers, job cards, invoices, stock availability
- **Charts**: Reel sizes in use, stock distribution, top customers, GSM breakdown
- **Tables**: In-use reel details, available stock summary
- **Dark theme**: Built for production floor monitoring

## How to Refresh Data

The dashboard loads data from static JSON files in the `data/` folder. To update with live data:

```bash
# Run the refresh script
node refresh-data.mjs
```

Then commit and push:

```bash
git add .
git commit -m "Update dashboard data"
git push origin main
```

## Tech Stack

- Vanilla HTML/CSS/JS
- Chart.js for visualizations
- GitHub Pages for hosting
- Data exported from LankaPack Zennix ERP via MCP
