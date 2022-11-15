export default function getDateString(date) {
    let dateObj = new Date(date)
    const dateVal = dateObj.getDate().toString()
    // const month = (dateObj.getMonth() + 1).toString()
    const month = dateObj.toLocaleString("en-US", { month: "long" })
    const year = dateObj.getFullYear().toString()
    return `${dateVal} ${month} ${year}`
}
