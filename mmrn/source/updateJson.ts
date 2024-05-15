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
    RNFS.readFile(`${DOCUMENT_DIRECTORY}version.js`).then((version) => {
        console.log(version)
        fetchManager
            .get('/mmrn/assets/json/version.js')
            .then(async (response) => {
                if (response.status === 200) {
                    const data = await response.text()
                    const onlineVersion = data as String
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
