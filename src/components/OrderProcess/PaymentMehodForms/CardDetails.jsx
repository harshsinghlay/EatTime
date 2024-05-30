import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addToPaymentMethods } from '../../../redux/features/food/paymentMethodsSlice'
import { useDispatch } from 'react-redux'
import { RiVisaLine, RxCross2 } from "../../../assets/icons/icons"
const Card = ({ name, value, exp, cvv, setCardData }) => {
    return (
        <div className='flex items-center gap-2 ' >
            <div className='pr-8 sm:pr-0 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:place-items-center font-poppins  py-2'>
                <span className='line-clamp-1 flex items-center gap-2 '>
                    <div className='h-6 w-10 rounded-sm overflow-hidden flex items-center justify-center border-[1px] border-black'>
                        <RiVisaLine />
                    </div>
                    <div className='text-black line-clamp-1 overflow-hidden'>{name || "N/A"}</div>
                </span>
                <span className='line-clamp-1 overflow-hidden'>{value || "N/A"}</span>
                <span className='line-clamp-1 overflow-hidden hidden sm:block'>{exp || "N/A"}</span>
                <span className='line-clamp-1 overflow-hidden hidden md:block lg:hidden xl:block'>{cvv || "N/A"}</span>
            </div>
            <span onClick={() => setCardData(null)} ><RxCross2 /></span>
        </div>
    )
}

function CardDetails({ paymentMethod, setCurrPaymentData }) {
    const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm()
    const [savePayment, setSavePayment] = useState(false)
    const [cardData, setCardData] = useState(null)
    const dispatch = useDispatch()

    const formHandler = (data) => {
            if (savePayment) {
                const paymentMethodData = {
                    id: data.value,
                    mode: paymentMethod,
                    value: data.value,
                    exp: data.exp,
                    name: data.name,
                }
                dispatch(addToPaymentMethods(paymentMethodData))
            }
            setCardData(data)
            reset();
    }

    useEffect(() => {
        reset()
    }, [paymentMethod])


    useEffect(() => {
        setCurrPaymentData(cardData)
    }, [cardData])


    return (
        <div >
            {/*=========== Card Details Form ===========*/}
            <div className={cardData ? "hidden" : "block"}>
                <form onSubmit={handleSubmit(formHandler)} className="space-y-5">
                    {/*============ Card Details ============*/}
                    <div className={`flex w-full flex-col sm:flex-row gap-6 font-sans`}>
                        <div className='sm:w-[50%] space-y-5'>
                            <div>
                                <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Name on Card' {...register("name", { required: 'Name is Required' })} />
                                {errors.name && <p className="text-red-600 text-xs pl-1">{errors.name?.message}</p>}
                            </div>
                            <div>
                                <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Card Number' {...register("value", {
                                    required: "Card Number is Required",
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Invalid Card Number format"
                                    },
                                    minLength: {
                                        value: 16, message: "Invalid Card Number 16 digit required"
                                    },
                                    maxLength: {
                                        value: 16, message: "Card Number cannot exceed 16 digit"
                                    }
                                })} />
                                {errors.value && <p className="text-red-600 text-xs pl-1">{errors.value?.message}</p>}
                            </div>
                        </div>
                        <div className='sm:w-[50%] space-y-5'>
                            <div>
                                <input
                                    type="text"
                                    className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm'
                                    placeholder='Exp MM/YY'
                                    {...register("exp", {
                                        required: 'Exp is required',
                                        pattern: {
                                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                                            message: 'Invalid format, please use MM/YY'
                                        }
                                    })}
                                />
                                {errors.exp && <p className="text-red-600 text-xs pl-1">{errors.exp.message}</p>}
                            </div>
                            <div>
                                <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='CVV' {...register("cvv", {
                                    required: "CVV is Required",
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Invalid CVV contains alphabet"
                                    },
                                    minLength: {
                                        value: 3, message: "Invalid CVV 3 digits Required"
                                    },
                                    maxLength: {
                                        value: 3, message: "Invalid CVV cannot exceed 3 digits "
                                    }
                                })} />
                                {errors.cvv && <p className="text-red-600 text-xs pl-1">{errors.cvv?.message}</p>}
                            </div>
                        </div>
                    </div>
                    {/*============ Save For Future Checkbox ============*/}
                    <div className='flex items-center'>
                        <input type="checkbox" id='savepayment' value={savePayment} onChange={() => setSavePayment(!savePayment)} />
                        <label htmlFor="savepayment" className='select-none text-sm pl-2 text-gray-600'>save for future payments</label>
                    </div>
                    {/*=============== Submit Button ===============*/}
                    <div>
                        <button type='submit' className='px-4 py-1 border-[1px] border-red-500 text-red-500 font-poppins rounded-sm lg:hover:bg-red-500 lg:hover:text-white '>Submit</button>
                    </div>
                </form>
            </div >

            {/*============== Saved Card ==============*/}
            <div className={cardData ? "block" : "hidden"}>
                <div className=' flex gap-3 sm:pl-4'>
                    <input type="radio" name="" id="" defaultChecked />
                    <Card {...cardData} setCardData={setCardData} />
                </div>
            </div>
        </div >
    )
}

export default CardDetails