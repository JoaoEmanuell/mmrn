import axios from 'axios'
import { RNFS, DOCUMENT_DIRECTORY } from './RNFS'
import { Restart } from 'fiction-expo-restart'

const onlineRepositoryUrl =
    'https://raw.githubusercontent.com/JoaoEmanuell/mmrn/master'

const headers = {
    Accept: 'application/json, text/plain, */*',
    'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
}

const axiosConfig = axios.create({
    baseURL: onlineRepositoryUrl,
    timeout: 3000, // 3 seconds
    headers,
})

const getOnlineVersion = async () => {
    RNFS.readAsStringAsync(`${DOCUMENT_DIRECTORY}version.js`).then(
        (version) => {
            axiosConfig.get(`/mmrn/assets/json/version.js`).then((response) => {
                if (response.status === 200) {
                    const onlineVersion = response.data as String
                    if (version == undefined) {
                        version = '65488771' // random numbers
                    }
                    if (version.trim() !== onlineVersion.trim()) {
                        alert(
                            'Novos louvores foram encontrados! Iniciando o download deles!'
                        )
                        console.log('Update the jsons!')
                        updateJson() // update the jsons
                        try {
                            // update version.js file
                            RNFS.writeAsStringAsync(
                                `${DOCUMENT_DIRECTORY}version.js`,
                                onlineVersion.trim()
                            ).then((data) => {
                                console.log('version.js written successfully')
                            })
                            // file written successfully
                        } catch (err) {
                            console.error(
                                `Error to get write the version js ${err}`
                            )
                        }
                    }
                }
            })
        }
    )
}

const updateJson = async () => {
    // get the new jsons

    // get the data.json

    const dataResponse = await axiosConfig.get(`/mmrn/assets/json/data.json`)

    if (dataResponse.status === 200) {
        try {
            await RNFS.writeAsStringAsync(
                `${DOCUMENT_DIRECTORY}data.json`,
                JSON.stringify(dataResponse.data)
            )
            console.log('data.json written successfully')
        } catch (err) {
            console.error(`Error to save data json: ${err}`)
        }
    }

    // get the praises.json

    const praisesResponse = await axiosConfig.get(
        `/mmrn/assets/json/praises.json`
    )
    if (praisesResponse.status === 200) {
        console.log('Praises json download')
        try {
            await RNFS.writeAsStringAsync(
                `${DOCUMENT_DIRECTORY}praises.json`,
                JSON.stringify(praisesResponse.data)
            )
            console.log('praises.json written successfully')
        } catch (err) {
            console.error(`Error to save praise json: ${err}`)
        }
    }
}

const getFirstAssetVersion = async () => {
    /* Move the saved files in assets do DOCUMENT DIRECTORY */

    // version.js

    const versionJs = require('../assets/json/version')
    RNFS.writeAsStringAsync(
        `${DOCUMENT_DIRECTORY}version.js`,
        `export const version = '${versionJs['version']}'`
    ).then((data) => {
        console.log('version.js written successfully')
    })

    // data.json

    const dataJson = require('../assets/json/data.json')
    RNFS.writeAsStringAsync(
        `${DOCUMENT_DIRECTORY}data.json`,
        JSON.stringify(dataJson)
    ).then((data) => {
        console.log('data.json written successfully')
    })

    // praises.json

    const praisesJson = require('../assets/json/praises.json')
    RNFS.writeAsStringAsync(
        `${DOCUMENT_DIRECTORY}praises.json`,
        JSON.stringify(praisesJson)
    ).then((data) => {
        console.log('praises.json written successfully')
    })
}

export const startUpdateJson = async () => {
    RNFS.readDirectoryAsync(DOCUMENT_DIRECTORY).then(async (data) => {
        if (
            !data.includes('version.js') ||
            !data.includes('praises.json') ||
            !data.includes('data.json')
        ) {
            alert(
                'Para a primeira execução do aplicativo é necessário você possui acesso a internet!\nCaso contrário não irá aparecer nenhum louvor!\nO aplicativo será reiniciado após concluir esse primeiro download, caso não seja, ele irá fechar ao você clicar em "Selecione o louvor".'
            )
            await getFirstAssetVersion()
            await getOnlineVersion().then((data) => {
                console.log('Get online with success!')
            })
            Restart()
        } else {
            await getOnlineVersion().then((data) => {
                console.log('Get online with success!')
            })
        }
    })
}

const clearData = async () => {
    // simulate a first execution
    // not used in production!
    try {
        await RNFS.deleteAsync(`${DOCUMENT_DIRECTORY}version.js`)
    } catch (err) {}
    try {
        await RNFS.deleteAsync(`${DOCUMENT_DIRECTORY}data.json`)
    } catch (err) {}
    try {
        await RNFS.deleteAsync(`${DOCUMENT_DIRECTORY}praises.json`)
    } catch (err) {}
    console.log(`Data clear`)
}
