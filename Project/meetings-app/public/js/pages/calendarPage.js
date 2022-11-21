import ajax from "../utils/ajax.js"
import getDateString from "../utils/getDateString.js"
import { BASE_URL } from "../services/auth.js"
// import checkToken from "../services/checkToken.js"

// checkToken()

const KEY_TOKEN = window.localStorage.token

const todayDateInfo = document.getElementById('today-date-info')
const todayDay = document.getElementById('today-day')
const datePicker = document.getElementById('date-picker')
const datesContainerEl = document.querySelector('.calendar-date-container')
const contentContainerEl = document.querySelector('.content-container')
const dayEl = document.getElementById('today-day')
const days = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday"
}

datePicker.addEventListener('change', async function () {
    getMeetings()
})

let date = new Date()
let todayDate = (date.getDate() + 1).toString()
let day = days[date.getDay()]
let year = date.getFullYear()
let month = (date.getMonth() + 1).toString()


todayDay.textContent = day
if (parseInt(month) < 10) {
    datePicker.value = `${year.toString()}-0${month}-${todayDate}`
} else {
    datePicker.value = `${year.toString()}-${month}-${todayDate}`
}
todayDateInfo.textContent = getDateString(datePicker.value)


let str1 = ""
let str2 = ""
for (let i = 0; i < 24; i++) {
    str1 += `<div class="calendar-date">${i.toString()}</div>`
    str2 += `<div class="content-box" id=${i.toString()}></div>`
}
datesContainerEl.innerHTML += str1
contentContainerEl.innerHTML += str2

const getMeetings = async function () {
    const date = datePicker.value
    const dateObj = new Date(date)
    // console.log(date.getDay())
    // const dateInfo = getDateString(datePicker.value)
    todayDateInfo.textContent = getDateString(date)
    // console.log(dateInfo)
    dayEl.textContent = days[dateObj.getDay()]
    const meetings = await ajax(`${BASE_URL}/calendar`, "GET", undefined, `date=${date}`, { "Authorization": KEY_TOKEN })
    meetings.forEach(meeting => {
        let members = []
        const attendees = meeting.attendees
        attendees.forEach(attendee => {
            members.push(attendee.email)
        })
        const startHr = meeting.startTime.hours
        const id = startHr.toString()
        const endHr = meeting.endTime.hours
        const contentEl = document.getElementById(id)
        contentEl.innerHTML = `
            <div class="meeting-info">
                <h4>${meeting.name}</h4>
                <hr>
                <p>Attendees: ${members.join(", ")}</p>
            </div>`
        const meetEl = contentEl.querySelector(".meeting-info")
        if (startHr !== endHr) {
            meetEl.style = `height:${32 * (endHr - startHr + 1)}px`
        }
    })
}