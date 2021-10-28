import { Home } from './pages/Home.jsx';
import { Favorite } from './pages/Favorite.jsx';

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/favorite',
        component: Favorite,
    },
]