import React, { useState, useEffect } from 'react'
import { Bill } from '../index';
import ProgressBar from './ProgressBar';
import CardDetails from './PaymentMehodForms/CardDetails';
import UpiDetails from './PaymentMehodForms/UpiDetails';
import { useNavigate } from 'react-router';
import { addOrderProperty, addToOrders } from '../../redux/features/food/ordersSlice'
import { nanoid } from '@reduxjs/toolkit';
import useBillCalc from '../../Hooks/useBillCalc';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';


function Payment() {
    const dispatch = useDispatch()
    const bill = useBillCalc()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState("");
    const [currPaymentData, setCurrPaymentData] = useState(null)

    const changePaymentMethod = (value) => {
        setPaymentMethod(value)
    }

    const setOrderProperty = (key, value) => {
        dispatch(addOrderProperty({ key: key, value: value }));
    };

    const placeOrderHandler = () => {
        if (paymentMethod && currPaymentData) {
            function getCurrentDateTime() {
                const now = new Date();
                // Get the current date in the desired format
                const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
                const currentDate = now.toLocaleDateString('en-US', dateOptions);
                // Get the current time in the desired format
                const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
                const currentTime = now.toLocaleTimeString('en-US', timeOptions);
                return { currentDate, currentTime };
            }
            const orderId = nanoid()
            setOrderProperty("orderId", orderId)
            setOrderProperty("status", "pending")
            setOrderProperty("paymentMethod", paymentMethod)
            setOrderProperty("date", getCurrentDateTime().currentDate)
            setOrderProperty("time", getCurrentDateTime().currentTime)
            setOrderProperty("bill", {...bill})
            dispatch(addToOrders())
            navigate(`/paymentsuccess/${orderId}`)
        } else {
            toast.error('Please Select Any Payment Method', {
                style: {
                    borderRadius: '30px'
                }
            })
        }
    }

    const backToCartHandler = () => {
        navigate("/cart")
    }

    useEffect(() => {
        if (paymentMethod !== 'cod') {
            setCurrPaymentData(null)
        }
    }, [paymentMethod])



    return (
        <div className='bg-gray-100'>

            {/*======== Bar To show steps of Ordering Process =========*/}
            <section className='hidden md:block pt-10 max-w-[91%] mx-auto '>
                <div className='w-[80%] lg:w-[60%] mx-auto '><ProgressBar progressPercentage={70} /></div>
            </section>

            {/* ========= Payment Methods ======= */}
            <section className='max-w-[91%] mx-auto gap-6 py-10 flex flex-col lg:flex-row font-poppins'>
                <section className='  lg:w-[70%] flex flex-col  bg-white px-6 rounded-lg'>
                    <section className='border-b-[1px] border-gray-200 py-8'>
                        <div className='flex gap-2 items-center '>
                            <input type="radio" className='h-4 w-4' name="paymentMethod" id="debitCard" value="debitCard" onChange={(e) => changePaymentMethod(e.target.value)} />
                            <label htmlFor="debitCard">Pay with debit card</label>
                        </div>
                        <div className={`${paymentMethod === "debitCard" ? "block" : "hidden"} pt-4`}>
                            <CardDetails paymentMethod={paymentMethod} setCurrPaymentData={setCurrPaymentData} />
                        </div>
                    </section>
                    <section className='border-b-[1px] border-gray-200 py-8'>
                        <div className='flex gap-2 items-center '>
                            <input type="radio" className='h-4 w-4' name="paymentMethod" id="creditCard" value="creditCard" onChange={(e) => changePaymentMethod(e.target.value)} />
                            <label htmlFor="creditCard">Pay with credit card</label>
                        </div>
                        <div className={`${paymentMethod === "creditCard" ? "block" : "hidden"} space-y-5 pt-4`}>
                            <CardDetails paymentMethod={paymentMethod} setCurrPaymentData={setCurrPaymentData} />
                        </div>
                    </section>
                    <section className='border-b-[1px] border-gray-200 py-8'>
                        <div className='flex gap-2 items-center '>
                            <input type="radio" className='h-4 w-4' name="paymentMethod" id="paytm" value="paytm" onChange={(e) => changePaymentMethod(e.target.value)} />
                            <label htmlFor="paytm">Pay with Paytm</label>
                        </div>
                        <div className={`${paymentMethod === "paytm" ? "block" : "hidden"}  pt-4`}>
                            <UpiDetails paymentMethod={paymentMethod} setCurrPaymentData={setCurrPaymentData} />
                        </div>
                    </section>
                    <section className='border-b-[1px] border-gray-200 py-8'>
                        <div className='flex gap-2 items-center'>
                            <input type="radio" className='h-4 w-4' name="paymentMethod" id="upi" value="upi" onChange={(e) => changePaymentMethod(e.target.value)} />
                            <label htmlFor="upi">Pay with UPI</label>
                        </div>
                        <div className={`${paymentMethod === "upi" ? "block" : "hidden"}  pt-4`}>
                            <UpiDetails paymentMethod={paymentMethod} setCurrPaymentData={setCurrPaymentData} />
                        </div>
                    </section>
                    <section className='py-8'>
                        <div className='flex gap-2 items-center '>
                            <input type="radio" className='h-4 w-4' name="paymentMethod" id="cod" value="cod" onChange={(e) => { changePaymentMethod(e.target.value); setCurrPaymentData({ mode: 'cod', val: 'cod' }) }} />
                            <label htmlFor="cod">Cash On Delivery</label>
                        </div>
                    </section>
                </section>

                <section className='max-h-[64vh] shadow-lg bg-white lg:w-[40%] lg:block px-6 rounded-lg overflow-hidden'>
                    <Bill btn1="Back to Cart" func1={backToCartHandler} btn2="Place Order" func2={placeOrderHandler} />
                </section>
            </section>
        </div>
    )
}

export default Payment