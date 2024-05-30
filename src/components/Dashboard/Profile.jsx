import React, { useState } from 'react'
import { HiBars3 , TiUser} from "../../assets/icons/icons";
import { useNavigate, useOutletContext } from 'react-router';
import authService from '../../appwrite/auth'
import { storeLogout } from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import appwriteService from '../../appwrite/service'

function Profile() {
  const [loading, setLoading] = useState(false)
  const toggleDashboardOptions = useOutletContext()
  const authStatus = useSelector(state => state.auth.status)
  const userData = useSelector(state => state.auth.userData)
  const orders = useSelector(state => state.orders.orders)
  const cart = useSelector(state => state.cart.cart)
  const wishlist = useSelector(state => state.foods.wishlist)
  const addresses = useSelector(state => state.addresses.addresses)
  const paymentMethods = useSelector(state => state.paymentMethods.paymentMethods)
  const myBlogs = useSelector(state => state.blogs.myBlogs)
  const allBlogs = useSelector(state => state.blogs.allBlogs)
  const isUserInBackend = useSelector(state => state.backend.isUserInBackend)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const dataForSent = {
    userId: userData?.userId,
    orders: JSON.stringify(orders),
    cart: JSON.stringify(cart),
    wishlist: JSON.stringify(wishlist),
    addresses: JSON.stringify(addresses),
    paymentMethods: JSON.stringify(paymentMethods),
    blogs: JSON.stringify({
      myBlogs: myBlogs,
      allBlogs: allBlogs,
    })
  }


  const updateOrCreateBackEndData = async () => {
    if (isUserInBackend) {
      const res = await appwriteService.updateData(userData?.userId, { ...dataForSent })
      return res;
    } else {
      const res = await appwriteService.setData({ ...dataForSent })
      return res;
    }
  }


  const logoutHandler = async () => {
    setLoading(true)
    const response = updateOrCreateBackEndData()
    if (response) {
      authService.logout().then((res) => {
        if (res) {
          setLoading(false)
          dispatch(storeLogout())
          navigate('/')
        }
      })
    }
  }



  return (
    <div className='flex flex-col gap-5 py-10'>

      {/*======== Title and Button To Toggle Dashboard Options ========*/}
      <section className=' flex justify-between items-center  px-4 sm:px-6 font-poppins text-gray-800'>
        <div className='flex items-center gap-2'>
          <span><TiUser className='text-2xl' /></span>
          <span className='text-2xl font-semibold'>My Profile</span>
        </div>
        <div className='block lg:hidden'>
          <button className=' px-3 sm:px-5 md:text-base py-2  rounded-full  sm:font-light  ' onClick={toggleDashboardOptions && toggleDashboardOptions}>
            <span><HiBars3 className='text-2xl sm:4xl ' /></span>
          </button>
        </div>
      </section>

      {/*======== User Details ========*/}
      <section className='overflow-hidden'>
        <div className='flex flex-col gap-4 bg-white font-poppins px-6 py-10 rounded-xl'>
          <section className='flex justify-between '>
            <div className='w-20 h-20 rounded-full border-2 border-red-500 overflow-hidden'>
              <img className='w-full h-full' src={appwriteService.getFilePreview(userData?.$id || "")} alt="dp" />
            </div>
            <div className={authStatus ? "block" : "hidden"}>
              {!loading ?
                (<button type="button" className={` text-red-500 hover:text-white border border-red-500 hover:bg-red-500 font-poppins rounded-lg text-sm px-5 py-2 text-center`} onClick={logoutHandler}>Logout</button>
                ) :
                (<button type="submit" class=" text-red-500 hover:text-white border border-red-500 hover:bg-red-500 font-poppins rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center">
                  <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Please Wait . . .
                </button>)}
            </div>
          </section>
          
          <section className='space-y-4'>
            <p className='flex flex-col'><span className='text-gray-600 text-sm'>Username </span><span>{userData?.name || "******"}</span></p>
            <p className='flex flex-col'><span className='text-gray-600 text-sm'>Email </span><span>{userData?.email || "******"}</span></p>
          </section>
        </div>
      </section>

    </div>

  )
}

export default Profile