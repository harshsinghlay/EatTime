import React, { useEffect, useState } from 'react';
import { FoodCard2 } from '../index';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { LiaRupeeSignSolid } from '../../assets/icons/icons';

function OrderSummary() {
    const { orderId } = useParams();
    const orders = useSelector(state => state.orders.orders);
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const foundOrder = orders.find((order) => order.orderId === orderId);
        setOrder(foundOrder);
    }, [orderId, orders]);

    const cancelButtonHandler = () => {
        navigate(`/cancelorder/${orderId}`);
    };

    const shoppingButtonHandler = () => {
        navigate("/");
    };

    const totalItems = order?.bill?.totalItems || 0;
    const total = order?.bill?.total || 0;
    const discount = order?.bill?.discount || 0;
    const deliveryCharges = order?.bill?.deliveryCharges || 0;
    const subTotal = order?.bill?.subTotal || 0;
    const GST = order?.bill?.GST || 0;

    return (
        <div className='bg-gray-100 py-10'>
            <section className='max-w-[91%] mx-auto gap-6 flex flex-col lg:flex-row font-poppins'>
                {/*=============== Order Items ===============*/}
                <div className='lg:w-[70%] flex flex-col gap-5'>
                    {(order?.items)?.map((item) => (
                        <div className='shadow-lg rounded-lg hover:border-[1px] border-black' key={item.orderId}>
                            <FoodCard2 {...item} />
                        </div>
                    ))}
                </div>

                {/*=============== Order Details ===============*/}
                <div className='font-poppins shadow-lg bg-white lg:w-[40%] lg:block px-6 rounded-lg overflow-hidden'>
                    <div className='py-5 space-y-6'>
                        <p className='text-2xl font-semibold'>Order Summary</p>
                        <p className='flex flex-col gap-1'>
                            <span className=''>OrderId</span>
                            <span className='line-clamp-1'>#{order?.orderId}</span>
                        </p>
                        <p className='flex flex-col gap-1'>
                            <span className=''>Order Time</span>
                            <span className='line-clamp-2'>{order?.time}</span>
                        </p>
                        <p className='flex flex-col gap-1'>
                            <span className=''>Order Date</span>
                            <span className='line-clamp-2'>{order?.date}</span>
                        </p>
                        <p className='flex flex-col gap-1'>
                            <span className=''>Billing Address</span>
                            <span className='line-clamp-2'>
                                {order?.billingAddress ? `${order.billingAddress.billingNo}, ${order.billingAddress.billingArea}, ${order.billingAddress.billingCity}, ${order.billingAddress.billingPincode}` : '-'}
                            </span>
                        </p>
                        <p className='flex flex-col gap-1'>
                            <span className=''>Delivery Address</span>
                            <span className='line-clamp-2'>
                                {order?.deliveryAddress ? `${order.deliveryAddress.deliveryNo}, ${order.deliveryAddress.deliveryArea}, ${order.deliveryAddress.deliveryCity}, ${order.deliveryAddress.deliveryPincode}` : '-'}
                            </span>
                        </p>
                    </div>
                    <div>
                        <section className='py-6 border-b-2 space-y-3 border-gray-200 font-poppins'>
                            <p className='flex justify-between'>
                                <span>TotalItems:</span>
                                <span className='font-semibold'>{totalItems}</span>
                            </p>
                            <p className='flex justify-between'>
                                <span>Total:</span>
                                <span className='font-semibold'>
                                    {total ? (
                                        <>
                                            <LiaRupeeSignSolid className='inline' />
                                            {total.toFixed(2)}
                                        </>
                                    ) : '-'}
                                </span>
                            </p>
                            <p className='flex justify-between'>
                                <span>Discount:</span>
                                <span className='font-semibold'>
                                    {discount ? (
                                        <>
                                            -<LiaRupeeSignSolid className='inline' />
                                            {discount.toFixed(2)}
                                        </>
                                    ) : '-'}
                                </span>
                            </p>
                            <p className='flex justify-between'>
                                <span>Delivery:</span>
                                <span className='font-semibold'>
                                    {deliveryCharges ? (
                                        <>
                                            <LiaRupeeSignSolid className='inline' />
                                            {deliveryCharges.toFixed(2)}
                                        </>
                                    ) : '-'}
                                </span>
                            </p>
                            <p className='flex justify-between'>
                                <span>Tax:</span>
                                <span className='font-semibold'>
                                    {GST ? (
                                        <>
                                            <LiaRupeeSignSolid className='inline' />
                                            {GST.toFixed(2)}
                                        </>
                                    ) : '-'}
                                </span>
                            </p>
                        </section>

                        <section className='space-y-5 pt-3 pb-6'>
                            <p className='text-3xl font-semibold tracking-wide'>
                                {subTotal ? (
                                    <>
                                        <LiaRupeeSignSolid className='inline' />
                                        {subTotal.toFixed(2)}
                                    </>
                                ) : '-'}
                            </p>
                            <button
                                onClick={cancelButtonHandler}
                                className='w-full py-2 border-2 border-red-500 rounded-md text-red-500 lg:hover:bg-red-500 lg:hover:text-white lg:hover:border-red-500 active:bg-gray-200'
                            >
                                Cancel Order
                            </button>
                            <button
                                onClick={shoppingButtonHandler}
                                className='w-full py-2 border-2 border-red-500 bg-red-500 rounded-md text-white lg:hover:bg-white lg:hover:border-2 lg:hover:border-red-500 lg:hover:text-red-500 active:bg-red-600'
                            >
                                Continue Shopping
                            </button>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default OrderSummary;
