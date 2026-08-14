/* ============================================
   NewLuck.store - Main JavaScript
   Pure Static B2C E-Commerce
   ============================================ */

/* === Product Data (Simulated Database) === */
const PRODUCTS = [
  // Clothing
  { id: 1, name: "Oversized Linen Blazer", category: "clothing", price: 89.00, originalPrice: 129.00, image: "images/product-1.jpg", badge: "new", sizes: ["S","M","L","XL"], colors: ["Beige","Black","White"], desc: "Effortlessly chic oversized blazer crafted from premium linen. Features a relaxed fit with structured shoulders, perfect for layering over any outfit." },
  { id: 2, name: "Slim Fit Cotton T-Shirt", category: "clothing", price: 29.00, image: "images/product-2.jpg", badge: "", sizes: ["S","M","L","XL","XXL"], colors: ["White","Black","Grey"], desc: "Essential slim-fit t-shirt made from 100% organic cotton. Soft, breathable, and perfect for everyday wear." },
  { id: 3, name: "Wide Leg Trousers", category: "clothing", price: 65.00, image: "images/product-3.jpg", badge: "new", sizes: ["S","M","L"], colors: ["Black","Navy","Cream"], desc: "Elegant wide-leg trousers with a high waist and flowing silhouette. Versatile for both office and casual settings." },
  { id: 4, name: "Cashmere Knit Sweater", category: "clothing", price: 120.00, originalPrice: 159.00, image: "images/product-4.jpg", badge: "sale", sizes: ["S","M","L","XL"], colors: ["Camel","Grey","Black"], desc: "Luxuriously soft cashmere sweater with a classic crew neck. Lightweight yet warm, ideal for transitional weather." },
  { id: 5, name: "Pleated Midi Skirt", category: "clothing", price: 55.00, image: "images/product-5.jpg", badge: "", sizes: ["XS","S","M","L"], colors: ["Beige","Black"], desc: "Graceful pleated midi skirt with an elastic waistband for comfort. Pairs beautifully with blouses and knitwear." },
  { id: 6, name: "Tailored Coat", category: "clothing", price: 175.00, originalPrice: 220.00, image: "images/product-6.jpg", badge: "sale", sizes: ["S","M","L"], colors: ["Camel","Black","Grey"], desc: "Timeless tailored coat with a single-breasted design. Crafted from premium wool blend for warmth and elegance." },

  // Accessories
  { id: 7, name: "Leather Crossbody Bag", category: "accessories", price: 79.00, image: "images/product-7.jpg", badge: "new", sizes: ["One Size"], colors: ["Black","Brown","Tan"], desc: "Minimalist crossbody bag in genuine leather. Compact yet spacious enough for daily essentials with adjustable strap." },
  { id: 8, name: "Gold Chain Necklace", category: "accessories", price: 35.00, image: "images/product-8.jpg", badge: "", sizes: ["One Size"], colors: ["Gold","Silver"], desc: "Delicate chain necklace with a modern minimalist design. 18K gold plated, hypoallergenic, perfect for layering." },
  { id: 9, name: "Polarized Sunglasses", category: "accessories", price: 45.00, originalPrice: 65.00, image: "images/product-9.jpg", badge: "sale", sizes: ["One Size"], colors: ["Black","Tortoise"], desc: "Classic polarized sunglasses with UV400 protection. Lightweight acetate frame with a timeless silhouette." },
  { id: 10, name: "Silk Scarf", category: "accessories", price: 42.00, image: "images/product-10.jpg", badge: "", sizes: ["One Size"], colors: ["Ivory","Navy","Rose"], desc: "Luxurious silk scarf with an elegant print. Versatile accessory that can be worn as a headscarf, neck tie, or bag accent." },
  { id: 11, name: "Canvas Tote Bag", category: "accessories", price: 28.00, image: "images/product-11.jpg", badge: "new", sizes: ["One Size"], colors: ["Natural","Black"], desc: "Sturdy canvas tote bag with reinforced handles. Spacious interior with inner pocket, ideal for shopping and travel." },
  { id: 12, name: "Leather Belt", category: "accessories", price: 32.00, image: "images/product-12.jpg", badge: "", sizes: ["S","M","L"], colors: ["Black","Brown"], desc: "Classic leather belt with a brushed silver buckle. Crafted from full-grain leather for lasting quality." },

  // Home Goods
  { id: 13, name: "Ceramic Vase Set", category: "home", price: 48.00, image: "images/product-13.jpg", badge: "new", sizes: ["Set of 3"], colors: ["White","Beige"], desc: "Set of three minimalist ceramic vases in varying heights. Matte finish, perfect for dried flowers or standalone decor." },
  { id: 14, name: "Linen Table Runner", category: "home", price: 36.00, image: "images/product-14.jpg", badge: "", sizes: ["150cm","200cm"], colors: ["Natural","White","Grey"], desc: "Elegant linen table runner with frayed edges. Adds a touch of natural texture to any dining setting." },
  { id: 15, name: "Scented Soy Candle", category: "home", price: 24.00, image: "images/product-15.jpg", badge: "", sizes: ["200g","400g"], colors: ["White"], desc: "Hand-poured soy candle with a calming lavender and vanilla scent. Burns cleanly for up to 50 hours." },
  { id: 16, name: "Cotton Throw Blanket", category: "home", price: 58.00, originalPrice: 78.00, image: "images/product-16.jpg", badge: "sale", sizes: ["130x170cm"], colors: ["Cream","Grey","Navy"], desc: "Soft cotton throw blanket with a textured weave. Lightweight yet cozy, perfect for sofa or bed styling." },
  { id: 17, name: "Wooden Serving Board", category: "home", price: 38.00, image: "images/product-17.jpg", badge: "", sizes: ["Small","Large"], colors: ["Natural"], desc: "Handcrafted acacia wood serving board. Beautiful grain pattern, ideal for cheese, charcuterie, or bread." },
  { id: 18, name: "Stoneware Mug Set", category: "home", price: 32.00, image: "images/product-18.jpg", badge: "new", sizes: ["Set of 4"], colors: ["White","Earth Tone"], desc: "Set of four artisan stoneware mugs with a matte glaze. Microwave and dishwasher safe, holds 350ml each." }
];

