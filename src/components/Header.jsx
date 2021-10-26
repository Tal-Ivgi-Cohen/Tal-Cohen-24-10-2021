import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDegree, setIsDarkMod } from '../store/weather.action.js'
//import { Modal } from './Modal'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    // const { darkMod, error } = useSelector(state => state.weatherModule)
    const [isDark, setIsDark] = useState(false)
    const [C_or_F, setC_or_F] = useState('℃')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDegree(C_or_F))
        // eslint-disable-next-line
    }, [C_or_F])

    useEffect(() => {
        dispatch(setIsDarkMod(isDark))
        // eslint-disable-next-line
    }, [isDark])

    return (
        <header className="app-header flex">
            <div>
                <div>
                    <button>toggle C/F</button>
                    <button>toggle dark mode</button>
                </div>
            </div>
            <div>
                <div>
                    <p>Herolo Weather App</p>
                </div>
            </div>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/favorites">Favorites</NavLink> |
            </nav>
        </header>
    )
}

