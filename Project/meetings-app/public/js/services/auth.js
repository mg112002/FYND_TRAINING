import ajax from "../utils/ajax.js"

const KEY_TOKEN = 'token'
const KEY_NAME = 'name'
const KEY_EMAIL = 'email'
export const BASE_URL = 'https://mymeetingsapp.herokuapp.com/api'

const login = async (loginDetails) => {
    const data = await ajax(`${BASE_URL}/auth/login`, 'POST', loginDetails)
    localStorage.setItem(KEY_EMAIL, data.email)
    localStorage.setItem(KEY_NAME, data.name)
    localStorage.setItem(KEY_TOKEN, data.token)
    return data
}

export { login }