const registerForm = document.getElementById('register-form')
const nameElmnt = document.getElementById('name')
const emailElmnt = document.getElementById('email')
const passwordElmnt = document.getElementById('password')
const errorElmnt = document.getElementById('registration-errors')


// Form validation
const validateForm = (email, password) => {
    let errors = ""

    if (!/^[A-Za-z][A-Za-z0-9_\.\-@]*$/.test(email)) {
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

const registerUser = () => {
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault()

        const name = nameElmnt.value().trim()
        const email = emailElmnt.value().trim()
        const password = passwordElmnt.value().trim()

        const registrationErrors = validateForm(email, password)

        errorElmnt.textContent = registrationErrors

        if (registrationErrors) {
            return
        }

        const userDetails = {
            name: name,
            email: email,
            password: password
        }

        // Send details of user for registration

    })
}