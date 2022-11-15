import { login } from "../services/auth.js"

const loginForm = document.getElementById('login-form')
const emailElmnt = document.getElementById('email')
const passwordElmnt = document.getElementById('password')

const loginAuthentication = () => {
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault()

        const loginDetails = {
            email: emailElmnt.value.trim(),
            password: passwordElmnt.value.trim()
        }

        await login(loginDetails)
        window.location.href = '/'
    })
}

document.addEventListener('DOMContentLoaded', loginAuthentication)