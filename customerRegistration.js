// Handle customer registration
function registerCustomer() {
    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;

    // Simple registration validation
    if (regUsername && regPassword) {
        // Store registration details in local storage for customers
        let customers = JSON.parse(localStorage.getItem('customers')) || [];
        customers.push({
            username: regUsername,
            password: regPassword
        });
        localStorage.setItem('customers', JSON.stringify(customers));

        alert('Customer registration successful!');
        // Redirect to login page or another appropriate page
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all fields!');
    }
}

// Add event listener to the register button after DOM has loaded
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', registerCustomer);
});
