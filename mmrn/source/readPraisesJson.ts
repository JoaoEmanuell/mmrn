import { RNFS, DOCUMENT_DIRECTORY } from './RNFS'

interface praisesJson {
    praiseId: {
        organization: String[]
        data: {
            position: String[][]
        }
    }
}

export async function readPraisesJson(
    id: string
): Promise<string | praisesJson> {
    try {
        const documentDirList = await RNFS.readdir(DOCUMENT_DIRECTORY)
        let praisesDirExists
        try {
            await RNFS.readdir(`${DOCUMENT_DIRECTORY}/praises`)
            praisesDirExists = false
        } catch (err) {
            praisesDirExists = true
            console.log('praises dir not exist')
        }

        if (
            !documentDirList.includes('data.min.json') ||
            praisesDirExists === true
        ) {
            // praises not in praises
            const praisesJson = require('../assets/json/praises.json')
            return praisesJson
        } else {
            return RNFS.readFile(`${DOCUMENT_DIRECTORY}/praises/${id}.json`)
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error)
        throw error
    }
}
