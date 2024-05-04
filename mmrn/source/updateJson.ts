import axios from 'axios'
import { RNFS, DOCUMENT_DIRECTORY } from './RNFS'
import { Linking } from 'react-native'
import AlertAsync from 'react-native-alert-async'

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

const praisesDownloadURL = 'https://praises-jp.vercel.app/download' // url to apk

const getOnlineVersion = async () => {
    RNFS.readFile(`${DOCUMENT_DIRECTORY}version.js`).then((version) => {
        console.log(version)
        axiosConfig
            .get('/mmrn/assets/json/version.js')
            .then(async (response) => {
                if (response.status === 200) {
                    const onlineVersion = response.data as String
                    console.log(`Online: ${onlineVersion}`)
                    if (version === undefined) {
                        version = '65488771' // random numbers
                    }
                    if (
                        onlineVersion.split('-')[1] === 'newVersion' &&
                        version.trim() !== onlineVersion.trim()
                    ) {
                        // new version available
                        const choice = await AlertAsync(
                            'Atualização',
                            'Uma nova versão do aplicativo foi encontrada, ao clicar em OK você será redirecionado para o navegador para poder baixar a nova versão!\nCaso isso não aconteça, acesse https://praises-jp.vercel.app/download para poder baixar a nova versão!',
                            [{ text: 'OK', onPress: () => 'ok' }]
                        )

                        if (choice === 'ok') {
                            try {
                                await Linking.openURL(praisesDownloadURL)
                            } catch (err) {
                                alert(
                                    'Não foi possível abrir o navegador, acesse https://praises-jp.vercel.app/download para poder baixar a nova versão!'
                                )
                            }
                        }
                    } else if (version.trim() !== onlineVersion.trim()) {
                        alert(
                            'Novos louvores foram encontrados! Iniciando o download deles!'
                        )
                        console.log('Update the jsons!')
                        updateJson() // update the jsons
                        try {
                            // update version.js file
                            RNFS.writeFile(
                                `${DOCUMENT_DIRECTORY}version.js`,
                                onlineVersion.trim(),
                                'utf8'
                            ).then((data) => {
                                console.log('version.js written successfully')
                            })
                            // file written successfully
                        } catch (err) {
                            console.error(
                                `Error to get write the version js ${err.message}`
                            )
                        }
                    }
                }
            })
    })
}

const updateJson = async () => {
    // get the new jsons

    // get the data.json

    const dataResponse = await axiosConfig.get('/mmrn/assets/json/data.json')

    if (dataResponse.status === 200) {
        try {
            await RNFS.writeFile(
                `${DOCUMENT_DIRECTORY}data.json`,
                JSON.stringify(dataResponse.data),
                'utf8'
            )
            console.log('data.json written successfully')
        } catch (err) {
            console.error(`Error to save data json: ${err.message}`)
        }
    }

    // get the praises.json

    const praisesResponse = await axiosConfig.get(
        '/mmrn/assets/json/praises.json'
    )
    if (praisesResponse.status === 200) {
        console.log('Praises json download')
        try {
            await RNFS.writeFile(
                `${DOCUMENT_DIRECTORY}praises.json`,
                JSON.stringify(praisesResponse.data),
                'utf8'
            )
            console.log('praises.json written successfully')
        } catch (err) {
            console.error(`Error to save praise json: ${err.message}`)
        }
    }
}

const getFirstAssetVersion = async () => {
    /* Move the saved files in assets do DOCUMENT DIRECTORY */

    // version.js

    const versionJs = require('../assets/json/version.js')
    RNFS.writeFile(
        `${DOCUMENT_DIRECTORY}version.js`,
        `export const version = '${versionJs.version}'`,
        'utf8'
    ).then((data) => {
        console.log('version.js written successfully')
    })

    // data.json

    const dataJson = require('../assets/json/data.json')
    RNFS.writeFile(
        `${DOCUMENT_DIRECTORY}data.json`,
        `${JSON.stringify(dataJson)}`,
        'utf8'
    ).then((data) => {
        console.log('data.json written successfully')
    })

    // praises.json

    const praisesJson = require('../assets/json/praises.json')
    RNFS.writeFile(
        `${DOCUMENT_DIRECTORY}praises.json`,
        JSON.stringify(praisesJson),
        'utf8'
    ).then((data) => {
        console.log('praises.json written successfully')
    })
}

export const startUpdateJson = async () => {
    RNFS.readdir(DOCUMENT_DIRECTORY).then(async (data) => {
        if (
            !data.includes('version.js') ||
            !data.includes('praises.json') ||
            !data.includes('data.json')
        ) {
            await getFirstAssetVersion()
        }
        await getOnlineVersion().then((data) => {
            console.log('Get online with success!')
        })
    })
}

const clearData = async () => {
    // simulate a first execution
    // not used in production!
    try {
        await RNFS.unlink(`${DOCUMENT_DIRECTORY}version.js`)
    } catch (err) {}
    try {
        await RNFS.unlink(`${DOCUMENT_DIRECTORY}data.json`)
    } catch (err) {}
    try {
        await RNFS.unlink(`${DOCUMENT_DIRECTORY}praises.json`)
    } catch (err) {}
    console.log('Data clear')
}
