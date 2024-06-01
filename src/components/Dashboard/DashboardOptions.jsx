import React from 'react'
import {
  HiOutlineShoppingBag,
  FaLocationDot,
  PiHeartStraight,
  TiUser,
  TfiCreditCard,
} from '../../assets/icons/icons'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


function DashboardOptions() {
  const orders = useSelector(state => state.orders.orders)
  const wishlist = useSelector(state => state.foods.wishlist)
  const addresses = useSelector(state => state.addresses.addresses)
  const paymentMethods = useSelector(state => state.paymentMethods.paymentMethods)
  const dashboardLinks = [
    {
      url: '/dashboard/orders',
      linkname: 'Orders',
      value: orders?.length,
      icon: <HiOutlineShoppingBag />
    },
    {
      url: '/dashboard/wishlist',
      linkname: 'Wishlist',
      value: wishlist?.length,
      icon: <PiHeartStraight />
    },
  ]
  const accountLinks = [
    {
      url: '/dashboard/profile',
      linkname: 'Profile Info',
      value: null,
      icon: <TiUser />
    },
    {
      url: '/dashboard/addresses',
      linkname: 'Addresses',
      value: addresses?.length,
      icon: <FaLocationDot />
    },
    {
      url: '/dashboard/paymentmethods',
      linkname: 'Payment Methods',
      value: paymentMethods?.length,
      icon: <TfiCreditCard />
    },
  ]


  return (
    <div className='flex flex-col gap-6 font-poppins bg-white py-11 px-6 lg:py-6  w-full h-full  lg:max-h-[60vh]'>

      {/*========= Dashboard =========*/}
      <section >
        <p className='text-xs text-gray-500'>DASHBOARD</p>
        <div className='flex flex-col gap-4 py-4'>
          {dashboardLinks.map((link, index) => (
            <NavLink to={link.url}
              key={index}
              className={({ isActive }) => `${isActive ? "text-red-500" : "text-gray-600"} flex justify-between gap-4 items-center text-sm sm:text-base lg:text-sm `}
            >
              <div className='flex gap-2 items-center '>
                <span className='text-lg'>{link.icon}</span>
                <span className='text-base lg:text-sm'>{link.linkname}</span>
              </div>
              <div className='text-base lg:text-sm'>{link.value}</div>
            </NavLink>
          ))}
        </div>
      </section>

      {/*========= Account Settings =========*/}
      <section >
        <p className='text-xs  text-gray-500'>ACCOUNT SETTINGS</p>
        <div className='flex flex-col gap-4 py-4'>
          {accountLinks.map((link, index) => (
            <NavLink to={link.url}
              key={index}
              className={({ isActive }) => `${isActive ? "text-red-500" : "text-gray-600"} flex justify-between gap-4 items-center text-sm sm:text-base lg:text-sm `}
            >
              <div className='flex gap-2 items-center '>
                <span className='text-lg'>{link.icon}</span>
                <span className='text-base lg:text-sm'>{link.linkname}</span>
              </div>
              <div className='text-base lg:text-sm'>{link.value}</div>
            </NavLink>
          ))}
        </div>
      </section>

    </div>
  )
}

export default DashboardOptions