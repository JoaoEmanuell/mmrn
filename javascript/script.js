// content

const content = {
    "organization": [],
    "data": {}
}
var sessionCount = 0
var editSessionCount = 0
var editSessionVariable = false

// div
const sessionsDiv = document.getElementById("sessions")
const previewDiv = document.getElementById("preview")
const previewContainer = document.getElementById("previewContainer")
const addSessionButtonDiv = document.getElementById("addSessionButtonDiv")

// buttons
const addSessionButton = document.getElementById("addSession")
const exportButton = document.getElementById("exportButton")

// inputs
const organizationInput = document.getElementById("organizationInput")

// functions

const addSession = () => {
    // edit mode
    if (editSessionVariable){
        const sessionInput = document.getElementById("sessionInput")
        const sessionInputText = sessionInput.value
        const sessionLines = sessionInputText.split('\n')
        // add to content
        content["data"][editSessionCount.toString()] = []
        sessionLines.forEach(line => {
            content["data"][editSessionCount.toString()].push([line])
        });
        // reset
        sessionInput.value = ''

        setContentInEditSession()
        editSessionVariable = false
        return;
    }
    const sessionInput = document.getElementById("sessionInput")
    const sessionInputText = sessionInput.value
    const sessionLines = sessionInputText.split('\n')
    // add to content
    content["data"][sessionCount.toString()] = []
    sessionLines.forEach(line => {
        content["data"][sessionCount.toString()].push(line)
    });
    // reset
    sessionInput.value = ''

    setContentInEditSession()
    sessionCount++
}

const editSession = (sessionId) => {
    const id = sessionId.split('-')[2]
    const sessionContent = content["data"][id]
    let text = "";
    sessionContent.forEach(subArray => {
        text += subArray + "\n";
    });
    const sessionInput = document.getElementById("sessionInput")
    sessionInput.value = text
    const session = document.getElementById(sessionId)
    session.id=""
    session.remove()

    editSessionVariable = true
    editSessionCount = Number(id)
}

const saveEditSession = (sessionId) => {
    const id = Number(sessionId.split('-')[2])
    const sessionInput = document.getElementById("sessionInput")
    const sessionInputText = sessionInput.value
    const sessionLines = sessionInputText.split('\n')
    // add to content
    content["data"][id.toString()] = []
    sessionLines.forEach(line => {
        content["data"][id.toString()].push([line])
    });
    // reset
    sessionInput.value = ''

    setContentInEditSession()
}

const setContentInEditSession = () => {
    sessionsDiv.innerHTML = ""
    Object.entries(content["data"]).forEach((data, key) => {
        const session = document.createElement("div")
        session.classList.add("mb-4")
        session.id = `session-id-${data["0"]}`

        const divForLabelAndTrashButton = document.createElement("div")
        divForLabelAndTrashButton.classList.add("row", "text-center")

        const label = document.createElement("label")
        label.classList.add("form-label", "col")
        label.innerText = `Sessão: ${data["0"]}`

        const trashButton = document.createElement("img")
        trashButton.src = "static/trash.svg"
        trashButton.alt = "delete button"
        trashButton.width = 24
        trashButton.height = 24
        trashButton.classList.add("col")
        trashButton.addEventListener("click", () => {
            deleteSession(session.id)
        })

        const paragraph = document.createElement("p")
        paragraph.classList.add("form-control")
        paragraph.addEventListener("click", () => {
            editSession(session.id)
        })

        let text = "";
        data[1].forEach(subArray => {
            text += subArray + "<br>";
        });

        paragraph.innerHTML = text

        divForLabelAndTrashButton.appendChild(label)
        divForLabelAndTrashButton.appendChild(trashButton)
        session.appendChild(divForLabelAndTrashButton)
        session.appendChild(paragraph)
        sessionsDiv.appendChild(session)
    })
}

const deleteSession = (sessionId) => {
    const id = Number(sessionId.split('-')[2])
    delete content["data"][id.toString()]
    setContentInEditSession()
    if (Object.keys(content["data"]).length === 0){ // reset the count if all deleted all sessions
        sessionCount = 0
    }
}

const showInThePreview = () => {
    previewDiv.innerHTML = "" // reset the preview div
    content["organization"] = [] // reset the organization
    const organizationInputValue = organizationInput.value
    const sessions = organizationInputValue.split(',')
    sessions.forEach(session => {
        const treadedSession = session.trim()
        if (!content["data"].hasOwnProperty(treadedSession)) { // validate sessions
            window.alert(`Sessão: ${treadedSession} não é válida`)
            return;
        }
        // show in the preview
        const paragraph = document.createElement('p')
        paragraph.classList.add("mt-4")
        let text = "";
        content["data"][treadedSession].forEach(subArray => {
            text += subArray + "<br>";
        });
        paragraph.innerHTML = text
        previewDiv.appendChild(paragraph)
        // add to content
        content["organization"].push(treadedSession)
    });
    previewContainer.classList.remove("visually-hidden") // show the div
}

const exportPraise = async () => {
    const contentJson = JSON.stringify(content)
    try {
        await navigator.clipboard.writeText(contentJson);
        alert('Louvor copiado para a área de transferência!');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

// init code
addSessionButton.addEventListener("click", addSession)
exportButton.addEventListener("click", exportPraise)
organizationInput.addEventListener("change", showInThePreview)
previewContainer.classList.add("visually-hidden")