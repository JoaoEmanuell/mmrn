import { RNFS, DOCUMENT_DIRECTORY } from "./RNFS"

export async function readDataJson(): Promise<string> {
    try {
        return RNFS.readAsStringAsync(`${DOCUMENT_DIRECTORY}data.json`)
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error)
        throw error
    }
}
