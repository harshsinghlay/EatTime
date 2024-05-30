import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/images/images'
import { useForm } from 'react-hook-form'

function Contact() {
    const { register, reset, handleSubmit } = useForm()


    const formHandler = (data) => {
        reset();
        //  do nothing for now
    }

    return (
        <div className='py-10'>

            {/*=============== Title of the page ===============*/}
            <section className='text-center text-3xl lg:text-4xl font-poppins pb-2 sm:pb-6 xl:pb-8 '>
                <h1>Contact</h1>
            </section>

            {/*=============== Contact Information ===============*/}
            <section className='max-w-[91%] mx-auto font-poppins flex flex-col lg:flex-row pt-6 lg:pb-16'>
                <div className='relative h-[80vw] md:h-[80vw] lg:h-[40vw] lg:w-[50%] lg:border-2 border-gray-300'>
                    <div className='lg:absolute lg:bottom-5 lg:right-5 w-full h-full bg-black bg-cover bg-center rounded-sm' style={{ backgroundImage: `url(${img.contact})` }}>
                    </div>
                </div>

                <div className='lg:w-[50%] lg:px-10' >
                    <div className='flex flex-col gap-2 sm:gap-3 pt-4 sm:pt-10 lg:pt-2 pb-2 sm:pb-6'>
                        <p className='text-2xl font-semibold sm:text-4xl md:text-5xl tracking-wider'>GET IN TOUCH</p>
                        <p className='text-gray-600 sm:text-lg'>We'd Love to Hear From You, Lets Get IN Touch!</p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2'>
                        <div className='flex flex-col gap-2 py-2'>
                            <p className='font-semibold'>Address</p>
                            <p className='text-sm text-gray-500'>4005 Silver business point India</p>
                        </div>
                        <div className='flex flex-col gap-2 py-2'>
                            <p className='font-semibold'>Phone</p>
                            <p className='text-sm text-gray-500'>8130540994</p>
                        </div>
                        <div className='flex flex-col gap-2 py-2'>
                            <p className='font-semibold'>Email</p>
                            <p className='text-sm text-gray-500'>info@eattime.com</p>
                        </div>
                        <div className='flex flex-col gap-2 py-2'>
                            <p className='font-semibold'>Additional Information</p>
                            <p className='text-sm text-gray-500'>We are open : Monday - Saturday, 10AM - 9PM and closed on sunday sorry for that.</p>
                        </div>
                    </div>
                    <div className='py-1 flex flex-col gap-3 pb-6'>
                        <div className='font-semibold'><p>Social</p></div>
                        <div className='flex gap-2'>
                            <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.fb} alt="" /></Link>
                            <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.insta} alt="" /></Link>
                            <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.telegram} alt="" /></Link>
                            <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.snap} alt="" /></Link>
                            <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.twitter} alt="" /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/*=============== Store Location Map ===============*/}
            <section>
                <div className='h-[100vw] md:h-[30vw]  bg-black bg-cover rounded-sm' style={{ backgroundImage: `url(${img.map})` }} ></div>
            </section>

            {/*=============== Form For leaving us a message ===============*/}
            <section>
                <form onSubmit={handleSubmit(formHandler)} className='font-poppins max-w-[91%] mx-auto pb-14'>
                    <div className='pt-6 '>
                        <div className='flex flex-col gap-1 sm:gap-3 pt-4 pb-6 text-center'>
                            <p className='text-2xl font-semibold sm:text-4xl md:text-5xl tracking-wider'>LEAVE US A MESSAGE</p>
                            <p className='text-gray-600 sm:text-lg'>-Good For Nature, Good For You-</p>
                        </div>
                        <div className='pt-4'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <input {...register('name')} type="text" name="" id="" placeholder='Name' className=' border-[1px] border-gray-300 rounded-full py-3 px-4 placeholder:text-gray-500 text-sm w-full' />
                                <input {...register('email')} type="email" name="" id="" placeholder='Email *' className='border-[1px] border-gray-300 rounded-full py-3 px-4 placeholder:text-gray-500 text-sm w-full' />
                                <input {...register('phone')} type="text" name="" id="" placeholder='Phone number' className='border-[1px] border-gray-300 rounded-full py-3 px-4 placeholder:text-gray-500 text-sm w-full' />
                            </div>
                            <div className='mt-5 flex flex-col items-center justify-center gap-4'>
                                <textarea {...register('comment')} rows="10" type="text" name="" id="" className='border-[1px] border-gray-300  rounded-3xl py-3 px-4 placeholder:text-gray-500 text-sm w-full ' placeholder='Comment' />
                                <button type='submit' className='mt-2 px-6 py-2 rounded-full bg-orange-400'>SEND</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>

        </div>
    )
}

export default Contact