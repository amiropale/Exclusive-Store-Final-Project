import CartManager from './utils/cart-manager.js';

/* ================= CART PAGE LOGIC ================= */
document.addEventListener('DOMContentLoaded', () => {
  const cartTableBody = document.querySelector('tbody');
  const subtotalElement = document.querySelector('.js-cart-subtotal');
  const totalElement = document.querySelector('.js-cart-total');
  const updateCartBtn = document.getElementById('update-cart-btn');

  function renderCart() {
    const cart = window.CartManager.getCart();
    if (!cartTableBody) return;

    if (cart.length === 0) {
      cartTableBody.innerHTML = '<tr><td colspan="4" class="py-10 text-center text-gray-500">Your cart is empty.</td></tr>';
      updateTotals(0);
      return;
    }

    cartTableBody.innerHTML = cart.map((item, index) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      
      return `
        <tr class="border-b js-cart-row" data-index="${index}">
          <td class="py-6 flex items-center gap-4">
            <div class="relative group">
              <img src="${item.image || ''}" alt="${item.name}" class="w-16 h-16 object-contain bg-gray-100 p-1">
              <button onclick="removeItem(${index})" class="absolute top-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <span class="text-sm font-medium">${item.name}</span>
          </td>
          <td class="py-6">$${price.toFixed(2)}</td>
          <td class="py-6">
            <input type="number" value="${quantity}" min="1" 
                class="js-quantity-input w-16 border rounded p-1 text-center focus:ring-1 focus:ring-red-500 outline-none">
          </td>
          <td class="py-6 text-right font-medium">$${(price * quantity).toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const subtotal = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0);
    updateTotals(subtotal);
  }

  function updateTotals(subtotal) {
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Update Cart Button Logic
  if (updateCartBtn) {
    updateCartBtn.addEventListener('click', () => {
      const cart = window.CartManager.getCart();
      const rows = document.querySelectorAll('.js-cart-row');
      
      rows.forEach(row => {
        const index = row.dataset.index;
        const newQty = parseInt(row.querySelector('.js-quantity-input').value);
        if (newQty > 0) {
          cart[index].quantity = newQty;
        }
      });

      window.CartManager.saveCart(cart);
      renderCart();
      alert("Cart Updated!");
    });
  }

  // Remove Button 
  window.removeItem = (index) => {
    let cart = window.CartManager.getCart();
    cart.splice(index, 1);
    window.CartManager.saveCart(cart);
    renderCart();
  };

  renderCart();
});