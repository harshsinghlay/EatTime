import React, { useState } from 'react'
import {
  HiBars3,
  IoIosArrowBack,
  IoIosArrowForward,
  MdDeleteForever,
  FaLocationDot
} from '../../assets/icons/icons'
import { useOutletContext } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromAddresses } from '../../redux/features/food/addressesSlice'

function AddressCard({ add, index }) {
  const dispatch = useDispatch()

  const removeAddress = () => {
    dispatch(removeFromAddresses(id))
  }

  return (
    <div className='relative text-gray-700 grid grid-cols-2  md:grid-cols-5 gap-2 md:gap-4 font-poppins py-3 bg-white sm:place'>
      <span className='line-clamp-1 overflow-hidden'>{add.deliveryAddType}</span>
      <span className='line-clamp-1 overflow-hidden md:text-center'>{`${add.deliveryNo}, ${add.deliveryArea}, ${add.deliveryCity}`}</span>
      <span className='line-clamp-1 overflow-hidden md:text-center'  >{add.deliveryPhone}</span>
      <span className='line-clamp-1 overflow-hidden md:text-center' >{add.deliveryPincode}</span>
      <span className='absolute transform -translate-y-1/2 top-1/2 md:right-2 -right-2 overflow-hidden text-xl' onClick={removeAddress}><MdDeleteForever /></span>
    </div>
  )
}

function Addresses() {
  const toggleDashboardOptions = useOutletContext()
  const addresses = useSelector(state => state.addresses.addresses)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const itemOnCurrPage = addresses?.slice(firstItemIndex, lastItemIndex)
  const totalPages = Math.ceil(addresses?.length / itemPerPage)

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }


  return (

    <div className='flex flex-col gap-5 py-10'>

      {/*======== Title and Button To Toggle Dashboard Options ========*/}
      <section className=' flex justify-between items-center  px-4 sm:px-6 font-poppins text-gray-800'>
        <div className='flex items-center gap-2'>
          <span><FaLocationDot className='text-2xl' /></span>
          <span className='text-2xl font-semibold'>My Addresses</span>
        </div>
        <div className='block lg:hidden'>
          <button className=' px-3 sm:px-5 md:text-base py-2  rounded-full  sm:font-light  ' onClick={toggleDashboardOptions && toggleDashboardOptions}>
            <span><HiBars3 className='text-2xl sm:4xl ' /></span>
          </button>
        </div>
      </section>

      {/*======== Addresses Cards ========*/}
      <section >
        {addresses?.length > 0 ?
          (<main >
            <div className='min-h-[30vh] flex flex-col gap-4 '>
              {itemOnCurrPage.map((add, index) => (
                <div key={index} className='shadow-md rounded-lg overflow-hidden px-6 bg-white'>
                  < AddressCard add={add} index={firstItemIndex + index} />
                </div>
              ))}
            </div>
          </main>)
          :
          <div className='text-xl  text-gray-500 tracking-wider min-h-[30vh] flex justify-center items-center'>No Saved Addresses</div>
        }

      </section>

      {/*======== Pagination Buttons ========*/}
      <section className={`flex flex-col gap-3 lg:flex-row justify-between items-center  px-6 font-poppins text-gray-800 text-sm text-normal sm:text-base`}>
        <div>{`Showing ${currentPage}-${totalPages} of ${addresses?.length} Addresses`}</div>
        <div className='flex items-center gap-4'>
          <buttons className="px-3 py-3 bg-white rounded-full active:bg-gray-200" onClick={prevPage}><IoIosArrowBack /></buttons>
          <buttons className="px-3 py-3 bg-white rounded-full active:bg-gray-200" onClick={nextPage}><IoIosArrowForward /></buttons>
        </div>
      </section>

    </div>

  )
}

export default Addresses