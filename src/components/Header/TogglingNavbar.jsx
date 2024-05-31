import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoIosArrowDown, RxCross1 } from '../../assets/icons/icons'
import useLinks from '../../Hooks/useLinks';

function TogglingNavbar({ showToggleNav, toggleNavbar }) {
    const { navlinks } = useLinks()
    const [openIndex, setOpenIndex] = useState(null);

    const toggleSubmenu = (e, index) => {
        e.stopPropagation();
        setOpenIndex(index === openIndex ? null : index);
    };

    useEffect(() => {
        if (!showToggleNav) {
            setOpenIndex(null)
        }
    }, [showToggleNav])


    return (
        <section className={`z-10 overflow-y-scroll  h-[100vh] top-0 w-[80%] sm:w-[50%] md:w-[40%] lg:hidden text-black border-2 border-black bg-white duration-500 pt-14 px-1 absolute ${showToggleNav ? "left-0 " : 'left-[-100%] '}`}>

            {/*======== Button For Toggle ========*/}
            <div className='flex justify-end '>
                <button className='text-3xl px-4 active:text-orange-600' onClick={toggleNavbar}><RxCross1 /></button>
            </div>

            {/*======== Navlinks ========*/}
            <div className='px-2 pt-8 text-black flex flex-col gap-2'>
                <ul>
                    {navlinks.map((links, index) => (
                        <li key={index}>
                            {/*========= MainLinks Section =========*/}
                            <section className=' flex justify-between items-center border-b-2 border-gray-200 py-2'
                                onClick={(e) => toggleSubmenu(e, index)}>
                                <NavLink
                                    to={links.url}
                                    className={({ isActive }) =>
                                        `${isActive ? "text-orange-400" : "text-gray-700"} cursor-pointer font-poppins text-xl select-none`
                                    }
                                >
                                    {links.name}
                                </NavLink>

                                {links.submenu &&
                                     <span className={`${openIndex === index ? 'rotate-180 duration-300' : ''} text-xl mr-2`}><IoIosArrowDown /></span>}
                            </section>
                            {/*========== Sublinks Section ==========*/}
                            {links.submenu && openIndex === index && (
                                <section >
                                    <ul className='flex flex-col gap-1 py-2 px-2'>
                                        {links.sublinks.map((sublink) => (
                                            sublink.sublink.map((item, sublinkIndex) => (
                                                item.active &&
                                                <li className='font-poppins active:font-semibold select-none' key={sublinkIndex}>
                                                    <Link to={item.link}>{item.name}</Link>
                                                </li>
                                            ))
                                        ))}
                                    </ul>
                                </section>)}
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );
}

export default TogglingNavbar;
