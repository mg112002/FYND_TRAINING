import { BASE_URL } from "../services/auth.js"
import ajax from "../utils/ajax.js"

const addMeetForm = document.getElementById('add-meet-form')
const meetNameEl = document.getElementById('meet-name')
const dateEl = document.getElementById('date')
const startTimeEl = document.getElementById('startime')
const endTimeEl = document.getElementById('endtime')
const descEl = document.getElementById('description')
const emailNdTeamEl = document.getElementById('email-team')
const errorEl = document.getElementById('error')

function getTime(time) {
    const hour = parseInt(time.slice(0, 2))
    const min = parseInt(time.slice(3, 5))
    return {
        "hours": hour,
        "minutes": min
    }
}
const KEY_TOKEN = window.localStorage.token
const addMeeting = () => {
    addMeetForm.addEventListener('submit', async function (event) {
        event.preventDefault()


        const name = meetNameEl.value.trim()
        const desc = descEl.value.trim()
        const emailNdTeam = emailNdTeamEl.value.trim().split(',')
        let errors = ""
        const teams = []
        const emailId = []


        emailNdTeam.forEach(element => {
            element = element.trim()
            if (!/^[A-Za-z0-9@_\.\-]*$/.test(element)) {
                errors += "Email or Team not Valid! "
            }
            if (element[0] === "@") {
                teams.push(element)
            } else {
                if (!/^[A-Za-z][A-Za-z0-9_\.\-]*@[a-z]*[\.][a-z]*$/.test(element)) {
                    errors += "Invalid Email!! "
                } else {
                    emailId.push(element)
                }
            }
        })

        // console.log(emailId, teams, dateEl.value, startTimeEl.value)
        if (/[<>\/]/.test(name)) {
            errors += "Name cannot contain(<,>,/) :("
        }

        if (/[<>\/]/.test(desc)) {
            errors += "Description cannot contain(<,>,/) :("
        }

        if (errors) {
            errorEl.textContent = errors.trim()
            return
        }


        const meetInfo = {
            "name": name,
            "description": desc,
            "date": dateEl.value,
            "startTime": getTime(startTimeEl.value),
            "endTime": getTime(endTimeEl.value),
            "attendees": emailId
        }

        const data = await ajax(`${BASE_URL}/meetings`, 'POST', meetInfo, '', { 'Authorization': KEY_TOKEN })
        if (data.name === meetInfo.name) {
            errorEl.style = "color:green;font-size:medium"
            errorEl.textContent = "Meeting added successfully!!"
        }
    })
}


document.addEventListener('DOMContentLoaded', addMeeting)
