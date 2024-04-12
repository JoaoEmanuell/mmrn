const releaseApiEndpoint = "https://api.github.com/repos/JoaoEmanuell/mmrn/releases/latest"
const releaseDiv = document.querySelector("#div-last-download")

async function requestGet(url=''){
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "default",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
    return response.json()
}

requestGet(releaseApiEndpoint).then((data) => {
    const divToBodyRequest = document.createElement("div")
    const linkToDownload = document.createElement('a')
    linkToDownload.classList.add('text-green-600')
    if (data.message == "Not Found"){
        divToBodyRequest.innerHTML = "<h2>Não existe lançamentos disponíveis!</h2>"
        divToBodyRequest.classList.add('text-red-600') 
    } else{
        releaseDiv.classList.add('shadow-lg', 'p-4', 'rounded-md', 'bg-gray-100')
        divToBodyRequest.innerHTML = `<pre>${data.body}</pre>`
        divToBodyRequest.classList.add('text-gray-800')
        linkToDownload.innerHTML = 'Clique aqui para baixar a nova versão!'
        linkToDownload.href = data.assets[0].browser_download_url
    }
    releaseDiv.append(divToBodyRequest, linkToDownload)
})
