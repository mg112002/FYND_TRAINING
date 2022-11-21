import { BASE_URL } from "./auth.js"
import ajax from "../utils/ajax.js"
// import checkToken from "../services/checkToken.js"

// checkToken()


let membersList, members = [], allUsrIdList = [], allEmailsList = []
const KEY_TOKEN = window.localStorage.token
const addTeamFormEl = document.getElementById("add-team-form")
const addMemberFormEl = document.getElementById("add-member")


function excuseYourself(event) {
    const excuseBtn = event.target
    const id = excuseBtn.value
    const card = excuseBtn.closest('.teams-card')
    const msg = card.querySelector("msg")

    const data = async function () {
        return await ajax(`${BASE_URL}/teams/${id}`, "PATCH", undefined, "action=remove_member", { "Authorization": KEY_TOKEN })
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
    const formEl = event.target
    const card = formEl.closest('.teams-card')
    const teamId = card.querySelector('.addbtn').value
    const emailId = card.querySelector('.selected-member').value
    const userId = allUsrIdList[allEmailsList.indexOf(emailId)]
    const msg = card.querySelector(".msg")
    const members = card.querySelector('.medium-p')

    if (!allEmailsList.includes(emailId)) {
        msg.style = "display:block;color:red"
        msg.textContent = "Invalid Email :)"
        return
    }

    if (!members.textContent.includes(emailId)) {
        const data = async function () {
            return await ajax(`${BASE_URL}/teams/${teamId}`, "PATCH", {}, `action=add_member&userId=${userId}`, { "Authorization": KEY_TOKEN })
        };

        (async function getData() {
            const val = await data()
            if (val._id === teamId) {
                msg.style = "display:block;color:green"
                msg.textContent = "Member added successfully!!"
                members.textContent += ", " + emailId
            } else {
                msg.style = "display:block;color:red"
                msg.textContent = "Something went wrong :("
            }
        })()
    } else {
        msg.style = "display:block;color:yellow"
        msg.textContent = "Member already exists!!"
    }
}

function addMemberToList(event) {
    const formEl = event.target
    const card = formEl.closest('.teams-card')
    const emailId = card.querySelector('.selected-member').value
    const msg = card.querySelector('.add-member-msg')
    const membersEl = card.querySelector('.medium-p')
    if (!members.includes(emailId)) {
        if (allEmailsList.includes(emailId)) {
            members.push(emailId)
            membersEl.textContent = members.join(", ")
            msg.style = "color:green"
            msg.textContent = "Member added successfully!!"
        } else {
            msg.style = "color:crimson"
            msg.textContent = "No such user :("
        }

    } else {
        msg.style = "color:yellow"
        msg.textContent = "Member already exists :)"
    }
}

const addTeam = async function (event) {
    const formEl = event.target
    const card = formEl.closest('.teams-card')
    const msg = card.querySelector('.add-member-msg')
    const teamName = card.querySelector('#teamname').value
    const shortName = card.querySelector('#shortname').value
    const description = card.querySelector('#teamdesc').value

    const teamInfo = {
        "name": teamName,
        "shortName": shortName,
        "description": description,
        "members": members
    }

    const teamDetails = await ajax(`${BASE_URL}/teams`, "POST", teamInfo, "", { "Authorization": KEY_TOKEN })
    if (teamDetails.name === teamName) {
        members = []
        msg.style = "color:green"
        msg.textContent = "Team added successfully!!"
        window.location.reload()
    } else {
        msg.style = "color:crimson"
        msg.textContent = "Something went wrong :("
    }
}

const getMembers = async function () {
    if (!membersList) {
        membersList = await ajax(`${BASE_URL}/users`, "GET", undefined, undefined, { 'Authorization': KEY_TOKEN })
        let str = ""
        membersList.forEach(member => {
            str += `<option value=${member.email}>`
            allEmailsList.push(member.email)
            allUsrIdList.push(member._id)
        })

        const selectMemberEls = document.querySelectorAll(".select-member")

        selectMemberEls.forEach(memEl => {
            memEl.innerHTML += str
        })

        const excuseBtns = document.querySelectorAll('.excuse-btn')
        excuseBtns.forEach(btn => {
            btn.addEventListener('click', function (event) {
                excuseYourself(event)
            })
        })

        const addMemberFormEls = document.querySelectorAll('.add-member-form')
        addMemberFormEls.forEach(form => {
            form.addEventListener('submit', function (event) {
                event.preventDefault()
                addMember(event)
            })
        })

        const memToListFormEl = document.getElementById('add-member')
        memToListFormEl.addEventListener('submit', function (event) {
            event.preventDefault()
            addMemberToList(event)
        })

        const addTeamFormEl = document.getElementById('add-team-form')
        addTeamFormEl.addEventListener('submit', function (event) {
            event.preventDefault()
            addTeam(event)
        })
    }
}

export {
    getMembers
}