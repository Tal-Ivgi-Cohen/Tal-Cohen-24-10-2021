import { storageService } from './storageService.js'
import { utilService } from './utilService.js'

export const weatherService = {
    saveCity,
    removeCity,
    loadCities,
    searchCityByKey,
    searchCityAutoComplete,
    getCityCurrCondition,
    get5DayForeCast,
    getPos
}

const STORAGE_KEY = 'city'
const API_KEY = 'ZmyFKscWMr8SuxmDpLK2xGRB0nbLbeZ9'
const URL ='http://dataservice.accuweather.com'
const gCitys = []

async function saveCity(cityKey, cityName) {
    try {
        const cityCurrentCondition = await weatherService.getCityCurrCondition(cityKey)
        const cityToSave = {
            _id: utilService.makeId(),
            name: cityName,
            cityCurrentCondition,
            cityKey
        }
        gCitys.push(cityToSave)
        storageService.saveToStorage(STORAGE_KEY, gCitys)
        return Promise.resolve(cityToSave);
    } catch (err) {
        const msg = err
        return Promise.reject(msg)
    }
}
function removeCity(cityId) {
    try {
        const idx = gCitys.findIndex(city => city._id === cityId)
        gCitys.splice(idx, 1)
        storageService.saveToStorage(STORAGE_KEY, gCitys)
        return Promise.resolve();
    } catch (err) {
        const msg = err
        throw new Error(msg)
    }
}
function loadCities() {
    try {
        const cities = storageService.loadFromStorage(STORAGE_KEY)||[]
        return cities;
    } catch (err) {
        const msg = err
        throw new Error(msg)
    }
}
async function searchCityAutoComplete(searchTerm) {
    try {
        let response = await fetch(`${URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`)
        const cities = await response.json()
        return cities
    } catch (err) {
        const msg = (err.message);
       console.log(msg)
    }
}
async function searchCityByKey(cityKey) {
    try {
        let response = await fetch(`${URL}/locations/v1/${cityKey}?apikey=${API_KEY}`)
        const city = await response.json()
        return city
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg)
    }
}

async function getCityCurrCondition(cityKey) {
    try {
        let response = await fetch(`${URL}/currentconditions/v1/${cityKey}?apikey=${API_KEY}&details=false`)
        const correntCondition = await response.json()
        return correntCondition
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg);
    }
}

async function get5DayForeCast(cityKey, isC) {
    const metric = () => {
        return isC === '℃' ? true : false
    }
    try {
        let response = await fetch(`${URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=${metric()}`)
        const forecast5day = await response.json()
        return forecast5day
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg);
    }
}

async function getPos(lat, lon) {
    try {
        const response = await fetch(`${URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`)
        const city = await response.json()
        return city
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg);
    }
}