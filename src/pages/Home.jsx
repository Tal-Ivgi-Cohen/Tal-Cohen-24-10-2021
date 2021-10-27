import { useEffect, useState } from 'react'
import { weatherService } from '../services/weather.service.js'
import { errorMsg, setCity } from '../store/weather.action.js';
import { useDispatch, useSelector } from 'react-redux'
import { CitySearch } from '../cmps/CitySearch';
import { WeatherList } from '../cmps/WeatherList'
import { MsgModal } from '../cmps/MsgModal'
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

export const Home = () => {
    const { cityKey, darkMod, degree, error } = useSelector(state => state.weatherModule)
    const [forecast, setForecast] = useState('')
    const [currentForecast, setCurrentForecast] = useState('')
    const [favorits, setFavorits] = useState('')
    const [cityName, setcityName] = useState('')
    const dispatch = useDispatch()
    let cityId

    useEffect(() => {
        if (cityKey === '') {
            navigator.geolocation.getCurrentPosition(success, navigatorError)
        } else {
            try {
                onGetCityForecast(cityKey)
            } catch (err) {
                dispatch(errorMsg(err))
            }
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        try {
            const loadCities = async () => {
                const favCities = await weatherService.loadCities()
                setFavorits(favCities)
            }
            loadCities()
        } catch (err) {
            dispatch(errorMsg(err))
        }
        return () => {
        }
        // eslint-disable-next-line
    }, [])

    const success = async (pos) => {
        try {
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            const city = await weatherService.getLatLanCoor(lat, lon)
            dispatch(setCity(city.cityKey))
            setcityName(city.LocalizedName)
            await onGetCityForecast(city.Key)
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const navigatorError = () => {
        try {
            dispatch(setCity('215837'))
            dispatch(errorMsg('there was an error to get location'))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const isDarkMode = () => {
        return darkMod ? 'dark' : ''
    }
    const onSearch = async (searchTerm) => {
        try {
            const search= await weatherService.searchCityAutoComplete(searchTerm)
            return search
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const onGetCityForecast = async (cityKey) => {
        try {
            dispatch(setCity(cityKey))
            const forecast5Day = await weatherService.get5DayForeCast(cityKey, degree)
            const currentForecast = await weatherService.getCityCurrentCondition(cityKey)
            const city = await weatherService.searchCityByCityKey(cityKey)
            setCurrentForecast(currentForecast[0])
            setForecast(forecast5Day.DailyForecasts)
            setcityName(city.LocalizedName)
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const getTemp = () => {
        if (degree === '℃') {
            return currentForecast.Temperature.Metric.Value
        } else {
            return currentForecast.Temperature.Imperial.Value
        }
    }
    const onAddToFavorits = () => {
        try {
            weatherService.saveCity(cityKey, cityName)
            dispatch(errorMsg('city added to favorits'))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const onDeleteCity = () => {
        try {
            weatherService.removeCity(cityId)
            dispatch(errorMsg('city removed'))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const isFavorit = () => {
        if (!favorits || favorits.length === 0) return false
        return favorits.some(city => {
            cityId = city._id
            return city.cityKey === cityKey
        })
    }
    const onCloseModal = () => {
        dispatch(errorMsg(''))
    }

    return (
        <section className="main-container">
            <div className={`forecast-page ${isDarkMode()} flex column justify-center align-center`}>

                <CitySearch onSearch={onSearch} onGetCityForecast={onGetCityForecast} />
                {cityName && <h1>{cityName}</h1>}
                {currentForecast && <span>{currentForecast.WeatherText}</span>}
                {forecast && <span className="current-temp">{getTemp()}{degree}</span>}
                {forecast && <WeatherList forecast={forecast}
                    isDarkMode={isDarkMode} degree={degree} darkMod={darkMod} />}
                {isFavorit() ? <button className="btn-remove-from-favorit"
                    onClick={onDeleteCity}><DeleteIcon /></button>
                    : <button className="btn-add-to-favorit"
                        onClick={() => onAddToFavorits()}> <FavoriteIcon /></button>}
            </div>
            {error && <MsgModal msg={error} onCloseModal={onCloseModal} />}
        </section>
    )
}