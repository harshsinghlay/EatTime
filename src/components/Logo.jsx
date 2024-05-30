import React from 'react'
import { LuClock9 } from '../assets/icons/icons'

function Logo({ className = "" }) {
    return (
        <div className={`flex items-center justify-center text-lg lg:text-2xl ${className}`}><LuClock9 />
            < p className='' > Eat
                < span className='text-orange-400 font-serif font-bold text-xl lg:text-3xl ' >Time</span >
            </p ></div >
    )
}

export default Logo