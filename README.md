# Exclusive Store - E-Commerce Frontend

A modern, responsive e-commerce web application developed as a final project for a Frontend Development course. This project simulates a real-world shopping experience, focusing on clean UI/UX and dynamic data handling without a backend. **This project is now based on Vanilla JS and soon will be migrated to React JS base and other extra features.**

## Features

- **Dynamic Hero Slider:** Fully functional carousel for featured promotions.
- **Flash Sale Countdown:** Real-time countdown timer for marketing urgency.
- **Persistent Cart System:** Add, update, and remove items with data persisted in `localStorage`.
- **Dynamic Product Details:** A single detail page template that updates its content based on the product clicked.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views using Tailwind CSS.
- **Category Filtering:** Interactive category selection UI.

## Tech Stack

- **HTML5:** Semantic structure.
- **Tailwind CSS:** Utility-first styling (via CDN).
- **JavaScript (ES6+):** DOM manipulation, event handling, and LocalStorage management.
- **FontAwesome:** Professional iconography.

---

## Project Structure

```exclusive-store-final-project/
├── main.html              # Main landing page
├── product-detail.html     # Dynamic product information page
├── cart.html               # Shopping cart overview
├── scripts/
│   ├── main.js             # Logic for the home page
│   ├── detail.js           # Logic for product details
│   ├── cart.js             # Cart page operations
│   └── utils/
│       └── cart-manager.js # Centralized Cart & LocalStorage logic
├── styles/
│   └── pages/              # Custom CSS for specific layouts
│       ├── main.css
│       ├── product-detail.css
│       └── cart.css
└── assets/
    ├── icons/
    └── images/
```

---

## How to Run

### 1. Clone the repository

```bash

git clone https://github.com/amiropale/exclusive-store-final-project.git
cd exclusive-store-final-project
```

### 2. First use requirements

A) Use the **"Live Server"** extension in VS Code for opening **"main.html"** in your preferred web browser.

B) In browser before first use once have open page, go to browser dev tools (press F12) and in console tab run command:

```bash
localStorage.clear();
```

## License

This project is for **educational purposes only** and is free to use or modify for learning and practice.

## Author

Amir Malek - [My LinkedIn Profile](https://www.linkedin.com/in/amiropale/)
