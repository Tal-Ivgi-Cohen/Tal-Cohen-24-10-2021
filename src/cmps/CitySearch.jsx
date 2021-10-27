import { useEffect, useState } from 'react'

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

    const onSetCity = async (ev) => {
        setCity(ev.target.value)
    }
    const getCityForecast = () => {
        console.log('cities', cities);
        onGetCityForecast(cities[0].Key)
    }
    return (
        <div className="city-search flex align-center justify-center">
            <input type="text" list="cities" onChange={onSetCity} name="cityInput"
                value={cityInput} placeholder="search city" />
            {cities && <datalist id="cities">
                {cities.map((city) => {
                    cityKey = city.key
                    return <option key={city.Key} value={city.LocalizedName} />
                }
                )}
            </datalist>}
            <button onClick={getCityForecast}>Search</button>
        </div>
    )
}