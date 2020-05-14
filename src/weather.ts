import * as dotenv from "dotenv"
const axios = require('axios').default;

dotenv.config()

const API_KEY = process.env['OPEN_WEATHER_MAP_API_KEY']

const inputLocations = process.argv.slice(2)

if (inputLocations == undefined || inputLocations == null || 
  inputLocations.length < 1) {
  throw new Error("Input argument is wrong!")
}

const locations = inputLocations[0].split(',')
if (locations.length == 0) {
  throw new Error('Input argument is wrong. Should be: ' + 
  'node weather.js \"New York, 10005, Tokyo, São Paulo, Pluto\"');
}

let weatherLog = new Map<string, object>()

function saveRecord(key: string, data: object) {
  weatherLog.set(key, data)
  console.log(key + ": " + data['data']['weather'][0]['main'] + 
    ', ' + new Date(data['data']['dt'] * 1000))
}

function errorRecord(key: string, error: Error) {
  weatherLog.set(key, null)
  console.log(key + ': get data wrong!')
}

function getDataFromAPI(param : string) {
  param = param.trim()
  if (isNaN(Number(param))) {
    // Input param is city name
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(param)}&appid=${API_KEY}`)
    .then((response)=>saveRecord(param, response))
    .catch((error)=>errorRecord(param, error))
  } else {
    // Input param is a zip code
    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${Number(param)},us&appid=${API_KEY}`)
    .then((response)=>saveRecord(param, response))
    .catch((error)=>errorRecord(param, error))
  }
}

locations.map(getDataFromAPI)
