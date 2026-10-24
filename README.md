# NexoraMart — GitHub Pages starter

A responsive static storefront starter for the NexoraMart brand.

## What's included
- `index.html` — storefront layout
- `style.css` — responsive styling
- `app.js` — sample product cards, category filters, search, local demo cart
- `assets/logo.svg` — simple brand mark

## Publish on GitHub Pages
1. Sign in to GitHub and create a new **public** repository, for example `nexoramart-store`.
2. Upload all files and the `assets` folder from this ZIP to the repository's root. Keep `index.html` in the root.
3. Open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. Wait for GitHub Pages to publish and open the URL shown in Pages settings.

## Important before selling
This is a front-end starter, not a complete live ecommerce system. The sample listings, emoji artwork and prices are placeholders. They are **not verified CJdropshipping listings**.

- Confirm product availability, USA warehouse stock, delivery estimates, product cost and shipping price in your CJdropshipping account.
- Replace sample listings with accurate product details and legally usable images.
- The cart uses the visitor's browser local storage only.
- Checkout is intentionally a notice/demo. No payment is collected and no order is sent to CJdropshipping.
- GitHub Pages is static hosting. It cannot safely store secret API keys or provide a secure order/payment backend.
- To accept real orders, connect a supported ecommerce platform/payment provider and CJdropshipping integration, then test checkout, refunds, shipping, taxes and customer notifications.
- Confirm whether the selected payment provider supports your country, business, and target customers. Do not promise delivery times until confirmed.
- Add your real customer-service email, shipping policy, return/refund policy, privacy policy, terms, and any required business/tax disclosures before launch.

## Editing products
In `app.js`, edit the `products` array near the top. Each product has:
`id`, `name`, `category`, `price`, `emoji`, `badge`, `desc`, and `color`.

Categories currently used: `Home`, `Tech`, `Lifestyle`.

## Free hosting note
GitHub Pages hosting can be free for a public repository. A custom domain, payment processing, ecommerce platform, shipping, products, refunds, and other services may cost money. This ZIP does not guarantee a fully operational $0-cost dropshipping business.
