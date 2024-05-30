import React from 'react'
import { CiStar , FaStar } from '../../assets/icons/icons'

function Rating({ rate }) {
    return (
        <span className='flex items-center pr-4 border-r-2 border-gray-600 gap-1'>
            {[1, 2, 3, 4, 5].map((value) => (
                <div className='cursor-pointer ' key={value} >{
                    rate < value ?
                        <CiStar className='text-xl ' /> :
                        <FaStar className='text-lg  text-yellow-400' />
                }
                </div>
            ))}
        </span>
    )
}

export default Rating