import ajax from "../utils/ajax.js"
import { BASE_URL } from "./auth.js"
// import { getAllMeetings, membersList } from "../pages/getAllMembers.js"
import getDateString from "../utils/getDateString.js"
import setMembers from "../pages/getAllMembers.js"

const filterFormEl = document.getElementById('search-meet-form')
const periodEl = document.getElementById('select-date')
const searchEl = document.getElementById('search-for')
const filterContentEl = document.querySelector('.filter-search-content')

const KEY_TOKEN = window.localStorage.token

const filterMeetings = () => {
    filterFormEl.addEventListener('submit', async function (event) {
        event.preventDefault()

        const period = periodEl.value
        const search = searchEl.value.trim()

        const filteredMeetings = await ajax(`${BASE_URL}/meetings`, 'GET', undefined, `period=${period}&search=${search}`, { 'Authorization': KEY_TOKEN })
        if (filteredMeetings) {
            filteredMeetings.forEach(meeting => {
                let dateString = getDateString(meeting.date.slice(0, 10))
                let startHr = meeting.startTime.hours
                let startMin = meeting.startTime.minutes
                let endHr = meeting.endTime.hours
                let endMin = meeting.endTime.minutes
                let attendees = []
                meeting.attendees.forEach(attendee => {
                    attendees.push(attendee.email)
                })
                if (startHr < 10) {
                    startHr = `0${startHr}`
                }
                if (startMin < 10) {
                    startMin = `0${startMin}`
                }
                if (endHr < 10) {
                    endHr = `0${endHr}`
                }
                if (endMin < 10) {
                    endMin = `0${endMin}`
                }
                filterContentEl.innerHTML += `<div class="search-result-card">
                <p>
                <h3>${dateString}</h3> ${startHr}:${startMin} - ${endHr}:${endMin}</p>
                <p>${meeting.name}</p>
                <button>Excuse yourself</button>
                <hr>
                <p>
                <h4>Attendees: ${attendees.join(", ")}</h4></p>
                <datalist name="member" class="select-member" id="member" placeholder="Select member">${setMembers()}</datalist>
                <button class="addbtn">Add</button>
            </div>`

            });
        } else {
            //No meetings
        }
    })
}


document.addEventListener('DOMContentLoaded', filterMeetings)