function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch stored farmer details from local storage
    let users = JSON.parse(localStorage.getItem('farmers')) || [];
    let validFarmer = users.find(user => user.username === username && user.password === password);

    if (validFarmer) {
        // Set currentUser in localStorage when logged in successfully
        localStorage.setItem('currentUser', username);

        document.body.classList.add('bg-transition', 'bg-dashboard');
        document.getElementById('login').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('login').style.display = 'none';
            document.getElementById('productListingForm').style.display = 'block'; // Show product listing form
            showDashboard(); // Load and show the dashboard
        }, 500); // Wait for fade-out to complete
    } else if (username === 'customer' && password === 'customer123') {
        // Same handling for customer login...
    } else {
        alert('Invalid username or password!');
    }
}


// Handle adding a product to the logged-in user's list
document.getElementById("productListingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload on form submission

    const productName = document.getElementById("productName").value;
    const productCategory = document.getElementById("productCategory").value;
    const productPrice = document.getElementById("productPrice").value;
    const productStock = document.getElementById("productStock").value;

    const product = {
        name: productName,
        category: productCategory,
        price: productPrice,
        stock: productStock
    };

    const currentUser = localStorage.getItem('currentUser'); // Get the current user

    addProductToList(currentUser, product);

    document.getElementById("productListingForm").reset();

    loadProducts(currentUser);

    alert('Product added successfully!');
});

// Add product to user's list in localStorage
function addProductToList(userId, product) {
    // Check if products list exists for the current user in local storage
    let products = JSON.parse(localStorage.getItem(userId)) || [];

    // Add the new product to the user's list
    products.push(product);

    // Save the updated list back to local storage for the user
    localStorage.setItem(userId, JSON.stringify(products));

    console.log("Product List for " + userId + ":", products);
}


// Show sales dashboard
function showDashboard() {
    const dashboard = document.getElementById("salesDashboard");
    dashboard.classList.remove("hidden");

    // Load products from local storage and display them for the current user
    loadProducts();
}

// Load products for the logged-in user
function loadProducts() {
    // Get the current user from localStorage
    const userId = localStorage.getItem('currentUser');
    const dashboardContent = document.getElementById("dashboardContent");
    dashboardContent.innerHTML = ""; // Clear existing content

    let products = JSON.parse(localStorage.getItem(userId)) || [];

    if (products.length === 0) {
        // If no products, display "No products listed yet"
        const noProductsElement = document.createElement("p");
        noProductsElement.textContent = "No products listed yet.";
        noProductsElement.id = "noProductsMessage"; // Add an ID to the element
        dashboardContent.appendChild(noProductsElement);
    } else {
        // Hide the "No products listed yet" message if products are added
        const noProductsMessage = document.getElementById("noProductsMessage");
        if (noProductsMessage) {
            noProductsMessage.remove();
        }

        // Display the list of products with a "Remove" button
        products.forEach((product, index) => {
            updateDashboard(userId, product, index);
        });
    }
}

// Update dashboard with product
function updateDashboard(userId, product, index) {
    const dashboardContent = document.getElementById("dashboardContent");

    const productElement = document.createElement("div");
    productElement.classList.add("productItem");
    productElement.innerHTML = `
        <p>Product: ${product.name}, Category: ${product.category}, Price: $${product.price}, Stock: ${product.stock}</p>
        <button onclick="removeProduct('${userId}', ${index})">Remove</button>
    `;

    dashboardContent.appendChild(productElement);
}

// Remove product
function removeProduct(userId, index) {
    let products = JSON.parse(localStorage.getItem(userId)) || [];
    products.splice(index, 1);
    localStorage.setItem(userId, JSON.stringify(products));
    loadProducts(userId);
}

// On page load, check if a user is logged in
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        loadProducts(); // Load only the products for the current user
    }
};