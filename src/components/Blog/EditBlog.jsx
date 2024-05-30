import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BlogForm from './BlogForm';
import { useSelector } from 'react-redux';

function EditBlog() {
    const allBlogs = useSelector(state=>state.blogs.allBlogs)
    const [blog, setBlog] = useState(null)
    const { blogId } = useParams()

        useEffect(() => {
            setBlog(allBlogs?.find(blog => blog.id === blogId))
        }, [blogId]);

    return blog ? (
        <div >
                <BlogForm blog={blog} />
        </div>
    ) : null
}

export default EditBlog