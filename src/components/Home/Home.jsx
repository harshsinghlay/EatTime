import React from 'react'
import {
    LiaRocketSolid,
    LiaRupeeSignSolid,
    Ri24HoursLine,
    PiBowlSteam
} from '../../assets/icons/icons'
import img from '../../assets/images/images'
import { Link } from 'react-router-dom'
import TestimonialSlider from './TestimonialSlider'
import TrendingFoodsSlider from "./TrendingFoodsSlider";
import MainCarousel from './MainCarousel'
import { FoodCard1 } from '../index'
import { useSelector } from "react-redux";

function Home() {
    const trendingFoods = useSelector(state => state.foods.trendingFoods)

    return (
        <div >
            <div className='w-full '>

                {/*============= Main Carousel =============*/}
                <section>
                    <MainCarousel />
                </section>

                {/*============= Offers Section  =============*/}
                <section >
                    <div className='max-w-[92%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-y-5 xl:gap-x-2 py-7 xl:py-12 xl:text-lg'>
                        <div className='flex gap-4 sm:flex-col sm:items-center md:flex-row md:justify-center  lg:flex-col xl:flex-row  font-poppins group  cursor-pointer'>
                            <div className='bg-gray-100 p-5 rounded-full text-gray-500 lg:group-hover:bg-orange-400 lg:group-hover:text-white duration-300'>
                                <LiaRocketSolid size={40} />
                            </div>
                            <div className='flex flex-col justify-center sm:items-center md:items-start lg:items-center xl:items-start gap-1 '>
                                <span className='font-weight-900'>Free Shipping</span>
                                <span className='text-gray-500 '>Free For All Type Order</span>
                            </div>
                        </div>
                        <div className='flex gap-4 sm:flex-col sm:items-center md:flex-row md:justify-center lg:flex-col xl:flex-row font-poppins group cursor-pointer'>
                            <div className='bg-gray-100 p-5 rounded-full text-gray-500 lg:group-hover:bg-orange-400 lg:group-hover:text-white duration-300'>
                                <LiaRupeeSignSolid size={40} />
                            </div>
                            <div className='flex flex-col justify-center sm:items-center md:items-start lg:items-center xl:items-start gap-1 '>
                                <span className='font-weight-900'>Money Back</span>
                                <span className='text-gray-500'>Best Prices Best Product</span>
                            </div>
                        </div>
                        <div className='flex gap-4 sm:flex-col sm:items-center md:flex-row md:justify-center lg:flex-col xl:flex-row font-poppins group cursor-pointer'>
                            <div className='bg-gray-100 p-5 rounded-full text-gray-500 lg:group-hover:bg-orange-400 lg:group-hover:text-white duration-300'>
                                <Ri24HoursLine size={40} />
                            </div>
                            <div className='flex flex-col justify-center sm:items-center md:items-start lg:items-center xl:items-start gap-1 '>
                                <span className='font-weight-900'>Customer Services</span>
                                <span className='text-gray-500'>Support System 24/7</span>
                            </div>
                        </div>
                        <div className='flex gap-4 sm:flex-col sm:items-center md:flex-row md:justify-center lg:flex-col xl:flex-row font-poppins group cursor-pointer'>
                            <div className='bg-gray-100 p-5 rounded-full text-gray-500 lg:group-hover:bg-orange-400 lg:group-hover:text-white duration-300'>
                                <PiBowlSteam size={40} />
                            </div>
                            <div className='flex flex-col justify-center sm:items-center md:items-start lg:items-center xl:items-start gap-1 '>
                                <span className='font-weight-900'>Hot Fast Food</span>
                                <span className='text-gray-500'>Freshly Cooked</span>
                            </div>
                        </div>
                    </div>
                </section>


                {/*============= Trending Foods =============*/}
                <section>
                    <div className="bg-gray-100 w-full py-10">

                        {/*============== Trending Foods Heading ==============*/}
                        <section className="max-w-[91%] mx-auto font-poppins">
                            <p className="text-orange-400 text-center text-xl md:text-2xl tracking-widest">Our Categories</p>
                            <h2 className="text-center text-3xl md:text-4xl  font-semibold pt-1 ">Trending Products</h2>
                        </section>

                        {/*============== Trending Foods Cards ==============*/}
                        <section>

                            <div className="hidden lg:grid relative  py-10 max-w-[91%] mx-auto  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden gap-2">
                                {trendingFoods.slice(0, 10).map((food, index) => (
                                    <div key={food.id} className="rounded-lg lg:max-h-[30vw] xl:max-h-[25vw] ">
                                        <FoodCard1 food={food} />
                                    </div>
                                ))}
                            </div>

                            <div className="lg:hidden py-5">
                                <TrendingFoodsSlider />
                            </div>

                        </section>

                        {/*============== All Foods Link ==============*/}
                        <section className="flex justify-center items-center">
                            <Link to='/menu' className="lg:hover:scale-95 active:text-black lg:hover:bg-orange-500 py-2 px-6 md:px-8 md:py-3 lg:text-lg lg:px-7 lg:py-2 font-semibold bg-orange-400 text-white rounded-full">
                                View All
                            </Link>
                        </section>
                    </div>
                </section>


                {/*============= Discount Offers with unequal sizes =============*/}
                <section >
                    <div className='bg-white py-20'>
                        <div className=' max-w-[91%] min-h-[470vw] sm:min-h-[170vw] md:min-h-[48vw] mx-auto grid grid-cols-12 grid-rows-6 sm:grid-rows-4 md:grid-rows-2 gap-7 text-white text-[5vw] sm:text-[2.7vw] md:text-[1.5vw]'>

                            <section className="relative  sm:row-start-3 col-span-12 sm:col-span-6 md:row-start-1 md:col-start-1 md:col-end-4 bg-cover mx-9 sm:m-0 flex justify-center items-end group" style={{ backgroundImage: `url(${img.img1})` }}>
                                <div class="absolute w-full bg-black  h-full opacity-30 flex justify-center items-end   lg:group-hover:opacity-0 duration-200">
                                </div>
                                <div className="absolute flex justify-center items-end h-full w-full ">
                                    <Link to='/menu/dessert' className="font-poppins text-white  pb-8 text-center lg:group-hover:text-orange-400">
                                        <p className='text-[1.3em] font-semibold'>DESSERTS <span className='block text-[1.4em] font-bold -mt-2'>AT 20% OFF!</span></p>
                                    </Link>
                                </div>
                            </section>

                            <section className="relative border-black row-start-3 row-end-5 col-span-12 sm:row-start-1 sm:row-end-3 md:col-start-4 md:col-end-10 bg-cover group" style={{ backgroundImage: `url(${img.img3})` }}>
                                <div class="absolute  w-full h-full bg-black opacity-30 lg:group-hover:opacity-0 duration-200"></div>
                                <div className="absolute flex h-full w-full">
                                    <div className="font-poppins text-white  pl-8 pt-8 ">
                                        <p className='text-[1.8em] sm:text-[2.8em] font-semibold pb-3'><span className='text-[.5em] block font-normal text-gray-300'>NEW COLLECTION</span><span className='block'>ORIGINAL</span> <span className='-mt-2  lg:-mt-5 block'>AMERICAN</span> <span className='-mt-2 lg:-mt-5  block'>BURGER</span> <span className='flex items-center text-[.7em] font-extralight'>from<LiaRupeeSignSolid/>149</span></p>
                                        <Link to='/menu/burger' className='px-[1em] py-[.2em] sm:px-[2.4em] sm:py-[.4em] bg-orange-400 rounded-sm text-[1em] lg:hover:scale-95 active:text-black lg:hover:bg-orange-500'>Order Now</Link>
                                    </div>
                                </div>
                            </section>

                            <section className='relative border-black sm:row-start-3 col-span-12 sm:col-span-6 md:row-start-1 md:col-start-10 md:col-end-13 bg-cover  mx-9 sm:m-0 group' style={{ backgroundImage: `url(${img.img4})` }}>
                                <div class="absolute  w-full h-full bg-black opacity-30  lg:group-hover:opacity-0 duration-200"></div>
                                <div className="absolute flex justify-center items-end h-full w-full ">
                                    <Link to='/menu/burger' className="font-poppins text-white  pb-8 text-center lg:group-hover:text-orange-400">
                                        <p className='text-[1.3em] font-semibold'>BURGERS <span className='block text-[1.4em] font-bold -mt-2'>AT 30% OFF!</span></p>
                                    </Link>
                                </div>
                            </section>

                            <section className='relative border-black sm:row-start-4 col-span-12 sm:col-span-6 md:row-start-2 md:col-start-10 md:col-end-13 bg-cover mx-9 sm:m-0 group' style={{ backgroundImage: `url(${img.img5})` }}>
                                <div class="absolute  w-full h-full bg-black opacity-30 lg:group-hover:opacity-0 duration-200"></div>
                                <div className="absolute flex items-end h-full w-full ">
                                    <Link to='/menu/pizza' className="font-poppins text-white pb-8 pl-7 lg:group-hover:text-orange-400">
                                        <p className='text-[1.7em]'>Italian <span className='block -mt-1'>Spicy</span> <span className='block -mt-1'>Pizza</span> <span className='flex items-center -mt-1 text-orange-400'><LiaRupeeSignSolid/>199</span></p>
                                    </Link>
                                </div>
                            </section>

                            <section className='relative border-black sm:row-start-4 col-span-12 sm:col-span-6  md:row-start-2 md:col-start-1 md:col-end-4 bg-cover mx-9 sm:m-0 group' style={{ backgroundImage: `url(${img.img2})` }}>
                                <div class="absolute  w-full h-full bg-black opacity-30 lg:group-hover:opacity-0 duration-200 "></div>
                                <div className="absolute flex items-end justify-end h-full w-full ">
                                    <Link to='/menu/pizza' className="font-poppins text-white pb-8 pr-7 lg:group-hover:text-orange-400">
                                        <p className='text-[1.9em] font-semibold text-end'>Get Your <span className='-mt-2 block'>Discount</span> <span className='block -mt-2'>-30% OFF</span></p>
                                    </Link>
                                </div>
                            </section>

                        </div>
                    </div>
                </section>


                {/*============= Banner of 15 Min Delivery =============*/}
                <section>
                    <div className='relative flex text-[5vw] sm:text-[4vw] md:text-[3.2vw] lg:text-[1.6em] xl:text-[1.vw] justify-center items-center bg-black bg-cover' style={{ backgroundImage: `url(${img.img6})` }}>
                        <div className='absolute h-full w-full bg-black opacity-40 '></div>
                        <div className='z-10 w-full h-full text-white font-poppins flex flex-col gap-[.4em] items-center sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%]  xl:max-w-[30%] text-center py-[1.5em]' >
                            <div className='bg-red-600 px-[1.4em] py-[.5em] text-[.8em] tracking-widest'>WE GUARANTY</div>
                            <p className='text-[1.3em]'>30 Minutes Delivery</p>
                            <p className='text-[.7em] text-gray-400'>Your food delivery order will never be late. We care for your special order. Get the fastest food delivery with us. </p>
                            <div className='flex gap-[.7em] text-gray-400' >
                                <div className='flex flex-col items-center justify-center border-2 border-gray-400 p-2 text-[1.2em] rounded-xl'><span>157</span><span className='text-[.6em]'>Days</span></div>
                                <div className='flex flex-col items-center justify-center border-2 border-gray-400 p-2 text-[1.2em] rounded-xl'><span>0.5</span><span className='text-[.6em]'>Hours</span></div>
                                <div className='flex flex-col items-center justify-center border-2 border-gray-400 p-2 text-[1.2em] rounded-xl'><span>41</span><span className='text-[.6em]'>Mins</span></div>
                                <div className='flex flex-col items-center justify-center border-2 border-gray-400 p-2 text-[1.2em] rounded-xl'><span>20</span><span className='text-[.6em]'>Secs</span></div>
                            </div>
                            <Link to='/menu' className='lg:hover:scale-95 lg:hover:bg-orange-500 active:text-black text-[.7em] px-[1.2em] py-[.6em] rounded-full bg-orange-400 mt-[1em] '>Order Now</Link>
                        </div>
                    </div>
                </section>


                {/*============= Client or Testimonial Slider =============*/}
                <section>
                    <TestimonialSlider />
                </section>


                {/*============= Banner for Deal of the Day =============*/}
                <section className='pb-10 bg-white'>
                    <div className='relative bg-cover bg-center' style={{ backgroundImage: `url(${img.img7})` }}>
                        <div className='absolute w-full h-full bg-black opacity-20'></div>
                        <div className='z-10 min-h-[60vw] sm:min-h-[30vw] xl:min-h-[26vw] flex flex-col justify-center items-center font-poppins text-center'>
                            <p className=" text-orange-400 text-center text-lg md:text-xl xl:text-2xl tracking-widest">The Product</p>
                            <h2 className="text-center text-2xl md:text-3xl xl:text-4xl font-semibold pt-1 ">Deal Of The Day</h2>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    )
}

export default Home