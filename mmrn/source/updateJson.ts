import { version } from '../assets/json/version'
import axios from 'axios'
import FileSystem from 'expo-file-system'

const onlineRepositoryUrl =
    'https://raw.githubusercontent.com/JoaoEmanuell/mmrn/develop'

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

const RNFS = FileSystem // require('react-native-fs')

export const getOnlineVersion = () => {
    axiosConfig.get(`/mmrn/assets/json/version.js`).then((response) => {
        if (response.status === 200) {
            const onlineVersion = response.data as String
            if (
                `export const version = '${version}'` !== onlineVersion.trim()
            ) {
                console.log('Update the jsons!')
                updateJson() // update the jsons
                try {
                    // update version.js file
                    RNFS.writeAsStringAsync(
                        '../assets/json/version.js',
                        `export const version = '${onlineVersion.trim()}`
                    )
                    // file written successfully
                } catch (err) {
                    console.error(err)
                }
                return true
            }
        }
    })
    return false
}

const updateJson = () => {
    // get the new jsons

    // get the data.json

    axiosConfig.get(`/mmrn/assets/json/data.json`).then((response) => {
        if (response.status === 200) {
            const dataJson = response.data as String
            try {
                RNFS.writeAsStringAsync(
                    '../assets/json/data.json',
                    dataJson.toString()
                )
                // file written successfully
                console.log('Data json saved with success!')
            } catch (err) {
                console.error(err)
            }
        }
    })

    // get the praises.json

    axiosConfig.get(`/mmrn/assets/json/praises.json`).then((response) => {
        if (response.status === 200) {
            const praisesJson = response.data as String
            try {
                RNFS.writeAsStringAsync(
                    '../assets/json/praises.json',
                    praisesJson.toString()
                )
                console.log('Praises json saved with success!')
                // file written successfully
            } catch (err) {
                console.error(err)
            }
        }
    })
}
