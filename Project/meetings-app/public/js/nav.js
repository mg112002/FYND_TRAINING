const toggler = document.querySelector('.main-menu-toggler');

toggler.addEventListener('click', function () {
    // querySelectorAll returns an array of objects (DOM nodes)
    const mainMenuLinks = document.querySelectorAll('.main-menu-link');

    for (let i = 0; i < mainMenuLinks.length; i++) {
        mainMenuLinks[i].classList.toggle('d-sm-none');
    }
});