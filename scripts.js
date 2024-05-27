const navbarContainer = document.getElementById('navbar-container');
if (navbarContainer) {
    fetch('https://nhwoodsaa.github.io/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
} else {
    console.error('Navbar container element not found');
}
