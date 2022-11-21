import ajax from "../utils/ajax.js"
import { BASE_URL } from "./auth.js"
// import checkToken from "../services/checkToken.js"

// checkToken()

export default function getAllMembers() {

    const KEY_TOKEN = window.localStorage.token
    let membersList = []
    const selectMemberEl = document.querySelector(".select-member")

    const getMembers = async function () {
        return await ajax(`${BASE_URL}/users`, "GET", undefined, undefined, { 'Authorization': KEY_TOKEN })
    };

    (async function setMembers() {
        membersList = await getMembers()
        let str = ""
        membersList.forEach(member => {
            const email = member.email
            str += `<option value=${member._id}>${email}</option>`
        })
        selectMemberEl.innerHTML += str
    })()
}
