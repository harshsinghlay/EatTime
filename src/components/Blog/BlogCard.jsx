import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../../appwrite/service'
import parse from 'html-react-parser'

function BlogCard({ id, title, content, category, date }) {
    return (
        <div className='w-full h-full  group'>
            <div className="w-full h-full rounded overflow-hidden flex flex-col">
                {/*============= Blog Image =============*/}
                <div className="relative h-[50%] overflow-hidden rounded-tl-sm rouned-tr-sm"><div >
                    <img className="w-full lg:group-hover:scale-110  transition-transform duration-300"
                        src={appwriteService.getFilePreview(id)}
                        alt="blog Image" />

                </div>
                    <div className='overflow-hidden '>
                        <p
                            className="text-xs absolute top-0 right-0 min-w-[30%] max-w-[40%] bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 lg:hover:bg-white lg:hover:text-indigo-600 transition duration-500 ease-in-out">
                            <span className='  line-clamp-1 text-center'>
                                {category || "category"}
                            </span>
                        </p>
                    </div>
                </div>
                {/*============= Blog Content =============*/}
                <div className='flex flex-col justify-between h-[50%] mx-auto w-[92%] overflow-hidden'>
                    <div className="pt-4  ">
                        <p
                            className="line-clamp-1 text-nowrap overflow-ellipsis  pb-1 font-medium text-lg lg:hover:text-indigo-600 transition duration-500 ease-in-out inline-block">
                            {title}
                        </p>
                        <p className="text-gray-500 text-sm line-clamp-3">
                            {parse(content)}
                        </p>
                    </div>
                    <div className=" pt-3 pb-2 flex flex-row items-center justify-between ">
                        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <span className="ml-1">{date}</span>
                        </span>
                        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <span className="ml-1"><Link to={`/blogDetails/${id}`}>Read More..</Link> </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard