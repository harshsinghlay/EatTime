import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/service";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog as deleteBlogStore } from "../../redux/features/blog/blogSlice";
import Button from "./Button";
import parse from 'html-react-parser'


export default function Blog() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.userData)
    const [blog, setBlog] = useState(null)
    const allBlogs = useSelector(state => state.blogs.allBlogs)
    const { blogId } = useParams()
    const navigate = useNavigate()
    const isAuthor = blog && userData ? blog.userId === userData.$id : false;

    useEffect(() => {
        setBlog(allBlogs?.find(blog => blog.id === blogId))
    }, [blogId]);

    const deleteBlog = async () => {
        try {
            const fileDelRes = appwriteService.deleteFile(blog.id)
            if (fileDelRes) {
                dispatch(deleteBlogStore(blog.id))
            }
            toast.success("Blog Deleted Successfully!", {
                style: {
                    borderRadius: '30px'
                }
            })
            navigate('/blogs')
        } catch (error) {
            console.log(error);
            toast.error("Blog Deletion Failed!", {
                style: {
                    borderRadius: '30px'
                }
            })
        }
    };

    return blog ? (
        <div className="py-10 max-w-[91%] mx-auto">
            {/*============ Blog Image ============*/}
            <div className="w-full flex justify-center mb-4 relative border rounded-md p-4">
                <div className="h-[80vw] md:h-[35vw] w-full rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${appwriteService.getFilePreview(blog?.id)})` }}
                >
                </div>
                {isAuthor && (
                    <div className="absolute right-8 top-8">
                        <Link to={`/blogs/editblog/${blog?.id}`}>
                            <Button bgColor="bg-green-500 text-sm" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500 text-sm" onClick={deleteBlog}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            {/*============ Blog Content and Author ========*/}
            <div className="w-full flex-col md:flex-row flex py-4 px-6 gap-5 ">
                <section className="grow">
                    <div className="w-full mb-4 ">
                        <h1 className="text-2xl font-bold">{blog.title}</h1>
                    </div>
                    {blog.content && typeof blog.content === 'string' && (
                        <div className="browser-css ">
                            {parse(blog.content)}
                        </div>
                    )}
                </section>
                <section className="min-w-fit" >
                    <div className="flex flex-row mt-2">
                        <div className="w-auto h-auto rounded-full border-2 border-pink-500 min min-w-fit">
                            <img className='w-12 h-12 object-cover rounded-full shadow cursor-pointer' alt='User avatar' src={appwriteService.getFilePreview(blog?.author.image)} />
                        </div>
                        <div class="flex flex-col mb-2 ml-4 mt-1">
                            <div className='text-gray-600 text-sm font-semibold line-clamp-1'>{blog?.author.name}</div>
                            <div className='flex w-full mt-1'>
                                <div className='text-blue-700 font-base text-xs mr-1 cursor-pointer'>
                                    Food Blogger
                                </div>
                                <div className='text-gray-400 font-thin text-xs line-clamp-1'>
                                    • {blog?.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    ) : null;
}