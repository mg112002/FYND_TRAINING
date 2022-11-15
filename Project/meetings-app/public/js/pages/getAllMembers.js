import ajax from "../utils/ajax.js"
import { BASE_URL } from "../services/auth.js"

const KEY_TOKEN = window.localStorage.token
let membersList = []
const selectMemberEl = document.querySelector(".select-member")
const getMembers = async function () {
    const data = await ajax(`${BASE_URL}/users`, "GET", undefined, "", { 'Authorization': KEY_TOKEN })
    return data
}
    (async () => {
        membersList = await getMembers()
    })()
function setMembers() {
    let str = ""
    membersList.forEach(member => {
        const email = member.email
        str += `<option value=${email}>`
    })
    return str
}

export {
    setMembers as default
}