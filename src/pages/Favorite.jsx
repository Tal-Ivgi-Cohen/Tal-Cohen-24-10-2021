import  { useEffect, useState } from 'react'
import { weatherService } from '../services/weather.service.js'
import { errorMsg, setCity } from '../store/weather.action.js';
import { useDispatch, useSelector } from 'react-redux'
import { FavoriteList } from '../cmps/FavoriteList'
import { MsgModal } from '../cmps/MsgModal'

export const Favorite = () => {
    const { darkMod, degree, error } = useSelector(state => state.weatherModule)
    const [favoritCities, setFavoritCities] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const loadFavCities = async () => {
                const favCities = await weatherService.loadCities()
                setFavoritCities(favCities)               
            }
            loadFavCities()
        } catch (err) {
            dispatch(errorMsg(err))
        }
        return () => {
        }
        // eslint-disable-next-line
    }, [error])

    const isDarkMode = () => {
        return darkMod ? 'dark' : ''
    }
    const onDeleteCity = (cityId => {
        try {
            weatherService.removeCity(cityId)
            const cities = weatherService.loadCities()
            setFavoritCities(cities)
            dispatch(errorMsg('city removed'))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    })
    const onSetCity = (cityKey) => {
        try {
            dispatch(setCity(cityKey))
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
    const onCloseModal = () => {
        dispatch(errorMsg(''))
    }
    return (
        <div>
            <section className='main-container'>
                <div className={`favorit-page ${isDarkMode()} flex column`}>
                    {favoritCities &&
                        <FavoriteList
                            favoritCities={favoritCities}
                            onDeleteCity={onDeleteCity}
                            onSetCity={onSetCity}
                            isDarkMode={isDarkMode}
                            degree={degree}
                            darkMod={darkMod}
                        />}
                </div>
                {error && <MsgModal msg={error} onCloseModal={onCloseModal} />}
            </section>
        </div>
    )
}