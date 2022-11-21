// import ajax from "../utils/ajax.js"
// import { BASE_URL } from "./auth.js"

// const checkToken = async function () {
//     const KEY_TOKEN = window.localStorage.token
//     const usr = await ajax(`${BASE_URL}/users`, "GET", undefined, "", { "Authorization": KEY_TOKEN })

//     if (!KEY_TOKEN) {
//         window.location.href = '/login.html'
//     } else if (usr.message) {
//         window.location.href = "/login.html"
//     }
// }
// export {
//     checkToken as default
// }