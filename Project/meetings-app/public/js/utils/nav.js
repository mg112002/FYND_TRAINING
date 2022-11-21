

const toggler = document.querySelector('.main-menu-toggler');
const userEl = document.getElementById('user-name')
const KEY_EMAIL = window.localStorage.email
const logoutEl = document.getElementById('logout')

if (userEl) {
    userEl.innerHTML += KEY_EMAIL + "!"
}

if (logoutEl) {
    logoutEl.addEventListener('click', function () {
        localStorage.setItem('token', "")
        window.location.href = '/login.html'
    })
}


toggler.addEventListener('click', function () {
    const mainMenuLinks = document.querySelectorAll('.main-menu-link');

    for (let i = 0; i < mainMenuLinks.length; i++) {
        mainMenuLinks[i].classList.toggle('d-sm-none');
    }
});