import React, { useState } from 'react'
import {
  HiBars3,
  IoIosArrowBack,
  IoIosArrowForward,
  MdDeleteForever,
  TfiCreditCard,
} from "../../assets/icons/icons";
import { useOutletContext } from 'react-router-dom'
import { RiVisaLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaymentMethods } from '../../redux/features/food/paymentMethodsSlice'

const PaymentMethodsCard = ({ id, mode, value, exp }) => {
  const dispatch = useDispatch()
  const removePaymentMethod = () => {
    dispatch(removeFromPaymentMethods(id))
  }

  return (
    <div className='relative grid grid-cols-2 sm:grid-cols-5 gap-2  font-poppins py-3 bg-white overflow-hidden px-6 '>
      <div className='line-clamp-1 flex items-center gap-2'>
        <div className='h-6 w-10 rounded-sm overflow-hidden flex items-center justify-center border-[1px] border-black'>
          {mode === 'upi' ? <FaAmazonPay /> : <RiVisaLine />}
        </div>
        <div className='text-black line-clamp-1 overflow-hidden place-self-start '>{mode?.toUpperCase() || "N/A"}</div>
      </div>
      <div className='line-clamp-1  sm:text-center'>{value || "N/A"}</div>
      <div className='line-clamp-1   sm:text-center'>{exp || "N/A"}</div>
      <div className='line-clamp-1 sm:text-center'>***</div>
      <span className='absolute transform -translate-y-1/2 top-1/2  overflow-hidden right-6 text-xl pt-2' onClick={removePaymentMethod}><MdDeleteForever /></span>
    </div>
  )
}


function Orders() {
  const toggleDashboardOptions = useOutletContext()
  const paymentMethods = useSelector(state => state.paymentMethods.paymentMethods)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const itemOnCurrPage = paymentMethods?.slice(firstItemIndex, lastItemIndex)
  const totalPages = Math.ceil(paymentMethods?.length / itemPerPage)

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
          <span><TfiCreditCard className='text-2xl' /></span>
          <span className='text-2xl font-semibold'>Payment Methods</span>
        </div>
        <div className='block lg:hidden'>
          <button className=' px-3 sm:px-5 md:text-base py-2  rounded-full  sm:font-light  ' onClick={toggleDashboardOptions && toggleDashboardOptions}>
            <span><HiBars3 className='text-3xl sm:4xl active:text-orange-400' /></span>
          </button>
        </div>
      </section>

      {/*======== PaymentMethods Data ========*/}
      <section>
        {paymentMethods?.length > 0 ?
          (<main className='overflow-hidden'>
            <div className='min-h-[30vh] flex flex-col gap-4 '>
              {itemOnCurrPage?.map((item, index) => (
                <div key={index} className='shadow-md rounded-lg overflow-hidden'>
                  < PaymentMethodsCard {...item} />
                </div>
              ))}
            </div>
          </main>) :
          <div className='text-xl  text-gray-500 tracking-wider min-h-[35vh] lg:min-h-[30vh] flex justify-center items-center'>No Saved Payment Methods</div>}
      </section>


      {/*======== Pagination Buttons ========*/}
      <section className={`flex flex-col gap-4 sm:gap-3 lg:flex-row justify-between items-center  px-6 font-poppins text-gray-800 text-sm text-normal sm:text-base`}>
        <div>{`Showing ${currentPage}-${totalPages} of ${paymentMethods?.length} PaymentMethods`}</div>
        <div className='flex items-center gap-4'>
          <buttons className="p-4 bg-white rounded-full active:bg-gray-200" onClick={prevPage}><IoIosArrowBack /></buttons>
          <buttons className="p-4 bg-white rounded-full active:bg-gray-200" onClick={nextPage}><IoIosArrowForward /></buttons>
        </div>
      </section>
    </div>

  )
}

export default Orders