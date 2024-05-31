import React, { useState } from 'react';
import { IoIosArrowDown } from '../../assets/icons/icons';
import { Link } from 'react-router-dom';
import useLinks from '../../Hooks/useLinks';

function FooterDropDown() {
    const { footerlinks } = useLinks();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleSubmenu = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div className="h-full w-full text-white">
            {footerlinks.map((item, index) => (
                <div key={index}>
                    {/*=========== Main Links ===========*/}
                    <section className="flex justify-between text-lg py-2" onClick={() => toggleSubmenu(index)}>
                        <h2 className="font-semibold text-gray-300">{item.head}</h2>
                        <span className={`${openIndex === index ? 'rotate-180 duration-300' : ''}`}><IoIosArrowDown /></span>
                    </section>

                    {/*=========== Sublinks ===========*/}
                    {item.sublinks && openIndex === index && (
                        <section>
                            <ul className="h-full w-full">
                                {item.sublinks.map((link, subIndex) => (
                                    link.status && (
                                        <li key={subIndex} className="py-2 text-gray-400 cursor-pointer">
                                            {link.url ? (
                                                <Link to={link.url}>
                                                    {link.name}
                                                </Link>
                                            ) : (
                                                <p>{link.name}</p>
                                            )}
                                        </li>
                                    )
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FooterDropDown;
