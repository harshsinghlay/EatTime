import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/images/images'
import FooterDropDown from './FooterDropDown'
import useLinks from '../../Hooks/useLinks'
import { useForm } from 'react-hook-form'

function Footer() {
  const { footerlinks } = useLinks()
  const { register, reset, handleSubmit } = useForm()

  const formHandler = () => {
    reset();
  }

  return (
    <footer className='bg-black'>
      <div className='w-full h-full max-w-[91%] mx-auto  font-[3vw] pt-12'>

        {/*=========== Top Section ===========*/}
        <section className='lg:flex flex-row-reverse gap-10 lg:pb-6 lg:pt-2'>
          <div className=' text-white font-poppins text-center flex flex-col items-center gap-5 lg:gap-4 pb-4 lg:max-w-[25%] '>
            <div>
              <h1 className='text-[1.3em] pb-2'>Stay Updated!</h1>
              <p className='text-[.9em] text-gray-400'>Get the latest updates on new menu items and special offers directly in your inbox.</p>
            </div>
            <div className='min-w-80 w-[80%] lg:min-w-0'>
              {/*=========== Email Form ===========*/}
              <form onSubmit={handleSubmit(formHandler)} className='overflow-auto  bg-white flex items-center justify-between py-0.5 px-1  rounded-full '>
                <input {...register('email')} className='grow px-3 py-1 rounded-full lg:rounded-none outline-none cursor pointer text-black placeholder:text-sm placeholder:text-gray-400 lg:max-w-[70%] ' type="email" placeholder='Your email' />
                <button type='submit' className='bg-orange-400 py-2 px-4 rounded-full active:text-black lg:hover:bg-orange-500 block'>GO</button>
              </form>
            </div>
            <div className='flex justify-center gap-2'>
              <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.fb} alt="" /></Link>
              <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.insta} alt="" /></Link>
              <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.telegram} alt="" /></Link>
              <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.snap} alt="" /></Link>
              <Link className='w-9 h-9 rounded-full '><img className='w-full h-full' src={img.twitter} alt="" /></Link>
            </div>
          </div>
          <div className='w-full'>
            {/*======== Footer links for larger Devices ========*/}
            <div className='hidden lg:flex justify-between'>
              {footerlinks?.map((item, index) => (
                item.isSublinks ?
                  <ul key={index}>
                    {/*========= MainLinks =========*/}
                    <li className="flex justify-between text-lg py-1 text-white" >
                      {item.head}
                    </li>
                    {/*========= Sublinks =========*/}
                    {item.sublinks.map((link, subIndex) => (
                      link.status ? (
                        <li key={subIndex} className='py-1 text-gray-500 '>
                          {link.url ?
                            <Link className='hover:text-gray-300 cursor-pointer' to={link.url}>
                              {link.name}
                            </Link>
                            : <p>{link.name}</p>
                          }
                        </li>
                      ) : null
                    ))}
                  </ul>
                  : null
              ))}
            </div>


            {/*======== Footer Links For Smaller Devices ========*/}
            <div className='lg:hidden pb-10'><FooterDropDown /></div>

          </div>
        </section >

        {/*=========== Bottom Section ===========*/}
        <section className='pt-4 lg:pt-5 pb-4 border-t-2 border-gray-800 lg:flex justify-between'>
          <p className='text-gray-400 text-center pb-3'>© {new Date().getFullYear()} EatTime. All rights reserved.</p>
          <div className='flex justify-center gap-2'>
            <div className='h-6 w-10 rounded-sm p-1 bg-white flex items-center justify-center'><img className='w-[90%] h-[90%]' src={img.applepay} alt="" /></div>
            <div className='h-6 w-10 rounded-sm p-1 bg-white flex items-center justify-center'><img className='w-[90%] h-[90%]' src={img.gpay} alt="" /></div>
            <div className='h-6 w-10 rounded-sm p-1 bg-white flex items-center justify-center'><img className='w-[90%] h-[90%]' src={img.visa} alt="" /></div>
            <div className='h-6 w-10 rounded-sm p-1 bg-white flex items-center justify-center'><img className='w-[90%] h-[90%]' src={img.americanexpress} alt="" /></div>
            <div className='h-6 w-10 rounded-sm p-1 bg-white flex items-center justify-center'><img className='w-[90%] h-[90%]' src={img.mastercard} alt="" /></div>
          </div>
        </section>

      </div>
    </footer>
  )
}

export default Footer