import { storageService } from './storageService.js'
import { utilService } from './utilService.js'

export const weatherService = {
    saveCity,
    removeCity,
    loadCities,
    searchCityByCityKey,
    searchCityAutoComplete,
    getCityCurrentCondition,
    get5DayForeCast,
    getLatLanCoor
}

const STORAGE_KEY = 'city'
//שלי
//const API_KEY = '2zhLrtJ3HnKoU76cdKftLNoOs1zKddMt'
//פיקטיבי
//const API_KEY='0lOiuGFXOPnlXrGVatvupDjjaGVRdvG2' 
const API_KEY=''
const URL ='http://dataservice.accuweather.com'
const gCitys = []

async function saveCity(cityKey, cityName) {
    try {
        const cityCurrentCondition = await weatherService.getCityCurrentCondition(cityKey)
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
        console.log('cities in service',cities);
        return cities;
    } catch (err) {
        const msg = err
        throw new Error(msg)
    }
}
async function searchCityAutoComplete(searchTerm) {
    try {
        let response = await fetch(`${URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const cities = await response.json()
        return cities
    } catch (err) {
        const msg = (err.message);
        Promise.reject(msg)
    }
}
async function searchCityByCityKey(cityKey) {
    try {
        let response = await fetch(`${URL}/locations/v1/${cityKey}?apikey=${API_KEY}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const city = await response.json()
        return city
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg)
    }
}

async function getCityCurrentCondition(cityKey) {
    try {
        let response = await fetch(`${URL}/currentconditions/v1/${cityKey}?apikey=${API_KEY}&details=false`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
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
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const forecast5day = await response.json()
        return forecast5day
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg);
    }
}

async function getLatLanCoor(lat, lon) {
    try {
        const response = await fetch(`${URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const city = await response.json()
        return city
    } catch (err) {
        const msg = (err.message)
        Promise.reject(msg);
    }

}