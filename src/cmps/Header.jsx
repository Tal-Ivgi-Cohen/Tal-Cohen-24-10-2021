import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setDegree, setIsDarkMod } from '../store/weather.action.js'
import { MsgModal } from './MsgModal'
import FavoriteIcon from '@material-ui/icons/Favorite';
//import ThermostatIcon from '@material-ui/icons/Thermostat';
//import DarkModeIcon from '@material-ui/icons/DarkMode';
//import LightModeIcon from '@material-ui/icons/LightMode';
import HomeIcon from '@material-ui/icons/Home';

export function Header() {
    const { darkMod, error } = useSelector(state => state.weatherModule)
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

    const setClassName = () => {
        return darkMod ? 'main-container app-header dark' : 'main-container app-header'
    }
    const onSetIsDark = () => {
        if (isDark) {
            document.querySelector('.weather-app').classList.remove('dark')
        } else {
            document.querySelector('.weather-app').classList.add('dark')
        }
        setIsDark(!isDark)
    }
    const degreeType = () => {
        if(C_or_F === '℃'){
            setC_or_F('℉')   
        }else{
            setC_or_F('℃')  
        } 
    }
    return (
        <header className={setClassName()}>
            <nav className="main-nav flex space-between">
                <div>
                    {isDark ? <button onClick={onSetIsDark}>Toggle Light</button> :
                        <button onClick={onSetIsDark}>Toggle Dark</button>}
                        {/*<DarkModeIcon />*/}
                    <button onClick={degreeType}>{C_or_F}</button>
                </div>
                <div>
                    <div>
                        <p>Herolo Weather App</p>
                    </div>
                </div>
                <div>
                    <NavLink to="/"><HomeIcon /></NavLink> |
                    <NavLink to="/favorite">
                        <FavoriteIcon />
                    </NavLink>
                </div>
            </nav>
            {error && <MsgModal msg={error} />}
        </header>
    )
}