/* ================= CART MANAGER  ================= */
window.CartManager = {
  getCart() {
    return JSON.parse(localStorage.getItem('exclusive_cart')) || [];
  },
  saveCart(cart) {
    localStorage.setItem('exclusive_cart', JSON.stringify(cart));
    this.updateBadge();
  },
  addItem(product) {
    let cart = this.getCart();

    // Check if same item already exists
    const existingIndex = cart.findIndex(item => 
      item.name === product.name && 
      item.color === product.color && 
      item.size === product.size
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += product.quantity;
    } else {
      cart.push(product);
    }

    this.saveCart(cart);
    alert(`${product.name} added to cart!`);
  },
  updateBadge() {
    const cart = this.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = totalItems;
    }
  },

  saveSelectedProduct(product) {
    localStorage.setItem('selected_product', JSON.stringify(product));
  },
  getSelectedProduct() {
    return JSON.parse(localStorage.getItem('selected_product'));
  }
};

// Initialize badge on page load
document.addEventListener('DOMContentLoaded', () => CartManager.updateBadge());

export default CartManager;