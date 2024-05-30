import React, { useEffect } from 'react'
import OrderSummary from './OrderSummary'
import { removeFromOrders } from '../../redux/features/food/ordersSlice'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'

function CancelOrder() {
    const dispatch = useDispatch()
    const { orderId } = useParams();


    useEffect(() => {
        return () => {
            dispatch(removeFromOrders(orderId))
        }
    }, [])

    return (
        <div className='bg-gray-100'>

            {/*============= Order Cancellation Message =============*/}
            <section className='max-w-[91%] mx-auto h-full min-w-20 space-y-2 md:space-y-3 pt-10'>
                <p className='text-2xl md:text-3xl font-semibold text-red-500'>Order Cancelled Successfully </p>
                <p className='text-lg md:text-xl'>Hi Harsh !</p>
                <p className='text-lg md:text-xl'>Your order has been cancelled successfully.</p>
            </section>

            {/*================ Order Details ================*/}
            <section>
                <OrderSummary />
            </section>

        </div>
    )
}

export default CancelOrder