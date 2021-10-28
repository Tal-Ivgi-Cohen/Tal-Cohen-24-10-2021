import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';

export const FavoritePreview = ({ favoriteCity, onDeleteCity, onSetCity, degree }) => {
    const [temp, setTemp] = useState('')
    const [unit, setUnit] = useState('')

    useEffect(() => {
        setTemp(getTemp())
        setUnit(getUnit())
        // eslint-disable-next-line
    }, [degree])

    const onPreviewClick = () => {
        onSetCity(favoriteCity.cityKey)
    }
    const removeCity = (ev) => {
        ev.preventDefault()
        onDeleteCity(favoriteCity._id)
    }
    const getTemp = () => {
        if (degree === '℃') {
            return favoriteCity.cityCurrentCondition[0].Temperature.Metric.Value
        } else {
            return favoriteCity.cityCurrentCondition[0].Temperature.Imperial.Value
        }
    }
    const getUnit = () => {
        if (degree === '℃') {
            return favoriteCity.cityCurrentCondition[0].Temperature.Metric.Unit
        } else {
            return favoriteCity.cityCurrentCondition[0].Temperature.Imperial.Unit
        }
    }

    return (
        <div className="fav-preview" onClick={onPreviewClick}>
            <Link to="/" className="favPreview-link">
                <h2>{favoriteCity.name}</h2>
                <div className="fav-content flex column justify-center align-center">
                    <span>
                        {temp && <span>{temp}</span>}{temp && <span>{unit}</span>}
                    </span>
                    <span>
                        <span className="feel-color">Feel in day: </span>
                        {favoriteCity.cityCurrentCondition[0].WeatherText}
                    </span>
                    <button className="delete-btn" onClick={(ev) => removeCity(ev)}><DeleteIcon /></button>
                </div>
            </Link>
        </div>
    )
}