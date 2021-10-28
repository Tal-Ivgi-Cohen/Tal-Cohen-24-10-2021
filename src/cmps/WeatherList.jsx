import { Card } from '@material-ui/core'
import { WeatherPreview } from './WeatherPreview.jsx'

export const WeatherList = ({ forecast, degree }) => {

    return (
        <div className='weather-list'>
            {forecast.map(day => {
                return <Card key={day.EpochDate} variant="outlined" className="weather-preview-card">
                    <WeatherPreview day={day} degree={degree} /></Card>
            })}
        </div>
    )
}