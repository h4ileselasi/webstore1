let cart = [];
const DELIVERY_FEE = 50; // fixed delivery fee

const cartCountEl = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const overlay = document.getElementById("overlay");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

// Add to cart buttons
const buttons = document.querySelectorAll(".add-to-cart");
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const productCard = btn.closest(".product-card");
    const name = productCard.querySelector("h3").textContent;
    const price = parseInt(
      productCard.querySelector(".price").textContent.replace("GHS ", "")
    );

    // check if item exists in cart
    let existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    updateCart();
  });
});

// Update cart UI
function updateCart() {
  cartItemsEl.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.name}</p>
      <div class="cart-controls">
        <button class="qty-btn decrease">-</button>
        <span class="qty">${item.qty}</span>
        <button class="qty-btn increase">+</button>
        <p>GHS ${item.price * item.qty}</p>
        <button class="remove-btn">🗑</button>
      </div>
    `;

    // Increase qty
    div.querySelector(".increase").addEventListener("click", () => {
      item.qty++;
      updateCart();
    });

    // Decrease qty
    div.querySelector(".decrease").addEventListener("click", () => {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    });

    // Remove item
    div.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    cartItemsEl.appendChild(div);
  });

  // Update cart counter
  cartCountEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);

  // Add delivery fee
  let total = subtotal + DELIVERY_FEE;

  // Show both subtotal + delivery
  cartTotalEl.innerHTML = `
    <div style="font-size: 0.9rem; color: #555">Subtotal: GHS ${subtotal}</div>
    <div style="font-size: 0.9rem; color: #555">Delivery: GHS ${DELIVERY_FEE}</div>
    <strong>Total: GHS ${total}</strong>
  `;
}

// Open cart
document.querySelector(".cart-icon").addEventListener("click", () => {
  cartSidebar.classList.add("open");
  overlay.classList.add("active");
});

// Close cart
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function closeCart() {
  cartSidebar.classList.remove("open");
  overlay.classList.remove("active");
}

// Checkout → WhatsApp
// Checkout → WhatsApp
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  let message = "🛒 *NEW ORDER*\n\n";
  let subtotal = 0;

  // Products list
  cart.forEach((item) => {
    message += `▫️ ${item.name} x${item.qty} = GHS ${item.price * item.qty}\n`;
    subtotal += item.price * item.qty;
  });

  let total = subtotal + DELIVERY_FEE;

  // Totals
  message += `\n📦 Subtotal: *GHS ${subtotal}*`;
  message += `\n🚚 Delivery Fee: *GHS ${DELIVERY_FEE}*`;
  message += `\n💵 TOTAL PAYABLE: *GHS ${total}*\n\n`;

  // Customer details placeholders
  message += "👤 *CUSTOMER DETAILS*\n";
  message += "▪️ Name: [Enter your name]\n";
  message += "▪️ Contact: [Enter your contact]\n";
  message += "▪️ Location: [Enter delivery location]\n";
  message += "▪️ Shoe Size: [Enter shoe size]\n";
  message += "▪️ Guarantor’s Name: [Enter guarantor's name]\n";
  message += "▪️ Guarantor’s Contact: [Enter guarantor's number]\n";

  const phoneNumber = "233548829295";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "grid" : "none";
    dots[i].classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Auto slide every 5s
setInterval(nextSlide, 5000);

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    showSlide(i);
  });
});

// Init
showSlide(currentIndex);
// --- Load cart from localStorage when page loads ---
window.addEventListener("load", () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
});

// --- Save cart to localStorage whenever it updates ---
function updateCart() {
  cartItemsEl.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.name}</p>
      <div class="cart-controls">
        <button class="qty-btn decrease">-</button>
        <span class="qty">${item.qty}</span>
        <button class="qty-btn increase">+</button>
        <p>GHS ${item.price * item.qty}</p>
        <button class="remove-btn">🗑</button>
      </div>
    `;

    // Increase qty
    div.querySelector(".increase").addEventListener("click", () => {
      item.qty++;
      updateCart();
    });

    // Decrease qty
    div.querySelector(".decrease").addEventListener("click", () => {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    });

    // Remove item
    div.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    cartItemsEl.appendChild(div);
  });

  // Update cart counter
  cartCountEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);

  // Add delivery fee
  let total = subtotal + DELIVERY_FEE;

  // Show both subtotal + delivery
  cartTotalEl.innerHTML = `
    <div style="font-size: 0.9rem; color: #555">Subtotal: GHS ${subtotal}</div>
    <div style="font-size: 0.9rem; color: #555">Delivery: GHS ${DELIVERY_FEE}</div>
    <strong>Total: GHS ${total}</strong>
  `;

  // 🔹 Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}
