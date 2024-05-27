(async () => {
    try {
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) {
            console.error('Navbar container element not found');
            return;
        }

        const response = await fetch('https://nhwoodsaa.github.io/navbar.html');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.text();
        navbarContainer.innerHTML = data;
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
})();
