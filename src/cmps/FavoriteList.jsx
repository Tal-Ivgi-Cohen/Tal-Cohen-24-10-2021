import { Card } from '@material-ui/core'
import { FavoritePreview } from './FavoritePreview.jsx'
import { Loader } from './Loader.jsx'

export const FavoriteList = ({ favoriteCities, onDeleteCity, onSetCity, isDarkMode, degree}) => {
    if (!favoriteCities || favoriteCities.length === 0) return <Loader />;
    return (
        <div className='fav-list'>
            {favoriteCities.map(favoriteCity => {
                return <Card key={favoriteCity._id} variant="outlined">
                    < FavoritePreview favoriteCity={favoriteCity}
                        onDeleteCity={onDeleteCity} onSetCity={onSetCity}
                        isDarkMode={isDarkMode} degree={degree} />
                </Card>
            }
            )}
        </div>
    )
}