const fs = require('fs')

const ps = require("prompt-sync");

const prompt = ps();

const pathToJsons = "./public/json"

const dataJson = JSON.parse(fs.readFileSync(`${pathToJsons}/data.min.json`).toString())
const lastId = Object.entries(dataJson['praises']).length

const name = prompt("Nome do louvor: ")
const content = prompt("Conteúdo: ")

fs.writeFileSync(`${pathToJsons}/praises/${lastId}.json`, content)
dataJson['praises'][`${lastId + 1} - ${name}`] = lastId
fs.writeFileSync(`${pathToJsons}/data.min.json`, JSON.stringify(dataJson))