/* === Cart Management === */
let cart = JSON.parse(localStorage.getItem('newluck_cart') || '[]');

function saveCart() {
  localStorage.setItem('newluck_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, size, color, qty) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const key = `${productId}-${size || ''}-${color || ''}`;
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.qty += (qty || 1);
  } else {
    cart.push({
      key: key,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size || '',
      color: color || '',
      qty: qty || 1
    });
  }

  saveCart();
  showToast('Added to cart successfully!');
}

function removeFromCart(key) {
  cart = cart.filter(item => item.key !== key);
  saveCart();
  if (typeof renderCartPage === 'function') renderCartPage();
}

function updateCartItemQty(key, newQty) {
  const item = cart.find(i => i.key === key);
  if (item) {
    if (newQty <= 0) {
      removeFromCart(key);
    } else {
      item.qty = newQty;
      saveCart();
      if (typeof renderCartPage === 'function') renderCartPage();
    }
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartCount() {
  const countEls = document.querySelectorAll('.cart-count');
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  countEls.forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

/* === Toast Notification === */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/* === Hero Slider === */
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  if (slides.length === 0) return;

  let current = 0;
  let interval;

  function goTo(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    current = index % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo((current - 1 + slides.length) % slides.length); }

  function startAuto() { interval = setInterval(next, 5000); }
  function stopAuto() { clearInterval(interval); }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  startAuto();
}

/* === Mobile Menu === */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('active');
    btn.classList.toggle('active');
  });
}

/* === Search Toggle === */
function initSearch() {
  const searchBtn = document.querySelector('.search-toggle');
  const searchBox = document.querySelector('.search-box');
  if (!searchBtn || !searchBox) return;

  searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
      searchBox.querySelector('input').focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && e.target !== searchBtn) {
      searchBox.classList.remove('active');
    }
  });

  searchBox.querySelector('input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) {
        window.location.href = `list.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

/* === Back to Top === */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* === FAQ Accordion === */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* === Product Card Rendering === */
function renderProductCard(product) {
  const badgeHTML = product.badge
    ? `<span class="badge ${product.badge === 'sale' ? 'badge-sale' : ''}">${product.badge}</span>`
    : '';
  const originalHTML = product.originalPrice
    ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`
    : '';

  return `
    <div class="product-card" data-id="${product.id}">
      <a href="detail.html?id=${product.id}" class="product-img">
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <button class="add-to-cart-btn" onclick="event.preventDefault();event.stopPropagation();addToCart(${product.id},'${product.sizes[0]}','${product.colors[0]}',1)">Add To Cart</button>
      </a>
      <div class="product-info">
        <a href="detail.html?id=${product.id}" class="product-name">${product.name}</a>
        <div class="product-price">$${product.price.toFixed(2)} ${originalHTML}</div>
      </div>
    </div>
  `;
}

