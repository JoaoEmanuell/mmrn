import { RNFS, DOCUMENT_DIRECTORY } from './RNFS'

export async function readDataJson() {
    try {
        const documentDirList = await RNFS.readdir(DOCUMENT_DIRECTORY)
        if (!documentDirList.includes('data.min.json')) {
            // data.json not in document dir
            const dataJson = require('../assets/json/data.json')
            return dataJson
        } else {
            const dataJson = await RNFS.readFile(
                `${DOCUMENT_DIRECTORY}data.min.json`
            )
            return dataJson
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error)
        throw error
    }
}
