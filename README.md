# Andaaz.store

A responsive starter storefront for **Andaaz.store**, built with plain HTML, CSS and JavaScript.

## Included
- Responsive shopping homepage
- Product categories and search
- Demo product cards
- Shopping bag/cart saved in browser local storage
- WhatsApp order message flow (requires your number)
- No build tools required

## Run locally
Open `index.html` in a browser.

## Add your products
Edit the `products` array near the top of `script.js`. Each product has:
- `id` (unique number)
- `name`
- `category` (`Fashion`, `Lifestyle`, `Accessories`, or `Essentials`)
- `price` (PKR number)
- `emoji`, `tag`, and `tone` (demo visual settings)

## Set WhatsApp ordering
Open `script.js` and replace:
```js
const WHATSAPP_NUMBER = "";
```
with your WhatsApp number including country code, without `+` or spaces. Example format: `923001234567`.

## Publish with GitHub Pages
1. Upload all three files (`index.html`, `style.css`, `script.js`) and this README to the root of your `main` branch.
2. Open repository **Settings → Pages**.
3. Under Build and deployment, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then Save.
5. GitHub will show your published website address when deployment completes.

## Important
This is the first frontend demo, not a complete production e-commerce system. It does not yet include secure customer accounts, online payments, a database, stock management, or an admin dashboard. Those require a backend and secure hosting before accepting real customer orders.
