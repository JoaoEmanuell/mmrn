import { RNFS, DOCUMENT_DIRECTORY } from './RNFS'
import { Linking } from 'react-native'
import AlertAsync from 'react-native-alert-async'
import { unzip } from 'react-native-zip-archive'
import { FetchManager } from './fetchManager'

const onlineRepositoryUrl =
    'https://raw.githubusercontent.com/JoaoEmanuell/mmrn/master'

const praisesZipUrl =
    'https://github.com/JoaoEmanuell/mmrn/raw/master/mjpr/public/json/praises.zip'

const headers = {
    Accept: 'application/json, text/plain, */*',
    'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
}

const fetchManager = new FetchManager(
    onlineRepositoryUrl,
    headers as RequestInit
)

const praisesDownloadURL = 'https://praises-jp.vercel.app/download' // url to apk

const getOnlineVersion = async () => {
    RNFS.readFile(`${DOCUMENT_DIRECTORY}praisesVersion.js`).then((version) => {
        console.log(version)
        fetchManager
            .get('/mmrn/assets/json/praisesVersion.js')
            .then(async (response) => {
                if (response.status === 200) {
                    const data = await response.text()
                    const onlineVersion = data.trim() as String
                    if (version === undefined) {
                        version = '65488771' // random numbers
                    }
                    const localVersion = version.trim()
                    if (localVersion !== onlineVersion) {
                        alert(
                            'Novos louvores foram encontrados! Iniciando o download deles!'
                        )
                        console.log('Update the jsons!')
                        updateJson() // update the jsons
                        try {
                            // update praisesVersion.js file
                            RNFS.writeFile(
                                `${DOCUMENT_DIRECTORY}praisesVersion.js`,
                                onlineVersion.trim(),
                                'utf8'
                            ).then((data) => {
                                console.log(
                                    'praisesVersion.js written successfully'
                                )
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

const updateNewVersion = async () => {
    const applicationVersionJS = require('../assets/json/applicationVersion.js')
    const applicationVersion = `export const version = '${applicationVersionJS.version}'`

    fetchManager
        .get('/mmrn/assets/json/applicationVersion.js')
        .then(async (response) => {
            if (response.status === 200) {
                await response.text().then(async (data) => {
                    const onlineApplicationVersion = data.trim()
                    if (onlineApplicationVersion !== applicationVersion) {
                        // new version available
                        const choice = await AlertAsync(
                            'Atualização',
                            'Uma nova versão do aplicativo foi encontrada, ao clicar em OK você será redirecionado para o navegador para poder baixar a nova versão!\nCaso isso não aconteça, acesse https://praises-jp.vercel.app/download para poder baixar a nova versão!',
                            [{ text: 'OK', onPress: () => 'ok' }]
                        ) // show the alert and await the user confirmation
                        if (choice === 'ok') {
                            try {
                                await Linking.openURL(praisesDownloadURL) // open the browser
                            } catch (err) {
                                alert(
                                    'Não foi possível abrir o navegador, acesse https://praises-jp.vercel.app/download para poder baixar a nova versão!'
                                )
                            }
                        }
                    }
                })
            }
        })
}

const updateJson = async () => {
    // get the new jsons

    const filePath = `${DOCUMENT_DIRECTORY}/praises.zip`

    RNFS.downloadFile({
        fromUrl: praisesZipUrl,
        toFile: filePath,
        progress: (res) => {
            const progress = (res.bytesWritten / res.contentLength) * 100
            console.log(`Progress: ${progress.toFixed(2)}%`)
        },
    })
        .promise.then((response) => {
            console.log('Zip download with success!', response)
            unzip(filePath, DOCUMENT_DIRECTORY).then((path) => {
                console.log(`Completed extraction in ${path}`)
                RNFS.unlink(filePath)
                console.log('zip deleted')
            })
        })
        .catch((err) => {
            console.log('Zip download error:', err)
            alert('Erro ao baixar os louvores!')
        })
}

const getFirstAssetVersion = async () => {
    /* Move the saved files in assets do DOCUMENT DIRECTORY */

    // praisesVersion.js

    const praiseVersion = require('../assets/json/praisesVersion.js')
    RNFS.writeFile(
        `${DOCUMENT_DIRECTORY}praisesVersion.js`,
        `export const version = '${praiseVersion.version}'`,
        'utf8'
    ).then((data) => {
        console.log('praisesVersion.js written successfully')
    })
}

export const startUpdateJson = async () => {
    RNFS.readdir(DOCUMENT_DIRECTORY).then(async (data) => {
        if (
            !data.includes('praisesVersion.js') ||
            !data.includes('data.min.json')
        ) {
            await getFirstAssetVersion()
        }
        await updateNewVersion().then((data) => {
            console.log('get the new version success!')
        })
        await getOnlineVersion().then((data) => {
            console.log('Get online with success!')
        })
    })
}

const clearData = async () => {
    // simulate a first execution
    // not used in production!
    try {
        await RNFS.unlink(`${DOCUMENT_DIRECTORY}praisesVersion.js`)
    } catch (err) {}
    try {
        await RNFS.unlink(`${DOCUMENT_DIRECTORY}data.json`)
    } catch (err) {}
    try {
        await RNFS.unlink(`${DOCUMENT_DIRECTORY}praises.json`)
    } catch (err) {}
    console.log('Data clear')
}
