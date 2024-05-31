import React, { useEffect, useRef, useState } from 'react'
import { Bill } from '../index'
import ProgressBar from './ProgressBar'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderProperty } from '../../redux/features/food/ordersSlice'
import { addToAddresses, setCurrAddress } from '../../redux/features/food/addressesSlice'
import { useNavigate } from 'react-router'


function Checkout() {
    const [saveAddress, setSaveAddress] = useState(false)
    const { register, watch, handleSubmit, setValue, formState: { errors, isSubmitSuccessful }, clearErrors } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formRef = useRef()
    const address = useSelector(state => state.addresses.currAddress)

    const setOrderProperty = (key, value) => {
        dispatch(addOrderProperty({ key: key, value: value }));
    };

    const sameAsdeliveryAddress = (copy) => {
        // This set billing Address same as delivery address
        const addressFields = [
            "Name",
            "Phone",
            "Pincode",
            "AddType",
            "Email",
            "No",
            "Area",
            "City"
        ];

        if (copy) {
            addressFields.forEach(field => {
                setValue(`billing${field}`, watch(`delivery${field}`));
            });
            clearErrors(addressFields.map(field => `billing${field}`));
        } else {
            addressFields.forEach(field => {
                setValue(`billing${field}`, "");
            });
        }
    };

    const extractFormData = (formData, key) => {
        const newData = {}
        const addressFields = [
            "Name",
            "Phone",
            "Pincode",
            "AddType",
            "Email",
            "No",
            "Area",
            "City"
        ];

        addressFields.forEach(field => {
            newData[`${key}${field}`] = formData[`${key}${field}`];
        });

        return newData;
    }

    const formHandler = (formData) => {
        const deliveryData = extractFormData(formData, "delivery")
        const billingData = extractFormData(formData, "billing")

        setOrderProperty("deliveryAddress", deliveryData)
        setOrderProperty("billingAddress", billingData)


        if (saveAddress) {
            dispatch(addToAddresses(
                {
                    id: deliveryData.deliveryNo,
                    ...deliveryData
                }))
        }
    }

    const proceedToPaymentHandler = () => {
        formRef.current?.requestSubmit();
    }

    const backToCartHandler = () => {
        navigate("/cart")
    }

    useEffect(() => {
        // Set form fields with address properties from the store
        if (address) {
            Object.keys(address).forEach((key) => {
                setValue(key, address[key]);
            });
        }
        // Clean up by setting the current form data to the store on unmount
        return () => {
            dispatch(setCurrAddress(watch()));
        };
    }, []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            formRef.current?.reset();
            navigate("/payment")
        }
    }, [isSubmitSuccessful])

    return (
        <div className='bg-gray-100'>
            {/*======== Bar To show steps of Ordering Process =========*/}
            <section className='hidden md:block pt-10 max-w-[91%] mx-auto '>
                <div className='w-[80%] lg:w-[60%] mx-auto '><ProgressBar progressPercentage={35} /></div>
            </section>

            {/*========= Delivery and Billing Address Form and Total Bill =========*/}
            <section className='max-w-[91%] mx-auto gap-6 pt-10 flex flex-col lg:flex-row font-poppins py-10'>

                <form ref={formRef} onSubmit={handleSubmit(formHandler)} className='lg:w-[70%] flex flex-col gap-8'>
                    {/*============== Delivery Address ==============*/}
                    <section className='bg-white py-6 px-6 rounded-lg'>
                        <div>
                            <p className='font-semibold pb-6 '>Delivery Address</p>
                        </div>
                        <div>
                            <div className='w-full flex flex-col sm:flex-row gap-12 font-sans'>
                                <div className='sm:w-[50%] space-y-4 '>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Full Name' {...register("deliveryName", { required: 'Name is Required' })} />
                                        {errors.deliveryName && <p className="text-red-600 text-xs pl-1">{errors.deliveryName?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Mobile Number' {...register("deliveryPhone", { required: 'Mobile Number is Required' })} />
                                        {errors.deliveryPhone && <p className="text-red-600 text-xs pl-1">{errors.deliveryPhone?.message}</p>}
                                    </div>
                                    <div>
                                        <select className='outline-none font-light placeholder:text-gray-600   py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm appearance-none' {...register("deliveryAddType", { required: 'Address Type is Required' })}>
                                            <option value="home" hidden selected >Address Type</option>
                                            <option value="Home">Home</option>
                                            <option value="Office">Office</option>
                                        </select>
                                        {errors.deliveryAddType && <p className="text-red-600 text-xs pl-1">{errors.deliveryAddType?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Home / Apartment / Flat No.' {...register("deliveryNo", { required: 'No. is Required' })} />
                                        {errors.deliveryNo && <p className="text-red-600 text-xs pl-1">{errors.deliveryNo?.message}</p>}
                                    </div>
                                </div>
                                <div className='sm:w-[50%] space-y-4 '>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Email Address'
                                            {
                                            ...register('deliveryEmail', {
                                                required: "Email is Required",
                                                pattern: {
                                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                    message: "Email address must be a valid address"
                                                }
                                            })
                                            } />
                                        {errors.deliveryEmail && <p className="text-red-600 text-xs pl-1">{errors.deliveryEmail?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Zip Code' {...register("deliveryPincode", { required: 'Pincode is Required' })} />
                                        {errors.deliveryPincode && <p className="text-red-600 text-xs pl-1">{errors.deliveryPincode?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='City' {...register("deliveryCity", { required: 'City is Required' })} />
                                        {errors.deliveryCity && <p className="text-red-600 text-xs pl-1">{errors.deliveryCity?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Area' {...register("deliveryArea", { required: 'Area is Required' })} />
                                        {errors.deliveryArea && <p className="text-red-600 text-xs pl-1">{errors.deliveryArea?.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center pt-4'>
                                <input type="checkbox" id='save' value={saveAddress} onChange={() => setSaveAddress(!saveAddress)} />
                                <label htmlFor="save" className='select-none  pl-2 text-gray-600'>save for future </label>
                            </div>
                        </div>
                    </section>

                    {/*============== Billing Address ==============*/}
                    <section className='bg-white py-6 px-6 rounded-lg'>
                        <div>
                            <p className='font-semibold pb-5 '>Billing Address</p>
                        </div>
                        <div className='flex gap-3 items-center pb-6'>
                            <input type="checkbox" id="sameadd" onChange={(e) => sameAsdeliveryAddress(e.target.checked)} className='' name="" />
                            <label htmlFor="sameadd" className='select-none text-gray-600'>Same as shipping address</label>
                        </div>
                        <div>
                            <div className='w-full flex flex-col sm:flex-row gap-12 font-sans'>
                                <div className='sm:w-[50%] space-y-4 '>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Full Name' {...register("billingName", { required: 'Name is Required' })} />
                                        {errors.billingName && <p className="text-red-600 text-xs pl-1">{errors.billingName?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Mobile Number' {...register("billingPhone", { required: 'Mobile Number is Required' })} />
                                        {errors.billingPhone && <p className="text-red-600 text-xs pl-1">{errors.billingPhone?.message}</p>}
                                    </div>
                                    <div>
                                        <select className='outline-none font-light placeholder:text-gray-600   py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm appearance-none' {...register("billingAddType", { required: 'Address Type is Required' })}>
                                            <option value="home" hidden selected >Address Type</option>
                                            <option value="Home">Home</option>
                                            <option value="Office">Office</option>
                                        </select>
                                        {errors.billingAddType && <p className="text-red-600 text-xs pl-1">{errors.billingAddType?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Home / Apartment / Flat No.' {...register("billingNo", { required: 'No. is Required' })} />
                                        {errors.billingNo && <p className="text-red-600 text-xs pl-1">{errors.billingNo?.message}</p>}
                                    </div>
                                </div>
                                <div className='sm:w-[50%] space-y-4 '>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Email Address'
                                            {
                                            ...register('billingEmail', {
                                                required: "Email is Required",
                                                pattern: {
                                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                    message: "Email address must be a valid address"
                                                }
                                            })
                                            }
                                        />
                                        {errors.billingEmail && <p className="text-red-600 text-xs pl-1">{errors.billingEmail?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Zip Code' {...register("billingPincode", { required: 'Pincode is Required' })} />
                                        {errors.billingPincode && <p className="text-red-600 text-xs pl-1">{errors.billingPincode?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='City' {...register("billingCity", { required: 'City is Required' })} />
                                        {errors.billingCity && <p className="text-red-600 text-xs pl-1">{errors.billingCity?.message}</p>}
                                    </div>
                                    <div>
                                        <input type="text" className='font-light placeholder:text-gray-600 py-1 px-3 border-[1px] border-gray-400 w-full rounded-sm ' placeholder='Area' {...register("billingArea", { required: 'Area is Required' })} />
                                        {errors.billingArea && <p className="text-red-600 text-xs pl-1">{errors.billingArea?.message}</p>}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </form>

                <div className='max-h-[64vh] shadow-lg bg-white lg:w-[40%] lg:block px-6 rounded-lg overflow-hidden'>
                    <Bill btn1="Back to Cart" func1={backToCartHandler} btn2="Proceed to Payment" func2={proceedToPaymentHandler} />
                </div>

            </section>
        </div>
    )
}

export default Checkout