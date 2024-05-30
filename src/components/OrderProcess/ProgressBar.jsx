import React from 'react'

function ProgressBar({ progressPercentage = 35 }) {
    return (
        <div className='flex justify-between relative w-full font-poppins py-4'>
            <div className='absolute w-full h-1 bg-white top-1/2 '>
                <div className='bg-gray-700 h-full' style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className='absolute w-full transform -translate-y-1/2 flex justify-between'>
                <div className={`bg-gray-700 text-white px-4 py-1 rounded-full `}>Cart</div>
                <div className={`${progressPercentage >= 35 ? "bg-gray-700 text-white" : "bg-white border-[1px]  text-black"}  px-4 py-1 rounded-full `}>Checkout</div>
                <div className={`${progressPercentage >= 70 ? "bg-gray-700 text-white" : "bg-white border-[1px]  text-black"}  px-4 py-1 rounded-full `}>Payment</div>
                <div className={`${progressPercentage >= 100 ? "bg-gray-700 text-white" : "bg-white border-[1px]  text-black"}  px-4 py-1 rounded-full `}>Order</div>
            </div>
        </div>
    )
}

export default ProgressBar