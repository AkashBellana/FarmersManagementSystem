// Handle farmer registration
function registerFarmer() {
    const regName = document.getElementById('regName').value;
    const regPassword = document.getElementById('regPassword').value;
    const regFarmSize = document.getElementById('regFarmSize').value;
    const regCrops = document.getElementById('regCrops').value;

    // Simple registration validation
    if (regName && regPassword && regFarmSize && regCrops) {
        // Store registration details in local storage for farmers
        let farmers = JSON.parse(localStorage.getItem('farmers')) || [];
        farmers.push({
            username: regName,
            password: regPassword,
            farmSize: regFarmSize,
            crops: regCrops
        });
        localStorage.setItem('farmers', JSON.stringify(farmers));

        alert('Farmer registration successful!');
        // Redirect to login page or another appropriate page
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all fields!');
    }
}

// Add event listener to the register button after DOM has loaded
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', registerFarmer);
});
