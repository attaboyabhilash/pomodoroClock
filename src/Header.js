import React from 'react'
import Logo from './myMainLogo.svg'
import './index.css'

export default function Header() {
    return (
        <div>
            <h1 className="pClock">
                <img src={Logo} alt="myLogo" className="myLogo"/>
                Pomodoro Clock
                <div className="outer">
                    <span className="inner"></span>
                </div>
            </h1>
        </div>
    )
}
