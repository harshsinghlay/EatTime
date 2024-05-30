import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useLinks from '../../Hooks/useLinks';

function Navlinks() {
    const { navlinks } = useLinks()
    return (
        <nav className='flex list-none gap-8'>
            {navlinks.map((link, index) => (
                <div className='group' key={index}>

                    {/*========= MainLinks Section =========*/}
                    <section className='select-none'>
                        {link.status ?
                            <NavLink to={link.url} className={({ isActive }) =>
                                `${isActive ? "text-orange-400" : ""} group-hover:text-orange-400 duration-200 cursor-pointer`
                            }>{link.name}</NavLink> :
                            <span className='cursor-pointer'>{link.name}</span>
                        }
                    </section>

                    {/*========== Sublinks Section ==========*/}
                    {link.submenu &&
                        <section className='pt-4  top-12 text-black hidden group-hover:block absolute'>
                            <div className="p-4 gap-6 flex bg-white rounded-sm">
                                {link.sublinks.map((item, subIndex) => (
                                    <ul key={subIndex}>
                                        {item.Head && 
                                        <div key={subIndex}>
                                            <li className='font-bold cursor-pointer pb-2 mb-1'>
                                                <Link>{item.Head}</Link>
                                            </li>
                                            <li className='border-[1px] border-slate-500 w-14 mb-2 '></li>
                                        </div>
                                        }
                                        {item.sublink.map((subItem, subItemIndex) => (
                                            subItem.active &&
                                            <li className='cursor-pointer text-slate-500 hover:text-black ' key={subItemIndex}> {/* Assigning key to the li element */}
                                                <Link to={subItem.link}>{subItem.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                        </section>
                    }
                    
                </div>
            ))}
        </nav>
    );
}

export default Navlinks;
