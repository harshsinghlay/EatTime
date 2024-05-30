import React, { useEffect } from 'react'
import OrderSummary from './OrderSummary'
import ProgressBar from './ProgressBar'
import { useDispatch } from 'react-redux'
import { setCart } from '../../redux/features/food/cartSlice'

function PaymentSuccess() {
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setCart([]))
        }
    }, [])

    return (
        <div className='bg-gray-100'>

            <section className='hidden md:block pt-10 max-w-[91%] mx-auto '>
                <div className='w-[80%] lg:w-[60%] xl:w-[50%] mx-auto '><ProgressBar progressPercentage={100} /></div>
            </section>

            {/*========== Payment Success Message ==========*/}
            <section className='max-w-[91%] mx-auto h-full min-w-20 space-y-2 md:space-y-3 pt-10'>
                <p className='text-2xl md:text-3xl font-semibold text-green-500'>Payment Successful</p>
                <p className='text-lg md:text-xl'>Hi Harsh !</p>
                <p className='text-lg md:text-xl'>Your order has been placed successfully.</p>
            </section>

            {/*============= Order Details =============*/}
            <section>
                <OrderSummary paymentPage={true} />
            </section>


        </div>
    )
}

export default PaymentSuccess