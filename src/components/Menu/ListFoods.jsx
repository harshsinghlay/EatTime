import React, { useState } from 'react'
import { FoodCard1 } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowBack, IoIosArrowForward } from "../../assets/icons/icons";
import { HiBars3 } from 'react-icons/hi2';
import { setSortingOrder } from '../../redux/features/food/foodsSlice';

function ListFoods({ toggleFilter }) {
    const dispatch = useDispatch()
    const filteredFoods = useSelector(state => state.foods.filteredFoods)
    const [currentPage, setCurrentPage] = useState(1);
    const [foodsPerPage, setFoodsPerPage] = useState(6);
    const lastFoodIndex = currentPage * foodsPerPage;
    const firstFoodIndex = lastFoodIndex - foodsPerPage;
    const foodsOnCurrPage = filteredFoods.slice(firstFoodIndex, lastFoodIndex)
    const totalPages = Math.ceil(filteredFoods.length / foodsPerPage)

    const changeSortingOrder = (order) => {
        dispatch(setSortingOrder(order))
    }

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
        <div className='py-7 flex flex-col gap-6 lg:gap-5'>
            {/*=========== Sort By Buttons ===========*/}
            <div className='bg-gray-100 flex justify-end sm:justify-between items-center py-5 px-4 sm:px-6 font-poppins text-gray-800'>
                <div className='hidden sm:block'>Showing {foodsOnCurrPage.length} of {filteredFoods.length} items</div>
                <div className='hidden items-center gap-2 lg:flex'>
                    <div>Sort by</div>
                    <div className='bg-white rounded-full px-4 '>
                        <select className=' relative py-2 w-full h-full  text-gray-500 pr-24  rounded-full outline-none' defaultValue={"top rated"} onChange={(e) => changeSortingOrder(e.target.value)} name="" id="">
                            <option className=' w-full' value={"top rated"}>Top Rated</option>
                            <option className=' w-full' value={"low to high"}>Low to High</option>
                            <option className=' w-full' value={"high to low"}>High to Low</option>
                        </select>
                    </div>
                </div>
                <div className='block lg:hidden'>
                    <button className='flex items-center text-xs px-3 sm:px-5 md:text-base py-2 gap-1 sm:gap-4 rounded-full bg-orange-400 sm:font-light text-white  ' onClick={toggleFilter}>
                        <span><HiBars3 className='text-xl sm:4xl ' /></span>
                        <span className='tracking-wider'>FILTER PRODUCTS</span>
                    </button>
                </div>
            </div>

            {/*=============== Foods Listing ===============*/}
            <div>
                <main className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 '>
                    {
                        foodsOnCurrPage?.map((food) => (
                            <div key={food.id} className='rounded-lg max-h-[69vw] sm:max-h-[45vw] lg:max-h-[30vw] xl:max-h-[25vw]'>
                                <FoodCard1 food={food} />
                            </div>
                        ))
                    }
                </main>
            </div>

            {/*=============== Pagination Buttons ===============*/}
            <div>
                <div className=' bg-gray-100 flex flex-col gap-3 lg:flex-row justify-between items-center py-5 px-6 font-poppins text-gray-800 text-sm text-normal sm:text-base'>
                    <div>Showing {currentPage}-{totalPages} of {filteredFoods.length} items</div>
                    <div className='flex items-center gap-2'>
                        <button onClick={prevPage} className="px-4 py-4 bg-white rounded-sm"><IoIosArrowBack /></button>
                        <button onClick={nextPage} className="px-4 py-4 bg-white rounded-sm"><IoIosArrowForward /></button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default React.memo(ListFoods)