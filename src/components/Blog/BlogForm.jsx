import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RTE from './RTE'
import appwriteService from '../../appwrite/service'
import { addBlog, updateBlog } from "../../redux/features/blog/blogSlice";
import Select from "./Select";
import Button from './Button';
import Input from './Input'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function BlogForm({ blog }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const userData = useSelector(state => state.auth.userData)
    const { register, handleSubmit, control, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: blog?.title || "",
            category: blog?.category || "",
            content: blog?.content || "",
            status: blog?.status || "active"
        }
    });

    function getCurrentDateTime() {
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const currentDate = now.toLocaleDateString('en-US', dateOptions);
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const currentTime = now.toLocaleTimeString('en-US', timeOptions);
        return { currentDate, currentTime };
    }

    const formHandler = async (data) => {
        console.log("Data is", data);
        setLoading(true)
        if (blog) {
            try {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    const delRes = await appwriteService.deleteFile(blog.id);
                }
                dispatch(updateBlog({
                    oldId: blog.id,
                    updatedBlog: {
                        userId: userData?.$id,
                        username: userData?.name,
                        id: file ? file?.$id : blog.id,
                        content: data.content,
                        title: data.title,
                        category: data.category,
                        date: blog.date,
                        author: blog.author,
                    }
                }));
                toast.success("Blog Updated Successfully!", {
                    style: {
                        borderRadius: '30px'
                    }
                })
                reset()
                setLoading(false)
                navigate("/blogs")
            } catch (error) {
                console.log(error);
                setLoading(false)
                toast.error("Blog Updation Failed!", {
                    style: {
                        borderRadius: '30px'
                    }
                })
            }
        } else {
            try {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const newBlog = {
                        userId: userData?.$id,
                        id: file.$id,
                        content: data.content,
                        title: data.title,
                        category: data.category,
                        author: {
                            name: userData?.name,
                            image: userData?.$id,
                        },
                        date: getCurrentDateTime().currentDate
                    }
                    dispatch(addBlog(newBlog));
                }
                toast.success("Blog Uploaded Successfully!", {
                    style: {
                        borderRadius: '30px'
                    }
                })
                reset()
                setLoading(false)
                navigate("/blogs")

            } catch (error) {
                setLoading(false)
                console.log(error);
                toast.error("Blog Uploading Failed!", {
                    style: {
                        borderRadius: '30px'
                    }
                })
            }
        }
    }


    return (
        <div className="max-w-[91%] mx-auto">
            <form onSubmit={handleSubmit(formHandler)} className="flex flex-wrap md:flex-row flex-col font-poppins py-10">
                <div className="md:w-2/3 w-full px-2 flex flex-col gap-3">
                    <div>
                        <Input
                            label="Title :"
                            placeholder="Title"
                            {...register("title", {
                                required: {
                                    value: !blog,
                                    message: "UserName is Required",
                                }
                            })}
                        />
                        {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title?.message}</p>}
                    </div>
                    <div>
                        <Input
                            label="Category :"
                            placeholder="Category"
                            {...register("category", {
                                required: {
                                    value: !blog,
                                    message: "Category is Required",
                                }
                            })}
                        />
                        {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category?.message}</p>}
                    </div>
                    <div>
                        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                        {errors.content && <p className="text-red-600 text-xs mt-1">{errors.content?.message}</p>}
                    </div>
                </div>
                <div className="md:w-1/3 w-full px-2 mt-4 md:mt-0 flex flex-col gap-2">
                    <div>
                        <Input
                            label="Featured Image :"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", {
                                required: {
                                    value: !blog,
                                    message: "Featured Image is Required",
                                }
                            })}
                        />
                        {errors.image && <p className="text-red-600 text-xs mt-1">{errors.image?.message}</p>}
                    </div>
                    {blog && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(blog.id)}
                                alt={blog.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <div>
                        <Select
                            options={["active", "inactive"]}
                            label="Status : "
                            className="mb-4"
                            {...register("status")}
                        />
                    </div>
                    <div>
                        {!loading ?
                            (<Button type="submit" bgColor={"bg-blue-600"} className="w-full py-2 lg:py-2.5 lg:text-sm lg:hover:bg-blue-700 ">
                                {blog ? "Update" : "Upload"}
                            </Button>)
                            :
                            (<Button type="submit" className="w-full text-white bg-blue-600 lg:hover:bg-blue-700  font-medium rounded-md py-2 lg:text-sm px-5 lg:py-2.5 text-center flex items-center justify-center">
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                {blog ? "Updating . . ." : "Uploading . . ."}
                            </Button>)
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BlogForm