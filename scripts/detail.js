import CartManager from './utils/cart-manager.js';

/* =============== PRODUCT DETAIL PAGE LOGIC ================= */
document.addEventListener('DOMContentLoaded', () => {

  // Load selected product
  const productData = CartManager.getSelectedProduct();
  
  if (productData) {
    const mainImg = document.getElementById('main-product-img');
    const title = document.querySelector('.js-product-name-title');
    const price = document.querySelector('.js-product-price');
    const breadcrumb = document.querySelector('.js-product-name-breadcrumb');

    if (mainImg) mainImg.src = productData.image;
    if (title) title.textContent = productData.name;
    if (price) price.textContent = productData.price;
    if (breadcrumb) breadcrumb.textContent = productData.name;
    
    document.title = `${productData.name} - Exclusive Store`;
  }

  // Related Items navigation
  document.querySelectorAll('.js-product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.js-add-to-cart')) return;

      const link = e.target.closest('a');

      if (link) e.preventDefault();
      
      const product = {
        name: card.querySelector('.js-product-name').textContent.trim(),
        price: card.querySelector('.js-price-value')?.textContent.trim(),
        image: card.querySelector('img')?.src,
      };

      CartManager.saveSelectedProduct(product);
      window.location.href = 'product-detail.html';
    });
  });

  // --- Thumbnail Switcher ---
  const mainImg = document.getElementById('main-product-img');
  const thumbs = document.querySelectorAll('.js-thumb-img');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.querySelector('img').src;
      const transform = thumb.querySelector('img').style.transform;
      const filter = thumb.querySelector('img').style.filter;
      
      mainImg.src = src;
      mainImg.style.transform = transform;
      mainImg.style.filter = filter;

      // Update active border
      thumbs.forEach(t => t.classList.replace('border-gray-400', 'border-transparent'));
      thumb.classList.replace('border-transparent', 'border-gray-400');
    });
  });

  // --- Color Selection ---
  const colorBtns = document.querySelectorAll('.js-color-btn');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.replace('ring-black', 'ring-transparent'));
      btn.classList.replace('ring-transparent', 'ring-black');
    });
  });

  // --- Size Selection ---
  const sizeBtns = document.querySelectorAll('.js-size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => {
        b.classList.remove('bg-red-500', 'text-white', 'border-red-500');
      });
      btn.classList.add('bg-red-500', 'text-white', 'border-red-500');
    });
  });

  // --- Quantity Selector & Buy Now & Add to Cart ---
  const qtyInput = document.getElementById('qty-input');
  const btnPlus = document.getElementById('qty-plus');
  const btnMinus = document.getElementById('qty-minus');
  const buyNowBtn = document.getElementById('buy-now-btn');

  // 1. Quantity Controls
  btnPlus?.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  btnMinus?.addEventListener('click', () => {
    if (parseInt(qtyInput.value) > 1) {
      qtyInput.value = parseInt(qtyInput.value) - 1;
    }
  });

  // 2. Buy Now (Main Product)
  buyNowBtn?.addEventListener('click', () => {
    const product = {
      name: document.querySelector('.js-product-name-title').textContent.trim(),
      price: parseFloat(document.querySelector('.js-product-price').textContent.replace('$', '')),
      image: document.getElementById('main-product-img').src,
      quantity: parseInt(qtyInput.value),
      color: document.querySelector('.js-color-btn.ring-black')?.style.backgroundColor || 'Default',
      size: document.querySelector('.js-size-btn.bg-red-500')?.textContent.trim() || 'M'
    };
    CartManager.addItem(product);
    window.location.href = 'cart.html';
  });

  // 3. Add to Cart (Related Items)
  document.querySelectorAll('.js-product-card').forEach(card => {
    const addBtn = card.querySelector('.js-add-to-cart');
    addBtn?.addEventListener('click', () => {
      const product = {
        name: card.querySelector('.js-product-name').textContent.trim(),
        price: parseFloat(card.querySelector('.js-price-value').textContent.replace('$', '')),
        image: card.querySelector('img').src,
        quantity: 1,
        color: 'Default',
        size: 'Standard'
      };
      CartManager.addItem(product);
    });
  });
});