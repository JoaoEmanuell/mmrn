import { RNFS, DOCUMENT_DIRECTORY } from './RNFS'

interface praisesJson {
    praiseId: {
        organization: String[]
        data: {
            position: String[][]
        }
    }
}

export async function readPraisesJson(): Promise<string | praisesJson> {
    try {
        const documentDirList =
            await RNFS.readDirectoryAsync(DOCUMENT_DIRECTORY)
        if (!documentDirList.includes('praises.json')) {
            // praises.json not in document dir
            const praisesJson = require('../assets/json/praises.json')
            return praisesJson
        } else {
            return RNFS.readAsStringAsync(`${DOCUMENT_DIRECTORY}praises.json`)
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error)
        throw error
    }
}
