import CartManager from "./utils/cart-manager.js";

/* ================= HERO SLIDER ================= */
const slides = document.getElementById("heroSlides");
const dotsContainer = document.getElementById("heroDots");
const dots = dotsContainer.querySelectorAll(".dot");

const slideCount = slides.children.length;
let index = 0;
let intervalId;

function updateCarousel(newIndex) {
  index = newIndex;

  // Move slides
  slides.style.transform = `translateX(-${index * 100}%)`;

  // Update dots
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove("bg-gray-500");
      dot.classList.add("bg-red-500", "scale-125");
    } else {
      dot.classList.remove("bg-red-500", "scale-125");
      dot.classList.add("bg-gray-500");
    }
  });
}

function startAutoSlide() {
  intervalId = setInterval(() => {
    const nextIndex = (index + 1) % slideCount;
    updateCarousel(nextIndex);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(intervalId);
  startAutoSlide();
}

// Dot click navigation
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    updateCarousel(i);
    resetAutoSlide();
  });
});

// Init
updateCarousel(0);
startAutoSlide();


/* ================= FLASH SALE COUNTDOWN ================= */

// Set flash sale end time (example: 72 hours from now)
const flashSaleEnd = new Date();
flashSaleEnd.setHours(flashSaleEnd.getHours() + 72);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateFlashCountdown() {
  const now = Date.now();
  const distance = flashSaleEnd - now;

  if (distance <= 0) return;

  daysEl.textContent = String(Math.floor(distance / 86400000)).padStart(2, "0");
  hoursEl.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
  minutesEl.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
  secondsEl.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
}

updateFlashCountdown();
setInterval(updateFlashCountdown, 1000);


/* ================= FLASH SALES SLIDER ================= */

const flashTrack = document.getElementById("flash-track");
const flashPrev = document.getElementById("flash-prev");
const flashNext = document.getElementById("flash-next");

const flashCardWidth = 260 + 24; // card width + gap
let flashIndex = 0;

function updateFlashSlider() {
  flashTrack.style.transform =
    `translateX(-${flashIndex * flashCardWidth}px)`;
}

// Navigation
flashNext.addEventListener("click", () => {
  const maxIndex =
    flashTrack.children.length - 4; // visible cards (desktop)
  if (flashIndex < maxIndex) {
    flashIndex++;
    updateFlashSlider();
  }
});

flashPrev.addEventListener("click", () => {
  if (flashIndex > 0) {
    flashIndex--;
    updateFlashSlider();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    if (flashIndex < flashTrack.children.length - 4) {
      flashIndex++;
      updateFlashSlider();
    }
  } else if (e.key === "ArrowLeft") {
    if (flashIndex > 0) {
      flashIndex--;
      updateFlashSlider();
    }
  }
});

// Scroll navigation
flashTrack.addEventListener("wheel", (e) => {
  if (e.deltaY < 0 && flashIndex > 0) {
    flashIndex--;
    updateFlashSlider();
  } else if (e.deltaY > 0 && flashIndex < flashTrack.children.length - 4) {
    flashIndex++;
    updateFlashSlider();
  }
});

// prevent default scroll behavior
flashTrack.addEventListener("wheel", (e) => {
  e.preventDefault();
});


/* ================= Category System ================= */
const categories = Array.from(
  document.querySelectorAll(".js-category")
);

let activeIndex = -1;

// Helpers
function updateCategoryUI(index, isActive) {
  const btn = categories[index];
  const img = btn.querySelector("img");

  btn.classList.toggle("is-active", isActive);
  img.src = isActive ? btn.dataset.iconSelected : btn.dataset.icon;
}

function selectCategory(index) {
  if (activeIndex !== -1) {
    updateCategoryUI(activeIndex, false);
  }

  updateCategoryUI(index, true);
  activeIndex = index;
}

// Init Icons
categories.forEach((btn) => {
  btn.querySelector("img").src = btn.dataset.icon;
});

