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
var addSessionButton = document.getElementById("addSession")
const exportButton = document.getElementById("exportButton")
const cloneAddSessionButton = addSessionButton.cloneNode(true)

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
        content["data"][sessionCount.toString()].push([line])
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
        text += subArray[0] + "\n";
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
            text += subArray[0] + "<br>";
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
}

// init code
addSessionButton.addEventListener("click", addSession)
previewContainer.classList.add("visually-hidden")