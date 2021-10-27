import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setDegree, setIsDarkMod } from '../store/weather.action.js'
import { MsgModal } from './MsgModal'

export function Header() {
    const { darkMod, error } = useSelector(state => state.weatherModule)
    const [isDark, setIsDark] = useState(false)
    const [C_or_F, setC_or_F] = useState('℃')
    // const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDegree(C_or_F))
    }, [C_or_F])
    useEffect(() => {
        dispatch(setIsDarkMod(isDark))
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
        (C_or_F === '℃') ? setC_or_F('℉') : setC_or_F('℃')
    }
    return (
        <header className={setClassName()}>
            <nav className="main-nav flex space-between">
                <div>
                {isDark ? <button onClick={onSetIsDark}>Toggle light</button> :
                    <button onClick={onSetIsDark}>Toggle Dark</button>}
                <button onClick={degreeType}>{C_or_F}</button>
                </div>
                <div>
                    <div>
                        <p>Herolo Weather App</p>
                    </div>
                </div>
                <div>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/favorites">Favorites</NavLink> 
                </div>
            </nav>
            {error && <MsgModal msg={error} />}
        </header>
    )
}