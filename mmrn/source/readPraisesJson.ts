import { RNFS, DOCUMENT_DIRECTORY } from "./RNFS"

interface praisesJson {
    praiseId: {
        organization: String[]
        data: {
            position: String[][]
        }
    }
}

export function readPraisesJson(): Promise<string | praisesJson> {
    try {
        return RNFS.readAsStringAsync(`${DOCUMENT_DIRECTORY}praises.json`)
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error)
        throw error
    }
}
