interface praisesJson {
    praiseId: {
        organization: String[]
        data: {
            position: String[][]
        }
    }
}

export function readPraisesJson(): praisesJson {
    const praises_json = require('../assets/json/praises.json')
    return praises_json
}
