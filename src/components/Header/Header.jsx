import React, { useState, useEffect } from 'react'
import Navlinks from './Navlinks';
import {
    HiBars3,
    HiOutlineShoppingBag,
    CiSearch,
    FaRegUser,
} from '../../assets/icons/icons'
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../index'
import TogglingNavbar from './TogglingNavbar';
import SearchFoodCard from './SearchFoodCard';
import useLinks from '../../Hooks/useLinks';
import { useSelector } from 'react-redux';

function Header() {
    const { navlinks } = useLinks()
    const [showToggleNav, setShowToggleNav] = useState(false);
    const [showSearchBox, setShowSerchBox] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [query, setQuery] = useState("")
    const cart = useSelector(state => state.cart.cart)
    const foods = useSelector(state => state.foods.foods)
    const [searchFoodsData, setSearchFoodsData] = useState([])
    const navigate = useNavigate()

    const toggleSerachBox = () => {
        setShowSerchBox(!showSearchBox)
        setQuery("")
    }

    const toggleNavbar = () => {
        setShowToggleNav(!showToggleNav)
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setSearchFoodsData(
                query.trim() === '' ?
                    [] :
                    foods.filter(food => food.name.toLowerCase().includes(query.toLowerCase()))
            );
        }, 1000);
        return () => {
            clearTimeout(timerId)
        }
    }, [query])

    useEffect(() => {
        if (showToggleNav || query) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        // Cleanup function to remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showToggleNav, query]);


    return (
        <div className='fixed z-50 top-0 w-full '>

            <div className=' w-full bg-black'>

                {/*================ Section 1 ================*/}
                <section className='bg-black'>
                    <div className='bg-black text-white flex justify-center lg:justify-between font-poppins font-light text-sm  py-2.5 lg:py-3 max-w-[91%] mx-auto'>
                        <div className='hidden lg:flex tracking-wider'>
                            <span>Special Discount On Your First Order</span>
                        </div>
                        <ul className='flex gap-5'>
                            <li className={`${false ? 'block' : "hidden"}`}>
                                <button>Logout</button>
                            </li>
                            <li className={`${false ? 'block' : "hidden"}`}>
                                <button>Wishlist</button>
                            </li>
                            <li >
                                <select className='bg-black text-white outline-none' name="" id="">
                                    <option value="usd">usd $</option>
                                    <option value="inr">inr $</option>
                                </select>
                            </li>
                            <li>
                                <select className='bg-black text-white outline-none' name="" id="">
                                    <option value="usd">English</option>
                                    <option value="inr">Hindi</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </section>


                {/*============= Seprator Line =============*/}
                <div className='max-w-[91%] mx-auto border-t-[0.1px] border-gray-800'></div>


                {/*================ Section 2 ================*/}
                <section className='bg-white lg:bg-black'>
                    <div className='relative  flex items-center justify-between text-black lg:text-white py-4  max-w-[91%] mx-auto'>

                        <div className='flex gap-3 lg:hidden'>
                            {/* This div is for mobile devices */}
                            <HiBars3 size={32} onClick={toggleNavbar} className='active:text-orange-400 text-2xl' />
                            <CiSearch size={30} onClick={toggleSerachBox} className='active:text-orange-400' />
                        </div>

                        <div >
                            <Link to="/">
                                <Logo />
                            </Link>
                        </div>

                        <div className='hidden lg:flex justify-center '>
                            <Navlinks />
                        </div>

                        <div className=' flex items-center gap-3 lg:gap-4 '>
                            <div className='lg:p-1.5 lg:rounded-full lg:bg-orange-400 lg:text-black '>
                                <div >
                                    <FaRegUser size={25} className='lg:hidden active:text-orange-400' onClick={() => setShowUserOptions(!showUserOptions)} />
                                    {/*========= toggle account options for mobile device =========*/}
                                    <ul className={`${showUserOptions ? 'block' : "hidden"} lg:hidden px-2 py-2 text-black z-10 absolute top-16 right-11 sm:right-16  bg-white font-poppins rounded-sm `}>
                                        {navlinks[2]?.sublinks[0].sublink.map((item, index) => (
                                            (item.active && <li key={index} className='py-[1px]'><span onClick={() => { setShowUserOptions(!showUserOptions); navigate(item.link) }} className='active:text-orange-400 cursor-pointer' >{item.name}</span></li>)
                                        )
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <CiSearch size={28} className='hidden lg:block lg:active:text-white active:text-orange-400' onClick={toggleSerachBox} />
                                    {/*============== Search Bar ==============*/}
                                    <div className={`${showSearchBox ? 'block' : 'hidden'} z-4  top-16 left-0 right-0 mx-auto w-full sm:w-[50%] lg:w-[30%] absolute placeholder:font-poppins  sm:top-16 sm:left-1 sm:right-auto lg:top-[73px] lg:right-1 lg:left-auto border-[1px] border-black`}>
                                        <div className='flex'>
                                            <input value={query} className=' placeholder:font-poppins py-2 px-2 rounded-tl-sm rounded-bl-sm outline-none w-full ' onChange={(e) => setQuery(e.target.value)} placeholder='search' type="text" name="" id="" />
                                            {/* <button onClick={handleSearch} className='bg-white py-1 px-2 rounded-tr-sm rounded-br-sm active:text-red-800'><CiSearch size={20} /></button> */}
                                        </div>
                                        {searchFoodsData.length > 0 ?
                                            (<div className='w-full bg-gray-100 max-h-[60vh] overflow-y-scroll py-2 px-1 space-y-2'>
                                                {searchFoodsData.map((item, index) => (
                                                    <div key={index} className='shadow-md'>
                                                        <SearchFoodCard {...item} />
                                                    </div>
                                                ))}
                                            </div>) :
                                            query && <div className='min-h-[10vh] bg-gray-100 text-gray-300 flex justify-center items-center'>No Items Found</div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <Link to="/cart" className='relative select-none'>
                                <div className='lg:p-1.5 lg:rounded-full lg:bg-orange-400 lg:text-black lg:active:text-white active:text-orange-400'>
                                    <HiOutlineShoppingBag size={30} className='' />
                                </div>
                                <div className='select-none lg:hidden absolute px-1 rounded-full -top-1 -right-2 bg-orange-400 w-fit text-xs'>{cart?.length}</div>
                            </Link>

                            <div className='hidden lg:block text-sm'>
                                <p className='select-none'>Shopping Cart</p>
                                <p className='select-none'>{cart?.length} Item</p>
                            </div>
                        </div>

                    </div>
                </section>


                {/*================ Mobile Toggle NavLinks ================*/}
                <TogglingNavbar showToggleNav={showToggleNav} toggleNavbar={toggleNavbar} />
            </div>
        </div>
    )
}

export default Header