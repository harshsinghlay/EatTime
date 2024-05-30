import React from 'react'
import BlogCard from './BlogCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function AllBlogs() {
    const blogs = useSelector(state => state.blogs.allBlogs)
    const authStatus = useSelector(state => state.auth.status)

    return (
        <div className='bg-gray-100 overflow-hidden'>
            <section className='py-10 max-w-[91%] mx-auto  font-poppins '>
                <div className='text-center pb-10 text-2xl sm:text-3xl lg:text-4xl font-semibold'><h2>All Blogs</h2></div>
                <div>
                    {blogs?.length > 0 ?
                        (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {blogs?.map((item) => (
                                <div key={item.id} className='h-[52vh]  border-black overflow-hidden rounded-md bg-white hover:border-[1px]  md:hover:scale-105 transition-transform duration-300 '>
                                    <BlogCard {...item} />
                                </div>
                            ))}
                        </div>)
                        :
                        <div className='flex justify-center text-xl text-gray-500 min-h-[40vh] '>
                            {authStatus ? (
                                <p>No Blogs Yet</p>
                            )
                                :
                                <Link to='/login' className='lg:hover:text-black active:font-semibold ' >Login To Read Blogs</Link>
                            }
                        </div>
                    }
                </div>
            </section>
        </div>
    )
}

export default AllBlogs