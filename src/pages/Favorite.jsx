import { useEffect, useState } from 'react'
import { weatherService } from '../services/weather.service.js'
import { errorMsg, setCity } from '../store/weather.action.js';
import { useDispatch, useSelector } from 'react-redux'
import { FavoriteList } from '../cmps/FavoriteList'
import { MsgModal } from '../cmps/MsgModal'

export const Favorite = (props) => {
    const { degree, error } = useSelector(state => state.weatherModule)
    const [favoriteCities, setFavoritCities] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const loadFavCities = async () => {
            const favCities = await weatherService.loadCities()
            setFavoritCities(favCities)
        }
        loadFavCities()
        return () => {
        }
        // eslint-disable-next-line
    }, [error])

    const onDeleteCity = (cityId) => {
        try {
            weatherService.removeCity(cityId)
            const cities = weatherService.loadCities()
            setFavoritCities(cities)
            dispatch(errorMsg('city removed'))
            props.history.push('/');
        } catch (err) {
            dispatch(errorMsg(err))
        }
    }
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
                <div className={`fav-page flex column`}>
                    {favoriteCities && <FavoriteList favoriteCities={favoriteCities} onDeleteCity={onDeleteCity} onSetCity={onSetCity} degree={degree} />}
                </div>
                {error && <MsgModal msg={error} onCloseModal={onCloseModal} />}
            </section>
        </div>
    )
}