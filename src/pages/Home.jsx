import { useEffect, useState } from 'react'
import { weatherService } from '../services/weather.service.js'
import { errorMsg, setCity } from '../store/weather.action.js';
import { useDispatch, useSelector } from 'react-redux'
import { CitySearch } from '../cmps/CitySearch';
import { WeatherList } from '../cmps/WeatherList'
import { MsgModal } from '../cmps/MsgModal'
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

export const Home = (props) => {
    const { cityKey, darkMod, degree, error } = useSelector(state => state.weatherModule)
    const [forecast, setForecast] = useState('')
    const [currentForecast, setCurrentForecast] = useState('')
    const [favorites, setFavorites] = useState('')
    const [cityName, setcityName] = useState('')
    const dispatch = useDispatch()
    let cityId

    useEffect(() => {
        if (cityKey === '') {
            navigator.geolocation.getCurrentPosition(success, geoLocationError)
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
                setFavorites(favCities)
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
            const city = await weatherService.getPos(lat, lon)
            dispatch(setCity(city.cityKey))
            setcityName(city.LocalizedName)
            await onGetCityForecast(city.Key)
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const geoLocationError = () => {
        try {
            dispatch(setCity('215854'))
            dispatch(errorMsg('there was an error to get location'))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }

    const onSearch = async (searchTerm) => {
        try {
            const search = await weatherService.searchCityAutoComplete(searchTerm)
            return search
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const onGetCityForecast = async (cityKey) => {
        try {
            dispatch(setCity(cityKey))
            const forecast5Day = await weatherService.get5DayForeCast(cityKey, degree)
            const currentForecast = await weatherService.getCityCurrCondition(cityKey)
            const city = await weatherService.searchCityByKey(cityKey)
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
    const onAddToFavorites = () => {
        try {
            weatherService.saveCity(cityKey, cityName)
            dispatch(errorMsg('City added to favorites'))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const onDeleteCity = () => {
        try {
            weatherService.removeCity(cityId)
            dispatch(errorMsg('City removed'))
            props.history.push('/');

        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const setIsFavorite = () => {
        if (!favorites || favorites.length === 0) return false
        return favorites.some(city => {
            cityId = city._id
            return city.cityKey === cityKey
        })
    }
    const onCloseModal = () => {
        dispatch(errorMsg(''))
    }

    return (
        <section>
            <div className="main-container">
                <div className={`weather-page flex column`}>
                    <div>
                        <CitySearch onSearch={onSearch} onGetCityForecast={onGetCityForecast} />
                    </div>
                    <div className="city-info flex column">
                        {cityName && <h1>{cityName}</h1>}
                        {currentForecast && <div>{currentForecast.WeatherText}</div>}
                        {forecast && <div className="current-temp">{getTemp()}{degree}</div>}
                    </div>
                    {forecast &&
                        <WeatherList forecast={forecast} degree={degree} />
                    }
                    {setIsFavorite() ? <button className="remove-btn"
                        onClick={onDeleteCity}><DeleteIcon /></button>
                        : <button className="add-btn"
                            onClick={() => onAddToFavorites()}> <FavoriteIcon /></button>}
                </div>
                {error && <MsgModal msg={error} onCloseModal={onCloseModal} />}
            </div>
        </section >
    )
}
