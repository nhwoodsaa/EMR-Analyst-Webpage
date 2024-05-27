// This JavaScript snippet can be used to add functionality, such as a responsive hamburger menu for mobile devices

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelector('.navbar-links');

    const toggleMenu = () => {
        navbarLinks.classList.toggle('active');
    };

    navbar.addEventListener('click', toggleMenu);
});
