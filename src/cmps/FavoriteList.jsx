import { Card } from '@material-ui/core'
import { FavoritePreview } from './FavoritePreview.jsx'
import { Loader } from './Loader.jsx'

export const FavoriteList = ({ favoritCities, onDeleteCity, onSetCity, isDarkMode, degree, darkMod }) => {
    console.log('favoritCities',favoritCities);
    if (!favoritCities || favoritCities.length === 0) return <Loader />;
    return (
        <div className='favorit-list flex align-center justify-center'>
            {favoritCities.map(favoritCity => {
                return <Card key={favoritCity._id} variant="outlined">
                    < FavoritePreview favoritCity={favoritCity}
                        onDeleteCity={onDeleteCity} onSetCity={onSetCity}
                        isDarkMode={isDarkMode} degree={degree} darkMod={darkMod} />
                </Card>
            }
            )}
        </div>
    )
}