// Click Selection
categories.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (activeIndex === index) {
      updateCategoryUI(index, false);
      activeIndex = -1;
    } else {
      selectCategory(index);
    }
  });
});

// Outside click behavior
document.addEventListener("click", (e) => {
  const isCategoryClick = e.target.closest('.js-category');
  const isNavClick = e.target.closest('#category-prev') || e.target.closest('#category-next');
  
  if (!isCategoryClick && !isNavClick && activeIndex !== -1) {
    updateCategoryUI(activeIndex, false);
    activeIndex = -1;
  }
});

// Navigation
document.getElementById("category-next").addEventListener("click", () => {
  if (!categories.length) return;

  const nextIndex =
    activeIndex === -1 || activeIndex === categories.length - 1
      ? 0
      : activeIndex + 1;

  selectCategory(nextIndex);
});

document.getElementById("category-prev").addEventListener("click", () => {
  if (!categories.length) return;

  const prevIndex =
    activeIndex <= 0
      ? categories.length - 1
      : activeIndex - 1;

  selectCategory(prevIndex);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {

  // Ignore if focus is inside an input or textarea
  const tag = document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  // Only handle left/right arrows
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

  if (!categories.length) return;

  e.preventDefault();

  let nextIndex;

  // Handle right arrow
  if (e.key === "ArrowRight") {
    nextIndex =
      activeIndex === -1 || activeIndex === categories.length - 1
        ? 0
        : activeIndex + 1;
  }

  // Handle left arrow
  if (e.key === "ArrowLeft") {
    nextIndex =
      activeIndex <= 0
        ? categories.length - 1
        : activeIndex - 1;
  }

  selectCategory(nextIndex);
});


/* ================= PROMO COUNTDOWN ================= */

// Set a fixed target time (e.g., 5 days from now)
const promoEndTime = new Date().getTime() + (5 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000);

function updatePromoTimer() {
  const now = new Date().getTime();
  const distance = promoEndTime - now;

  if (distance < 0) return;

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("promo-days").textContent = String(d).padStart(2, '0');
  document.getElementById("promo-hours").textContent = String(h).padStart(2, '0');
  document.getElementById("promo-minutes").textContent = String(m).padStart(2, '0');
  document.getElementById("promo-seconds").textContent = String(s).padStart(2, '0');
}

setInterval(updatePromoTimer, 1000);
updatePromoTimer();


/* ================= COLOR SWATCH SELECTION ================= */
const swatches = document.querySelectorAll('.js-color-swatch');

swatches.forEach(swatch => {
  swatch.addEventListener('click', function() {
    const parentCard = this.closest('.js-product-card');
    
    const siblingSwatches = parentCard.querySelectorAll('.js-color-swatch');

    siblingSwatches.forEach(s => {
      s.classList.remove('ring-2', 'ring-offset-2', 'ring-black');
    });

    this.classList.add('ring-2', 'ring-offset-2', 'ring-black');
  });
});

document.querySelectorAll('.js-product-card').forEach(card => {
  const firstSwatch = card.querySelector('.js-color-swatch');
  if (firstSwatch) firstSwatch.click();
});


/* ================= SCROLL TO TOP ================= */
document.getElementById("scroll-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


/* ================= ADD TO CART ================== */
document.querySelectorAll('.js-product-card').forEach(card => {
  const addBtn = card.querySelector('.js-add-to-cart');
  addBtn?.addEventListener('click', () => {
    const product = {
      name: card.querySelector('.js-product-name').textContent.trim(),
      price: parseFloat(card.querySelector('.js-price-value')?.textContent.replace('$', '')),
      image: card.querySelector('img')?.src,
      quantity: 1,
      color: 'Default',
      size: 'Standard'
    };
    window.CartManager.addItem(product);
  });
});


/* ================= PRODUCT DETAIL NAVIGATION ================== */
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