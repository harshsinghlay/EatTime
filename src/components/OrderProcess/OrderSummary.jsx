import React, { useEffect, useState } from 'react'
import { FoodCard2, Bill } from '../index'
import { useNavigate, useParams } from 'react-router'
import {  useSelector } from 'react-redux'


function OrderSummary() {
    const { orderId } = useParams()
    const orders = useSelector(state => state.orders.orders)
    const [order, setOrder] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        const order = orders.find((order) =>
            order.orderId === orderId
        )
        setOrder(order);
    }, [])

    const cancelButtonHandler = () => {
        navigate(`/cancelorder/${orderId}`)
    }


    return (
        <div className='bg-gray-100 py-10'>
            <section className='max-w-[91%] mx-auto gap-6 flex flex-col lg:flex-row font-poppins'>
                {/*=============== Order Items ===============*/}
                <div className='  lg:w-[70%] flex flex-col gap-5'>
                    {(order?.items)?.map((item) => (
                        <div className='shadow-lg rounded-lg hover:border-[1px] border-black' key={item.orderId}>
                            <FoodCard2 {...item} />
                        </div>
                    ))}
                </div>

                {/*=============== Order Details ===============*/}
                <div className=' font-poppins shadow-lg bg-white lg:w-[40%] lg:block px-6 rounded-lg overflow-hidden'>
                    <div className='py-5 space-y-6'>
                        <p className='text-2xl  font-semibold'>Order Summary</p>
                        <p className='flex flex-col gap-1'><span className=''>OrderId</span><span className=' line-clamp-1 '>#{order?.orderId}</span></p>
                        <p className='flex flex-col gap-1'><span className=''>Order Time</span><span className=' line-clamp-2  '>{order?.time}</span></p>
                        <p className='flex flex-col gap-1'><span className=''>Order Date</span><span className=' line-clamp-2  '>{order?.date}</span></p>
                        <p className='flex flex-col gap-1'><span className=''>Billing Address</span><span className=' line-clamp-2  '>{`${order?.billingAddress.billingNo}, ${order?.billingAddress.billingArea} , ${order?.billingAddress.billingCity} , ${order?.billingAddress.billingPincode}`}</span></p>
                        <p className='flex flex-col gap-1'><span className=''>Delivery Address</span><span className=' line-clamp-2  '>{`${order?.deliveryAddress.deliveryNo}, ${order?.deliveryAddress.deliveryArea} , ${order?.deliveryAddress.deliveryCity} , ${order?.deliveryAddress.deliveryPincode}`}</span></p>
                    </div>
                    <Bill btn1='Cancel Order' func1={cancelButtonHandler} btn2='Continue Shopping' func2={() => navigate("/")} />
                </div>
            </section>
        </div>
    )
}

export default OrderSummary

