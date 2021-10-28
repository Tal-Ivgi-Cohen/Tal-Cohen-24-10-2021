import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setDegree, setIsDarkMod } from '../store/weather.action.js'
import { MsgModal } from './MsgModal'
import FavoriteIcon from '@material-ui/icons/Favorite';
import LightModeIcon from '@mui/icons-material/LightMode';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@material-ui/icons/Home';

export function Header() {
    const { darkMod, error } = useSelector(state => state.weatherModule)
    const [isDark, setIsDark] = useState(false)
    const [celtoFer, setCeltoFer] = useState('℃')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDegree(celtoFer))
        // eslint-disable-next-line
    }, [celtoFer])

    useEffect(() => {
        dispatch(setIsDarkMod(isDark))
        // eslint-disable-next-line
    }, [isDark])

    const setClassName = () => {
        return darkMod ? 'app-header darker' : 'app-header'
    }
    const onSetIsDark = () => {
        if (isDark) {
            document.querySelector('.app').classList.remove('dark')
        } else {
            document.querySelector('.app').classList.add('dark')
        }
        setIsDark(!isDark)
    }
    const degreeType = () => {
        if (celtoFer === '℃') setCeltoFer('℉')
        else setCeltoFer('℃')
    }

    return (
        <header className={setClassName()}>
            <div className="main-nav flex space-evenly">
                <div className="actions-btn">
                    {isDark ? <button onClick={onSetIsDark}><LightModeIcon /></button> :
                        <button onClick={onSetIsDark}><DarkModeIcon /></button>}
                    <button onClick={degreeType}><ThermostatIcon />{celtoFer} </button>
                </div>
                <div>
                    <div className="header-title flex">
                        <h1>Talco Weather</h1>
                    </div>
                </div>
                <nav className="flex">
                    <NavLink to="/"><HomeIcon /></NavLink>
                    <NavLink to="/favorite"><FavoriteIcon /></NavLink>
                </nav>
            </div>
            {error && <MsgModal msg={error} />}
        </header>
    )
}