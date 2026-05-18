// State Management
let cart = [];
let purchaseHistory = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const productCards = document.querySelectorAll('.product-card');
const cartModal = document.getElementById('cartModal');
const historyModal = document.getElementById('historyModal');
const cartIcon = document.getElementById('cartIcon');
const historyLink = document.getElementById('historyLink');
const closeCart = document.getElementById('closeCart');
const closeHistory = document.getElementById('closeHistory');
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const historyItemsContainer = document.getElementById('historyItems');

// 1. Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    productCards.forEach(card => {
        const productName = card.getAttribute('data-name');
        if (productName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// 2. Add to Cart Functionality
window.addToCart = function (name, price) {
    cart.push({ name, price });
    updateCartUI();
    alert(name + " added to cart!");
};

function updateCartUI() {
    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceEl.innerText = '0.00';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `;
        total += item.price;
    });

    cartItemsContainer.innerHTML = html;
    totalPriceEl.innerText = total.toFixed(2);
}

// 3. Checkout / Purchase Functionality
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Add to purchase history
    const date = new Date().toLocaleString();
    const orderTotal = cart.reduce((sum, item) => sum + item.price, 0);

    purchaseHistory.push({
        date: date,
        items: [...cart],
        total: orderTotal
    });

    // Clear cart
    cart = [];
    updateCartUI();
    updateHistoryUI();

    // Close modal and show success
    cartModal.classList.remove('active');
    alert("Purchase successful! Like Amazon, your order is on the way.");
});

// 4. Purchase History UI
function updateHistoryUI() {
    if (purchaseHistory.length === 0) {
        historyItemsContainer.innerHTML = '<p>No past purchases found.</p>';
        return;
    }

    let html = '';
    purchaseHistory.forEach((order, index) => {
        html += `
            <div style="margin-bottom: 1.5rem; border: 1px solid #eee; padding: 1rem; border-radius: 8px;">
                <p><strong>Order Date:</strong> ${order.date}</p>
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                <ul style="margin-top: 0.5rem; padding-left: 1rem; list-style-type: disc;">
                    ${order.items.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
                </ul>
            </div>
        `;
    });

    historyItemsContainer.innerHTML = html;
}

// Modal Toggle Logic
cartIcon.addEventListener('click', () => cartModal.classList.add('active'));
closeCart.addEventListener('click', () => cartModal.classList.remove('active'));

historyLink.addEventListener('click', (e) => {
    e.preventDefault();
    historyModal.classList.add('active');
});
closeHistory.addEventListener('click', () => historyModal.classList.remove('active'));

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.classList.remove('active');
    if (e.target === historyModal) historyModal.classList.remove('active');
});
