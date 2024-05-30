import React, { useState } from 'react'
import {
  HiBars3,
  IoIosArrowBack,
  IoIosArrowForward,
  PiHeartStraightFill
} from "../../assets/icons/icons";
import { Link, useOutletContext } from 'react-router-dom'
import { FoodCard1 } from '../index'
import { useSelector } from 'react-redux';


function Wishlist() {
  const toggleDashboardOptions = useOutletContext()
  const wishlist = useSelector(state => state.foods.wishlist)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(6);
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const itemOnCurrPage = wishlist?.slice(firstItemIndex, lastItemIndex)
  const totalPages = Math.ceil(wishlist?.length / itemPerPage)

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
          <span><PiHeartStraightFill  className='text-2xl' /></span>
          <span className='text-2xl font-semibold'>My Wishlist</span>
        </div>
        <div className='block lg:hidden'>
          <button className=' px-3 sm:px-5 md:text-base py-2  rounded-full  sm:font-light  ' onClick={toggleDashboardOptions && toggleDashboardOptions}>
            <span><HiBars3 className='text-2xl sm:4xl ' /></span>
          </button>
        </div>
      </section>

      {/*======== Wishlist Cards ========*/}
      <section>
        {wishlist?.length > 0 ?
          (<main className='min-h-[30vh]  grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 gap-2 '>
            {
              itemOnCurrPage.map((food) => (
                <Link key={food.id} className='rounded-lg max-h-[69vw] sm:max-h-[45vw] lg:max-h-[30vw] xl:max-h-[25vw]'>
                  <FoodCard1 food={food} />
                </Link>
              ))
            }
          </main>) :
          <div className='text-xl  text-gray-500 tracking-wider min-h-[30vh] flex justify-center items-center'>No Items Yet</div>
        }
      </section>

      {/*======== Pagination Buttons ========*/}
      <section className={`flex flex-col gap-3 lg:flex-row justify-between items-center  px-6 font-poppins text-gray-800 text-sm text-normal sm:text-base`}>
        <div>{`Showing ${currentPage}-${totalPages} of ${wishlist?.length} Items`}</div>
        <div className='flex items-center gap-4'>
          <buttons className="px-3 py-3 bg-white rounded-full active:bg-gray-200" onClick={prevPage}><IoIosArrowBack /></buttons>
          <buttons className="px-3 py-3 bg-white rounded-full active:bg-gray-200" onClick={nextPage}><IoIosArrowForward /></buttons>
        </div>
      </section>

    </div>

  )
}

export default Wishlist