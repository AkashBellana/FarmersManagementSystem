// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(productName, price, category) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, category: category });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Send category data to the backend for storage
    sendCategoryToBackend(category);
}

// Function to send category to backend
function sendCategoryToBackend(category) {
    fetch('/api/customers/purchase', { // Ensure this matches your backend route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category: category })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Successfully stored category:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Function to remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to toggle cart visibility
function toggleCart() {
    const cartSection = document.getElementById('cart');
    if (cartSection) {
        cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
    }
}

// Function to update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartBtn = document.getElementById('cart-btn');

    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity} <button onclick="removeFromCart('${item.name}')">Remove</button>`;
            cartItems.appendChild(listItem);
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        if (cartBtn) {
            cartBtn.textContent = `Cart (${itemCount})`;
        }
    }
}

// Function to handle checkout
function checkout() {
    alert('Checkout functionality is not implemented yet.');
}

// Update cart display on page load
updateCartDisplay();
