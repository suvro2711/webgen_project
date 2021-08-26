import React from 'react'
import { useHistory } from 'react-router-dom'
import './logoff.scss'

const LogOff = () => {
    const userImageLink = localStorage.getItem('image')
    const { push } = useHistory(null)
    const clearAndLogout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('image')
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('token')
        push('/')
    }
    return (
        <buttons className='logoff' onClick={clearAndLogout}>
            {!(userImageLink === 'undefined') ? <div className='logoff_logo'>
                <img src={userImageLink} alt='user' />
            </div> : null}
            <span className='logoff_text'>Logoff</span>
        </buttons>
    )
}

export default LogOff