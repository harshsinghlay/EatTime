import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeLogin } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from "react-hook-form"
import appwriteService from '../../appwrite/service'
import { setBackendDataToStore } from '../../redux/features/backend/backendSlice'
import toast from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const getDataFromBackend = async () => {
        try {
            const data = await appwriteService.getData([]);
            if (data) {
                if (data?.documents.length > 0) {
                    dispatch(setBackendDataToStore(data.documents))
                }
            }
        } catch (error) {
            console.error("Error fetching data from backend", error);
        }
    }

    const login = async (data) => {
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    toast.success("Login Successful!", {
                        style: {
                            borderRadius: '30px'
                        }
                    })
                    dispatch(storeLogin({ ...userData, userId: userData.$id }))
                    getDataFromBackend()
                    setLoading(false)
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
            setLoading(false)
            toast.error("Login Failed!", {
                style: {
                    borderRadius: '30px'
                }
            })
        }
    }


    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto ">
                <div className="w-full bg-white rounded-lg shadow sm:max-w-md font-poppins">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl md:text-2xl font-semibold leading-tight tracking-tight text-gray-900 pb-2">
                            Sign in to your account
                        </h1>
                        {error && <p className="text-red-600 text-xs">{error}</p>}
                        <form onSubmit={handleSubmit(login)} className="space-y-4 md:space-y-5"  >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="xyz@gmail.com"
                                    {...register('email', {
                                        required: "Email is Required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Email address must be a valid address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-600 text-xs">{errors.email?.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 "
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                                {errors.password && <p className="text-red-600 text-xs">{errors.password?.message}</p>}
                            </div>
                            <div >
                                <div className='flex items-center gap-3 pt-2'>
                                    <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50    " />
                                    <label htmlFor="remember" className="text-sm font-light text-gray-500 select-none">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div>
                                {!loading ?
                                    (<button type="submit" className="w-full text-white bg-primary-600 bg-blue-600 lg:hover:bg-blue-700 active:bg-blue-800  font-medium rounded-md  px-5 py-3 lg:py-2.5 lg:text-sm text-center ">Sign in</button>)
                                    :
                                    (
                                        <button type="submit" class="w-full text-white bg-blue-600 lg:hover:bg-blue-700 active:bg-blue-800 font-medium rounded-md  px-5 py-3 lg:py-2.5 lg:text-sm text-center flex items-center justify-center">
                                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            Signing in . . .
                                        </button>
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline ">Sign up</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login