/* === Home Page Sections === */
function renderHomeSections() {
  const newContainer = document.getElementById('new-arrivals');
  const hotContainer = document.getElementById('hot-sale');

  if (newContainer) {
    const newProducts = PRODUCTS.filter(p => p.badge === 'new');
    newContainer.innerHTML = newProducts.map(p => renderProductCard(p)).join('');
  }

  if (hotContainer) {
    const saleProducts = PRODUCTS.filter(p => p.badge === 'sale');
    hotContainer.innerHTML = saleProducts.map(p => renderProductCard(p)).join('');
  }
}

/* === List Page Rendering === */
function renderListPage() {
  const grid = document.getElementById('product-list-grid');
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'all';
  const sort = params.get('sort') || 'default';
  const search = params.get('search') || '';

  let filtered = [...PRODUCTS];

  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  // Filter by search
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (sort) {
    case 'price-low': filtered.sort((a,b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a,b) => b.price - a.price); break;
    case 'name': filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
  }

  // Update count
  const countEl = document.getElementById('result-count');
  if (countEl) countEl.textContent = `${filtered.length} Products`;

  // Render
  grid.innerHTML = filtered.length > 0
    ? filtered.map(p => renderProductCard(p)).join('')
    : '<p style="text-align:center;color:#999;padding:40px;">No products found.</p>';

  // Set active filters
  document.querySelectorAll('.filter-category').forEach(el => {
    if (el.dataset.category === category) el.checked = true;
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = sort;
}

function initListFilters() {
  document.querySelectorAll('.filter-category').forEach(el => {
    el.addEventListener('change', () => {
      const params = new URLSearchParams(window.location.search);
      params.set('category', el.dataset.category);
      params.delete('search');
      window.location.search = params.toString();
    });
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const params = new URLSearchParams(window.location.search);
      params.set('sort', sortSelect.value);
      window.location.search = params.toString();
    });
  }
}

/* === Detail Page Rendering === */
function renderDetailPage() {
  const container = document.getElementById('detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    container.innerHTML = '<p style="text-align:center;padding:60px;color:#999;">Product not found.</p>';
    return;
  }

  // Set page title
  document.title = `${product.name} | NewLuck.store`;

  const thumbsHTML = [product.image, product.image, product.image].map((img, i) =>
    `<div class="thumb ${i === 0 ? 'active' : ''}" onclick="changeMainImage(this,'${img}')"><img src="${img}" alt="Thumb ${i+1}"></div>`
  ).join('');

  const sizesHTML = product.sizes.map((s, i) =>
    `<button class="option-btn ${i === 0 ? 'selected' : ''}" onclick="selectOption(this,'size','${s}')">${s}</button>`
  ).join('');

  const colorsHTML = product.colors.map((c, i) =>
    `<button class="option-btn ${i === 0 ? 'selected' : ''}" onclick="selectOption(this,'color','${c}')">${c}</button>`
  ).join('');

  const originalHTML = product.originalPrice
    ? `<span class="original-price" style="text-decoration:line-through;color:#aaa;font-weight:400;margin-left:10px;font-size:1.1rem;">$${product.originalPrice.toFixed(2)}</span>`
    : '';

  container.innerHTML = `
    <div class="detail-images">
      <div class="main-image"><img id="main-product-img" src="${product.image}" alt="${product.name}"></div>
      <div class="thumb-list">${thumbsHTML}</div>
    </div>
    <div class="detail-info">
      <h1>${product.name}</h1>
      <div class="detail-price">$${product.price.toFixed(2)} ${originalHTML}</div>
      <div class="detail-desc">${product.desc}</div>
      <div class="option-group">
        <label>Size</label>
        <div class="options" id="size-options">${sizesHTML}</div>
      </div>
      <div class="option-group">
        <label>Color</label>
        <div class="options" id="color-options">${colorsHTML}</div>
      </div>
      <div class="option-group">
        <label>Quantity</label>
        <div class="quantity-control">
          <button onclick="changeQty(-1)">-</button>
          <input type="number" id="product-qty" value="1" min="1" max="99" readonly>
          <button onclick="changeQty(1)">+</button>
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" onclick="handleAddToCart(${product.id})">Add To Cart</button>
      </div>
      <div style="font-size:0.8rem;color:#999;margin-top:10px;">
        <p>✓ Free Shipping on Orders Over $59</p>
        <p>✓ 30-Day Easy Returns</p>
        <p>✓ Secure Checkout</p>
      </div>
    </div>
  `;

  // Render related products
  const relatedContainer = document.getElementById('related-products');
  if (relatedContainer) {
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedContainer.innerHTML = related.map(p => renderProductCard(p)).join('');
  }
}

function changeMainImage(thumbEl, src) {
  document.getElementById('main-product-img').src = src;
  document.querySelectorAll('.thumb-list .thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

let selectedSize = '';
let selectedColor = '';

function selectOption(btn, type, value) {
  const container = btn.parentElement;
  container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  if (type === 'size') selectedSize = value;
  if (type === 'color') selectedColor = value;
}

function changeQty(delta) {
  const input = document.getElementById('product-qty');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 99) val = 99;
  input.value = val;
}

function handleAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const size = selectedSize || product.sizes[0];
  const color = selectedColor || product.colors[0];
  const qty = parseInt(document.getElementById('product-qty').value) || 1;

  addToCart(productId, size, color, qty);
}

/* === Cart Page Rendering === */
function renderCartPage() {
  const container = document.getElementById('cart-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <h2>Your cart is empty</h2>
        <p style="color:#999;margin-bottom:20px;">Looks like you haven't added anything yet.</p>
        <a href="list.html" class="btn btn-outline">Continue Shopping</a>
      </div>
    `;
    return;
  }

  const rowsHTML = cart.map(item => `
    <tr>
      <td data-label="Product">
        <div class="cart-item-info">
          <div class="cart-item-img"><a href="detail.html?id=${item.id}"><img src="${item.image}" alt="${item.name}"></a></div>
          <div>
            <a href="detail.html?id=${item.id}" class="cart-item-name">${item.name}</a>
            ${item.size || item.color ? `<div class="cart-item-variant">${item.size ? 'Size: '+item.size : ''}${item.size && item.color ? ' / ' : ''}${item.color ? 'Color: '+item.color : ''}</div>` : ''}
          </div>
        </div>
      </td>
      <td data-label="Price">$${item.price.toFixed(2)}</td>
      <td data-label="Quantity">
        <div class="qty-control">
          <button onclick="updateCartItemQty('${item.key}',${item.qty - 1})">-</button>
          <input type="number" value="${item.qty}" readonly>
          <button onclick="updateCartItemQty('${item.key}',${item.qty + 1})">+</button>
        </div>
      </td>
      <td data-label="Total">$${(item.price * item.qty).toFixed(2)}</td>
      <td><span class="cart-remove" onclick="removeFromCart('${item.key}')">Remove</span></td>
    </tr>
  `).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 59 ? 0 : 9.99;
  const total = subtotal + shipping;

  container.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rowsHTML}</tbody>
    </table>
    <div class="cart-summary">
      <h3>Order Summary</h3>
      <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$'+shipping.toFixed(2)}</span></div>
      <div class="summary-total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      <button class="btn btn-primary" onclick="checkout()">Proceed to Checkout</button>
      <a href="list.html" class="btn btn-outline" style="margin-top:10px;text-align:center;display:block;">Continue Shopping</a>
    </div>
  `;
}

function checkout() {
  showToast('Checkout is not available in demo mode.');
}

/* === Contact Form === */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message sent successfully! We\'ll reply within 24 hours.');
    form.reset();
  });
}

/* === Initialize === */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initSlider();
  initMobileMenu();
  initSearch();
  initBackToTop();
  initFAQ();
  initContactForm();

  // Page-specific init
  if (document.getElementById('new-arrivals')) renderHomeSections();
  if (document.getElementById('product-list-grid')) { renderListPage(); initListFilters(); }
  if (document.getElementById('detail-container')) {
    // Set defaults
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = PRODUCTS.find(p => p.id === id);
    if (product) {
      selectedSize = product.sizes[0];
      selectedColor = product.colors[0];
    }
    renderDetailPage();
  }
  if (document.getElementById('cart-container')) renderCartPage();
});
