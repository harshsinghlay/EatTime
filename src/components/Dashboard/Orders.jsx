import React, { useState } from 'react'
import {
  HiBars3,
  MdShoppingBag,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowRoundForward,
} from "../../assets/icons/icons";
import { Link, useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux';

function OrderCard({ orderId, status, price, date }) {
  return (
    <Link to={`/ordersummary/${orderId}`}>
      <div className='grid grid-cols-2 sm:grid-cols-5 gap-2   font-poppins  py-3 bg-white overflow-hidden '>
        <span className='flex items-center line-clamp-1 overflow-hidden text-nowrap'>#{orderId}</span>
        <span className='px-3 py-1 bg-purple-200 text-xs text-gray-700 rounded-full  place-items place-self-center'>{status}</span>
        <span className='sm:place-self-center line-clamp-1  text-sm text-gray-700 '>{date}</span>
        <span className='px-3 py-[2px] place-self-center text-sm text-gray-700'>${Number(price)?.toFixed(2)}</span>
        <span className='place-self-center text-3xl text-gray-400 hidden sm:block'><IoIosArrowRoundForward /></span>
      </div>
    </Link>
  )
}

function Orders() {
  const toggleDashboardOptions = useOutletContext()
  const orders = useSelector(state => state.orders.orders)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const itemOnCurrPage = orders?.slice(firstItemIndex, lastItemIndex)
  const totalPages = Math.ceil(orders?.length / itemPerPage)

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

      {/*============ Title and Button to Toggle Dashboard Options ==========*/}
      <section className=' flex justify-between items-center  px-4 sm:px-6 font-poppins text-gray-800'>
        <div className='flex items-center gap-2'>
          <span><MdShoppingBag className='text-2xl' /></span>
          <span className='text-2xl font-semibold'>My Orders</span>
        </div>
        <div className='block lg:hidden'>
          <button className=' px-3 sm:px-5 md:text-base py-2  rounded-full  sm:font-light  ' onClick={toggleDashboardOptions && toggleDashboardOptions}>
            <span><HiBars3 className='text-3xl sm:4xl active:text-orange-400' /></span>
          </button>
        </div>
      </section>

      {/*================== Orders Cards ==================*/}
      <section>
        {orders?.length > 0 ?
          (<main className='overflow-hidden'>
            <div className='min-h-[30vh]  flex flex-col gap-4 '>
              {itemOnCurrPage?.map((item) => (
                <div key={item.orderId} className='shadow-md rounded-lg overflow-hidden px-6 bg-white '>
                  < OrderCard {...item} />
                </div>
              ))}
            </div>
          </main>)
          :
          <div className='text-xl  text-gray-500 tracking-wider min-h-[35vh] lg:min-h-[30vh] flex justify-center items-center'>No Orders Yet</div>
        }
      </section>

      {/*================== Pagination Buttons ==================*/}
      <section className={`flex flex-col gap-4 sm:gap-3 lg:flex-row justify-between items-center  px-6 font-poppins text-gray-800 text-sm text-normal sm:text-base`}>
        <div>{`Showing ${currentPage}-${totalPages} of ${orders?.length} Orders`}</div>
        <div className='flex items-center gap-4'>
          <button className="p-4 bg-white rounded-full active:bg-gray-200" onClick={prevPage}><IoIosArrowBack /></button>
          <button className="p-4 bg-white rounded-full active:bg-gray-200" onClick={nextPage}><IoIosArrowForward /></button>
        </div>
      </section>
    </div>

  )
}

export default Orders