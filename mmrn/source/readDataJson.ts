interface dataJson {
    praises: {
        name: number
    }
}

export function readDataJson(): dataJson {
    const data_json = require('../assets/json/data.json')
    return data_json
}
