import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
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

