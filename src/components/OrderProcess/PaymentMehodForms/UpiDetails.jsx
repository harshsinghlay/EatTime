import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addToPaymentMethods } from '../../../redux/features/food/paymentMethodsSlice'
import { useDispatch } from 'react-redux'
import { FaAmazonPay, RxCross2 } from "../../../assets/icons/icons"

const Card = ({ value, setUpiData }) => {
    return (
        <div className='flex items-center gap-2 ' >
            <div className='flex gap-2'>
                <div className='h-6 w-10 rounded-sm overflow-hidden flex items-center justify-center border-[1px] border-black'>
                    <FaAmazonPay />
                </div>
                <div>
                    {value}
                </div>
            </div>
            <span onClick={() => setUpiData(null)} ><RxCross2 /></span>
        </div>
    )
}


function UpiDetails({ paymentMethod, setCurrPaymentData }) {
    const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm()
    const [upiData, setUpiData] = useState(null)
    const [savePayment, setSavePayment] = useState(false)
    const dispatch = useDispatch()

    const formHandler = (data) => {
        if (savePayment) {
            const paymentMethodData = {
                id: data.value,
                mode: paymentMethod,
                value: data.value,
                exp: "N/A"
            }
            dispatch(addToPaymentMethods(paymentMethodData))
        }
        setUpiData(data)
        reset()
    }

    useEffect(() => {
        reset()
    }, [paymentMethod])

    useEffect(() => {
        setCurrPaymentData(upiData)
    }, [upiData])

    return (
        <div>
            {/*============ Upi Details Form ============*/}
            <div className={upiData ? "hidden" : "block"}>
                <form onSubmit={handleSubmit(formHandler)} className='space-y-5'>
                    <div className={`flex w-full sm:flex-row gap-4 font-sans`}>
                        <div>
                            <input
                                type="text"
                                className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm'
                                placeholder='UPI id'
                                {...register("value", {
                                    required: 'UPI ID is Required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
                                        message: 'Invalid UPI ID format'
                                    }
                                })}
                            />
                            {errors.value && <p className="text-red-600 text-xs pl-1">{errors.value?.message}</p>}
                        </div>
                        <div>
                            <button className='px-4 py-1 border-[1px] border-red-500 text-red-500 font-poppins rounded-sm lg:hover:bg-red-500 lg:hover:text-white '>Submit</button>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <input type="checkbox" id="savepayment" value={savePayment} onChange={() => setSavePayment(!savePayment)} />
                        <label htmlFor="savepayment" className='select-none text-sm pl-2 text-gray-600'>save for future payments</label>
                    </div>
                </form>
            </div>

            {/*=============== Saved UPI Details ===============*/}
            <div className={upiData ? "block" : "hidden"}>
                <div className=' flex gap-3 sm:pl-4'>
                    <input type="radio" name="" id="" defaultChecked />
                    <Card {...upiData} setUpiData={setUpiData} />
                </div>
            </div>
        </div>
    )
}

export default UpiDetails