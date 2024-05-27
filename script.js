document.addEventListener("DOMContentLoaded", () => {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const navbarContainer = document.getElementById('navbar-container');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
            } else {
                console.error('Navbar container element not found');
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
});
