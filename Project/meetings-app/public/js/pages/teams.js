import ajax from "../utils/ajax.js"
import { BASE_URL } from "../services/auth.js"
import getAllMembers from "../services/getAllMembers.js"
import { getMembers } from "../services/addTeam.js";
// import checkToken from "../services/checkToken.js"

// checkToken();


(async function () {
    await getMembers()
})()
const containerEl = document.querySelector('.teams-card-container')
const KEY_TOKEN = window.localStorage.token


function setTeams(teams) {
    let str = ""
    if (teams) {
        teams.forEach(team => {
            let members = []
            team.members.forEach(member => {
                members.push(member.email)
            })
            str += `
            <div class="teams-card">
                <div>
                    <h2>${team.name}</h2><br>
                    <p>@${team.shortName}</p><br>
                    <p class="teams-card-description">
                        ${team.description}
                    </p><br><br>
                    <button class="excuse-btn" value=${team._id}>Excuse yourself</button><br><br>
                    <hr><br>
                    <h3>Members: </h3>
                    <p class="medium-p">${members.join(", ")}</p><br>
                    <form class="add-member-form">
                        <input class="selected-member" list="select-member" placeholder="Select member" required>
                            <datalist name="member" id="select-member" class="select-member"></datalist>
                            <button class="addbtn" value=${team._id}>Add</button>
                        <p class="msg"></p>
                    </form>
                </div>
            </div>`

            containerEl.innerHTML = str
        });
        getAllMembers()

        containerEl.innerHTML += `<div class="teams-card add-team">
                    <form id="add-team-form"></form>
                    <form id="add-member"></form>
                    <div>
                        <input type="text" id="teamname" maxlength="20" placeholder="Team name"
                            form="add-team-form" required><br>
                        <input type="text" id="shortname" maxlength="20" placeholder="Team short name"
                            form="add-team-form" required><br>
                        <textarea id="teamdesc" rows="2" maxlength="200" form="add-team-form"
                            placeholder="Provide a description for the team" required></textarea><br><br>
                        <hr><br>
                        <h3>Members: </h3>
                        <p class="medium-p"></p><br>
                        <input class="selected-member" list="select-member" placeholder="Select member"
                            form="add-member" required>
                        <datalist name="member" id="select-member" class="select-member"></datalist>
                        <button type="submit" class="addbtn" id="addmembtn" form="add-member">Add</button>
                        <p class="add-member-msg"></p><br>
                        <button id="addteambtn" form="add-team-form">Add team</button>
                    </div>
                </div>`
    } else {
        containerEl.innerHTML += "<h3>No teams found!!</h3>"
    }
}


export const getTeams = async function allTeams() {
    const teams = await ajax(`${BASE_URL}/teams`, "GET", undefined, "", { "Authorization": KEY_TOKEN })
    setTeams(teams)
}


document.addEventListener('DOMContentLoaded', () => {
    getTeams()
})

export {
    getTeams as default
}