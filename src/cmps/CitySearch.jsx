import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

export const CitySearch = ({ onSearch, onGetCityForecast }) => {
    const [cityInput, setCity] = useState('')
    const [cities, setCities] = useState(null)
    let cityKey

    useEffect(() => {
        const search = async () => {
            const cities = await onSearch(cityInput)
            setCities(cities)
            return;
        }
        search()
        return () => {
        }
        // eslint-disable-next-line
    }, [cityInput])

    const handleCity = async (ev) => {
        setCity(ev.target.value)
    }
    const getCityForecast = () => {
        onGetCityForecast(cities[0].Key)
    }
    return (
        <div className="city-search flex">
            <input type="text" list="cities" onChange={handleCity} name="cityInput"
                value={cityInput} placeholder="Search city 🔍" />
            {cities && <datalist id="cities">
                {cities.map((city) => {
                    cityKey = city.key
                    return <option key={city.Key} value={city.LocalizedName} />
                })}
            </datalist>}
            <button className="btn-search" onClick={getCityForecast}><SearchIcon /></button>
        </div>
    )
}