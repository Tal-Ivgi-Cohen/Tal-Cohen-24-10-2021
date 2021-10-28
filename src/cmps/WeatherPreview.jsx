export const WeatherPreview = ({ day, degree }) => {

    const getTemp = (min, max) => {
        if (degree === '℃') {
            const avgTemp = '' + (min + max) / 2
            return avgTemp.substr(0, 4)
        } else {
            const avgTemp = '' + (((min + max) / 2) * 9 / 5 + 32)
            return avgTemp.substr(0, 4)
        }
    }
    const getDate = () => {
        const year = day.Date.substr(0, 4)
        const month = day.Date.substr(5, 2)
        const dateDay = day.Date.substr(8, 2)
        const date = `${dateDay}/${month}/${year}`
        return date
    }

    return (
        <div className={`weather-preview flex column align-center justify-center`}>
            <span>{getDate()}</span>
            <div>
                <span className="degree">
                    {getTemp(day.Temperature.Minimum.Value, day.Temperature.Maximum.Value)}</span>
                <span className="degree">{degree}</span>
            </div>
            <div className="fillflex column align-center justify-center">
            <span className="feel-color">Feel in day: </span>  {day.Day.IconPhrase}
            </div>
            <div className="flex column align-center justify-center">
            <span className="feel-color">Feel in night:</span>{day.Night.IconPhrase}
            </div>
        </div>
    )
}