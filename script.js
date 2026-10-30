// Andaaz.store starter storefront. Replace demo products and WhatsApp number before launch.
const WHATSAPP_NUMBER = ""; // Example: 923001234567 (country code, no + sign)
const products = [
  {id:1,name:"Everyday Tote Bag",category:"Accessories",price:1899,emoji:"👜",tag:"BESTSELLER",tone:"#eadbd0"},
  {id:2,name:"Classic Wrist Watch",category:"Accessories",price:2499,emoji:"⌚",tag:"POPULAR",tone:"#d8d9d1"},
  {id:3,name:"Minimal Home Decor",category:"Lifestyle",price:1599,emoji:"🏺",tag:"NEW",tone:"#e8d8c9"},
  {id:4,name:"Casual Style Shirt",category:"Fashion",price:2199,emoji:"👕",tag:"TRENDING",tone:"#d8e0df"},
  {id:5,name:"Daily Essentials Set",category:"Essentials",price:999,emoji:"✨",tag:"VALUE PICK",tone:"#e8e2d2"},
  {id:6,name:"Modern Sunglasses",category:"Fashion",price:1299,emoji:"🕶️",tag:"NEW",tone:"#e3d8d4"},
  {id:7,name:"Travel Bottle",category:"Lifestyle",price:899,emoji:"🧴",tag:"POPULAR",tone:"#d9e2dc"},
  {id:8,name:"Elegant Bracelet",category:"Accessories",price:1199,emoji:"📿",tag:"GIFT IDEA",tone:"#eadfd4"}
];
let cart = JSON.parse(localStorage.getItem("andaazCart") || "[]");
let activeFilter = "All";
const grid = document.getElementById("productGrid");
const money = n => "Rs. " + n.toLocaleString("en-PK");

function renderProducts(){
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const shown = products.filter(p => (activeFilter==="All" || p.category===activeFilter) && (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  document.getElementById("resultCount").textContent = `${shown.length} products`;
  grid.innerHTML = shown.length ? shown.map(p=>`<article class="product-card"><div class="product-image" style="background:${p.tone}"><span class="badge">${p.tag}</span>${p.emoji}</div><div class="product-info"><small>${p.category.toUpperCase()}</small><h3>${p.name}</h3><div class="price-row"><span class="price">${money(p.price)}</span><button class="add-btn" onclick="addToCart(${p.id})">+ Add</button></div></div></article>`).join("") : "<p>No products found. Try another search.</p>";
}
function saveCart(){localStorage.setItem("andaazCart",JSON.stringify(cart));renderCart();}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("Added to your bag");}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart();}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  const items=cart.map(x=>({...products.find(p=>p.id===x.id),qty:x.qty}));
  document.getElementById("cartItems").innerHTML=items.length?items.map(p=>`<div class="cart-item"><div><b>${p.name}</b><p>${p.qty} × ${money(p.price)}</p></div><div><b>${money(p.price*p.qty)}</b><br><button onclick="removeItem(${p.id})">Remove</button></div></div>`).join(""):"<p style='color:#888;font-size:13px;padding:25px 0'>Your bag is empty. Add something you love.</p>";
  document.getElementById("cartTotal").textContent=money(items.reduce((s,p)=>s+p.price*p.qty,0));
}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);}
function openCart(open){document.getElementById("cartDrawer").classList.toggle("open",open);document.getElementById("overlay").classList.toggle("show",open);}
document.getElementById("cartOpen").onclick=()=>openCart(true);
document.getElementById("cartClose").onclick=()=>openCart(false);
document.getElementById("overlay").onclick=()=>openCart(false);
document.getElementById("searchForm").addEventListener("submit",e=>{e.preventDefault();renderProducts();document.getElementById("shop").scrollIntoView();});
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();}));
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderProducts();document.getElementById("shop").scrollIntoView();}));
document.getElementById("checkoutBtn").onclick=()=>{
  if(!cart.length){showToast("Your bag is empty");return;}
  if(!WHATSAPP_NUMBER){showToast("Add your WhatsApp number in script.js first");return;}
  const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `${p.name} x ${x.qty} - ${money(p.price*x.qty)}`;});
  const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
  const msg=`Hello Andaaz.store! I want to place an order:\n${lines.join("\n")}\nTotal: ${money(total)}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
};
document.getElementById("accountBtn").onclick=()=>showToast("Customer accounts will be connected in the next development step.");
renderProducts();renderCart();