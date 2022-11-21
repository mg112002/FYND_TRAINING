import ajax from "./ajax.js";
import { BASE_URL } from "../services/auth.js";
// import checkToken from "../services/checkToken.js"

// checkToken()

const KEY_TOKEN = window.localStorage.token

function excuseYourself(event) {
    const id = event.target.value
    const card = event.target.closest('.search-result-card')
    const msg = card.querySelector(".add-member-msg")

    const data = async function () {
        return await ajax(`${BASE_URL}/meetings/${id}`, "PATCH", undefined, "action=remove_attendee", { "Authorization": KEY_TOKEN })
    };

    (async function getData() {
        const val = await data()
        if (val._id === id) {
            card.remove()
        } else {
            msg.style = "color:red"
            msg.textContent = "Something went wrong :("
        }

    })()
}

function addMember(event) {
    event.preventDefault();

    const formEl = event.target
    const meetId = formEl.querySelector(".addbtn").value
    const userId = formEl.querySelector(".selected-member").value
    const card = formEl.closest('.search-result-card')
    const msg = card.querySelector(".add-member-msg")

    const data = async function () {
        return await ajax(`${BASE_URL}/meetings/${meetId}`, "PATCH", {}, `action=add_attendee&userId=${userId}`, { "Authorization": KEY_TOKEN })
    };

    (async function getData() {
        const val = await data()
        if (val._id === meetId) {
            msg.textContent = "Member added successfully!!"

        } else {
            msg.style = "color:red"
            msg.textContent = "Something went wrong :("
        }
    })()
}

export default function activateListeners() {

    const excuseBtnEls = document.querySelectorAll(".excusebtn")
    const addMemberFormEls = document.querySelectorAll(".add-member-form")

    excuseBtnEls.forEach(btn => {
        btn.addEventListener('click', function (e) {
            excuseYourself(e)
        })
    });

    addMemberFormEls.forEach(form => {
        form.addEventListener('submit', function (event) {
            addMember(event)
        })
    })

}