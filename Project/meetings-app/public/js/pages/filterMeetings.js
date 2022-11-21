import ajax from "../utils/ajax.js"
import { BASE_URL } from "../services/auth.js"
import getDateString from "../utils/getDateString.js"
import getAllMembers from "../services/getAllMembers.js"
import activateListeners from "../utils/activateListeners.js"
// import checkToken from "../services/checkToken.js"

// checkToken()


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
            let str = ""
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

                str += `
                        <div class="search-result-card">
                            <p>
                                <h3>${dateString}</h3> ${startHr}:${startMin} - ${endHr}:${endMin}
                            </p>
                            <p>
                                ${meeting.name}
                            </p>
                            <button class="excusebtn" value=${meeting._id}>
                                Excuse yourself
                            </button>
                            <hr>
                            <p class="attendees">
                                <h4>Attendees: </h4>
                                ${attendees.join(", ")}
                            </p>
                            <form class="add-member-form">
                                <input class="selected-member" list="select-member" placeholder="Select member">
                                    <datalist name="member" id="select-member" class="select-member"></datalist>
                                <button class="addbtn" value=${meeting._id}>Add</button>
                                <p class="add-member-msg"></p>
                            </form>
                        </div>`
                filterContentEl.innerHTML = str
            });

            getAllMembers()

        } else {
            filterContentEl.innerHTML += "<h3>No meetings found matching your search criteria!!</h3>"
        }

        activateListeners()
    })

}


document.addEventListener('DOMContentLoaded', filterMeetings)