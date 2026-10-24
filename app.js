const products = [
  {id:1,name:"Adjustable Phone Stand",category:"Tech",price:14.99,emoji:"📱",badge:"EVERYDAY PICK",desc:"A handy desk companion for calls, videos and hands-free viewing.",color:"#e8edff"},
  {id:2,name:"Minimal Desk Organizer",category:"Home",price:19.99,emoji:"🗂️",badge:"STAY ORGANIZED",desc:"Keep small essentials neat and easy to find around your workspace.",color:"#f7eadf"},
  {id:3,name:"Reusable Travel Bottle",category:"Lifestyle",price:16.50,emoji:"🧴",badge:"ON THE GO",desc:"A simple everyday carry idea for commutes, gym bags and trips.",color:"#e1f4ef"},
  {id:4,name:"LED Ambient Light",category:"Tech",price:24.99,emoji:"💡",badge:"ROOM REFRESH",desc:"Add a cozy accent to a desk, bedroom or entertainment corner.",color:"#eee5ff"},
  {id:5,name:"Compact Storage Basket",category:"Home",price:18.00,emoji:"🧺",badge:"HOME FAVORITE",desc:"A versatile storage idea for shelves, counters and everyday clutter.",color:"#f9efdb"},
  {id:6,name:"Everyday Crossbody Bag",category:"Lifestyle",price:22.99,emoji:"👜",badge:"DAILY ESSENTIAL",desc:"A practical style inspiration for errands, outings and travel days.",color:"#fbe5ec"}
];
// These are illustrative demo listings, not verified CJdropshipping products.
// Replace names, images, prices and descriptions only after confirming supplier details.
let cart = JSON.parse(localStorage.getItem("nexoramart-cart") || "[]");
let activeCategory = "All";
let searchTerm = "";

const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const resultsLabel = document.getElementById("resultsLabel");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const toast = document.getElementById("toast");
let toastTimer;

function money(value){ return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(value); }
function saveCart(){ localStorage.setItem("nexoramart-cart",JSON.stringify(cart)); renderCart(); }
function showToast(message){
  toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);
}
function renderProducts(){
  const filtered=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(`${p.name} ${p.desc} ${p.category}`).toLowerCase().includes(searchTerm));
  grid.innerHTML=filtered.map(p=>`<article class="product-card">
    <div class="product-image" style="background:${p.color}"><span class="badge">${p.badge}</span><span class="art" aria-hidden="true">${p.emoji}</span></div>
    <div class="product-info"><span class="product-category">${p.category==="Tech"?"Tech accessories":p.category==="Home"?"Home & living":"Lifestyle"}</span>
    <h3>${p.name}</h3><p class="product-desc">${p.desc}</p>
    <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">+ Add to cart</button></div></div>
  </article>`).join("");
  emptyState.hidden=filtered.length!==0;
  resultsLabel.textContent=`${filtered.length} product${filtered.length===1?"":"s"}`;
}
function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item)item.qty+=1;else cart.push({id,qty:1});
  saveCart(); showToast("Added to your demo cart.");
}
function renderCart(){
  const totalQty=cart.reduce((sum,item)=>sum+item.qty,0);
  cartCount.textContent=totalQty;
  const cartItems=document.getElementById("cartItems");
  if(!cart.length){
    cartItems.innerHTML='<div class="empty-state">Your cart is empty.<br>Find something useful to add!</div>';
  } else {
    cartItems.innerHTML=cart.map(item=>{
      const p=products.find(x=>x.id===item.id); if(!p)return "";
      return `<div class="cart-row"><div class="cart-emoji">${p.emoji}</div><div><h4>${p.name}</h4><small>${money(p.price)} each</small><div class="qty-controls"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><span class="cart-price">${money(p.price*item.qty)}</span></div>`;
    }).join("");
  }
  const subtotal=cart.reduce((sum,item)=>{const p=products.find(x=>x.id===item.id);return sum+(p?p.price*item.qty:0)},0);
  document.getElementById("cartSubtotal").textContent=money(subtotal);
}
function openCart(){cartOverlay.hidden=false;requestAnimationFrame(()=>cartDrawer.classList.add("open"));cartDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){cartDrawer.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");document.body.style.overflow="";setTimeout(()=>cartOverlay.hidden=true,250);}

document.addEventListener("click",event=>{
  const add=event.target.closest("[data-add]");
  if(add)addToCart(Number(add.dataset.add));
  const qty=event.target.closest("[data-qty]");
  if(qty){
    const id=Number(qty.dataset.qty),change=Number(qty.dataset.change),item=cart.find(x=>x.id===id);
    if(item){item.qty+=change;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}
  }
});
document.getElementById("searchForm").addEventListener("submit",event=>{event.preventDefault();searchTerm=document.getElementById("searchInput").value.trim().toLowerCase();renderProducts();document.getElementById("products").scrollIntoView({behavior:"smooth"});});
document.getElementById("searchInput").addEventListener("input",event=>{searchTerm=event.target.value.trim().toLowerCase();renderProducts();});
document.querySelectorAll("[data-category]").forEach(button=>button.addEventListener("click",()=>{
  activeCategory=button.dataset.category;
  document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b===button));
  renderProducts();
}));
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
cartOverlay.addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",()=>{
  if(!cart.length){showToast("Your cart is empty.");return;}
  closeCart();document.getElementById("checkoutDialog").showModal();
});
document.getElementById("understandButton").addEventListener("click",()=>document.getElementById("checkoutDialog").close());
document.getElementById("newsletterForm").addEventListener("submit",event=>{event.preventDefault();showToast("Thanks! This demo does not save email addresses.");event.target.reset();});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
