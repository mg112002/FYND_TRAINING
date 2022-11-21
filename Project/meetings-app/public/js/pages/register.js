import ajax from "../utils/ajax.js"

const registerForm = document.getElementById('register-form')
const nameElmnt = document.getElementById('name')
const emailElmnt = document.getElementById('email')
const passwordElmnt = document.getElementById('password')
const errorElmnt = document.getElementById('registration-errors')

// Form validation
const validateForm = (email, password) => {
    let errors = ""

    if (!/^[A-Za-z][A-Za-z0-9_\.]*[@][a-z][\.][a-z]$/.test(email)) {
        errors += "Email not Valid! "
    }
    if (password.length < 8) {
        errors += "Password should be minimum 8 characters. "
    }
    if (/[A-Z]/.test(password) === false) {
        errors += 'At least 1 uppercase. '
    }
    if (/[a-z]/.test(password) === false) {
        errors += 'At least 1 lowercase. '
    }
    if (/[&%$#@!~}{}\[\];:]/.test(password) === false) {
        errors += 'At least 1 special character. '
    }
    if (/[0-9]/.test(password) === false) {
        errors += 'At least 1 digit.'
    }
    return errors.trim()
}


registerForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    const name = nameElmnt.value.trim()
    const email = emailElmnt.value.trim()
    const password = passwordElmnt.value.trim()

    const registrationErrors = validateForm(email, password)

    if (registrationErrors) {
        errorElmnt.style = "color:red"
        errorElmnt.textContent = registrationErrors
        return
    }

    const userDetails = {
        name: name,
        email: email,
        password: password
    }

    const data = await ajax(`${BASE_URL}/auth/register`, "POST", userDetails, "")
    window.location.href = '/login.html'
})