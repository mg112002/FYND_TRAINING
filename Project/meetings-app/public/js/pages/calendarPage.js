import { KEY_TOKEN } from "../services/auth.js"

const todayDateInfo = document.getElementById('today-date-info')
const todayDay = document.getElementById('today-day')
const datePicker = document.getElementById('date-picker')
const datesContainerEl = document.querySelector('.calendar-date-container')
const contentContainerEl = document.querySelector('.content-container')
const days = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday"
}

let date = new Date()
let todayDate = (date.getDate() + 1).toString()
let day = days[date.getDay()]
let year = date.getFullYear()
let month = (date.getMonth() + 1).toString()
let monthName = date.toLocaleString("en-US", { month: "long" })
const dateInfo = `${todayDate} ${monthName} ${year}`

todayDateInfo.textContent = dateInfo
todayDay.textContent = day
if (parseInt(month) < 10) {
    datePicker.value = `${year.toString()}-0${month}-${todayDate}`
} else {
    datePicker.value = `${year.toString()}-${month}-${todayDate}`
}

// console.log(datePicker.value)

let n
const datePickerMonth = datePicker.value.slice(5, 7)
if (['1', '3', '5', '7', '8', '10', '12'].includes(datePickerMonth)) {
    n = 31
} else if (['4', '6', '9', '11'].includes(datePickerMonth)) {
    n = 30
} else {
    if (year % 4 == 0 || year % 100 == 0 || year % 400 == 0) {
        n = 29
    } else {
        n = 28
    }
}

let str = ""
for (let i = 0; i < n; i++) {
    datesContainerEl.innerHTML += `<div class="calendar-date">${(i + 1).toString()}</div>`
    contentContainerEl.innerHTML += `<div class="content-box"></div>`
}

console.log(localStorage.getItem(KEY_TOKEN))

// < div class="calendar-date" > ${i.toString()} </div >

// console.log(date)
// function getDateString(date) {
//     return date.toDateString()
// }
// console.log(getDateString(date))
// console.log(date.toDateString()) // Mon 14 Nov 2022
// console.log(date.getDate()) // todayDate: 13(14) : 0->(totalDays-1)
// console.log(date.getMonth()) // currentMonth: 10(November) : 0->11
// console.log(date.getFullYear()) // currentYear: 2022
// console.log(date.getDay())  // Sun->0, Mon->1, ..., Sat->6