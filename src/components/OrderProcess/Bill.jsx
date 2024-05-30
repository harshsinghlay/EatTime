import React from 'react'
import useBillCalc from '../../Hooks/useBillCalc'
import { LiaRupeeSignSolid } from '../../assets/icons/icons'

function Bill({ btn1 = "", func1, btn2 = "", func2 }) {
    const { total, subTotal, deliveryCharges, GST, discount, totalItems } = useBillCalc()

    return (
        <div className='w-full h-full '>

            <section className='py-6 border-b-2 space-y-3 border-gray-200 font-poppins'>
                <p className='flex justify-between'><span>TotalItems:</span><span className='font-semibold'>{totalItems ? totalItems : "-"}</span></p>
                <p className='flex justify-between'>
                    <span>Total:</span>
                    <span className='font-semibold'>{total ? <><LiaRupeeSignSolid className='inline' />{total?.toFixed(2)}</> : "-"}</span>
                </p>
                <p className='flex justify-between'>
                    <span>Discount:</span>
                    <span className='font-semibold'>{discount ? <>-<LiaRupeeSignSolid className='inline' />{discount?.toFixed(2)}</> : "-"}</span>
                </p>
                <p className='flex justify-between'>
                    <span>Delivery:</span>
                    <span className='font-semibold'>{deliveryCharges ? <><LiaRupeeSignSolid className='inline' />{deliveryCharges?.toFixed(2)}</> : "-"}</span>
                </p>
                <p className='flex justify-between'>
                    <span>Tax:</span>
                    <span className='font-semibold'>{GST ? <><LiaRupeeSignSolid className='inline' />{GST?.toFixed(2)}</> : "-"}</span>
                </p>
            </section>

            <section className='space-y-5 pt-3 pb-6'>
                <p className='text-3xl font-semibold tracking-wide'>{subTotal ? <><LiaRupeeSignSolid className='inline' />{subTotal.toFixed(2)}</> : "-"}</p>
                {btn1 && <button onClick={func1 && func1} className='w-full py-2 border-2 border-red-500 rounded-md text-red-500 lg:hover:bg-red-500 lg:hover:text-white lg:hover:border-red-500  active:bg-gray-200'>{btn1}</button>}
                {btn2 && <button onClick={func2 && func2} className='w-full py-2 border-2 border-red-500 bg-red-500 rounded-md text-white lg:hover:bg-white lg:hover:border-2 lg:hover:border-red-500 lg:hover:text-red-500 active:bg-red-600'>{btn2}</button>}
            </section>

        </div>
    )
}

export default Bill
