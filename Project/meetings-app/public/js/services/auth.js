import ajax from "../utils/ajax.js"

export const KEY_TOKEN = 'token'
export const KEY_NAME = 'name'
export const KEY_EMAIL = 'email'
export const BASE_URL = 'https://mymeetingsapp.herokuapp.com/api'

const login = async (loginDetails) => {
    const data = await ajax(`${BASE_URL}/auth/login`, 'POST', loginDetails)
    localStorage.setItem(KEY_EMAIL, data.email)
    localStorage.setItem(KEY_NAME, data.name)
    localStorage.setItem(KEY_TOKEN, data.token)
    return data
}

export { login }

// , { 'Authorization': KEY_TOKEN }