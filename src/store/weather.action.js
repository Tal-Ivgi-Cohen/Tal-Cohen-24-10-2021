import { utilService } from '../services/utilService.js';

export function setCity(cityKey) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_CITY', cityKey })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}

export function setIsDarkMod(isDark) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_DARKMOD', isDark })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}
export function setDegree(degree) {
    return dispatch => {
        try {
            const degree = utilService.celsiusToFahrenheit();
            dispatch({ type: 'SET_DEGREE', degree })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}

export function errorMsg(msg) {
    return dispatch => {
        try {
            dispatch({ type: 'ERROR', msg })
        } catch (err) {
            dispatch({ type: 'ERROR', err })
        }
    }
}