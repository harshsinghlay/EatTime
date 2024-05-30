import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../../appwrite/service'
import parse from 'html-react-parser'

function BlogCard({ id, title, content, category, date }) {
    return (
        <div className='w-full h-full shadow-lg group'>
            <div className="w-full h-full rounded overflow-hidden shadow-lg flex flex-col">
                {/*============= Blog Image =============*/}
                <div className="relative h-[50%] overflow-hidden rounded-tl-md rouned-tr-md"><div >
                    <img className="w-full lg:group-hover:scale-110 object-cover transition-transform duration-300"  
                        src={appwriteService.getFilePreview(id)}
                        alt="blog Image" />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </div>
                    <div className='overflow-hidden '>
                        <p
                            className="text-xs absolute top-0 right-0 min-w-[30%] max-w-[40%] bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            <span className='  line-clamp-1 text-center'>
                                {category || "category"}
                            </span>
                        </p>
                    </div>
                </div>
                {/*============= Blog Content =============*/}
                <div className="px-6 py-4 mb-auto">
                    <p
                        className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                        {title}</p>
                    <p className="text-gray-500 text-sm line-clamp-2">
                        {parse(content)}
                    </p>
                </div>
                <div className="px-6 py-3 flex flex-row items-center justify-between ">
                    <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                        <span className="ml-1">{date}</span>
                    </span>
                    <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                        <span className="ml-1"><Link to={`/blogDetails/${id}`}>Read More..</Link> </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BlogCard