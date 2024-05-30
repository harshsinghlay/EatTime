import { Outlet } from 'react-router'
import { Header, Footer, ScrollToTop } from './components'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth';
import { storeLogout } from './redux/features/auth/authSlice';
import { useEffect } from 'react';
import { setFoods, setTrendingFoods, setWishlist } from './redux/features/food/foodsSlice';
import { setAllBlogs, setMyBlogs } from './redux/features/blog/blogSlice';
import { setCart } from './redux/features/food/cartSlice';
import { setOrders } from './redux/features/food/ordersSlice';
import { setPaymentMethods } from './redux/features/food/paymentMethodsSlice';
import { setAddresses } from './redux/features/food/addressesSlice';
import { changeUserBackendStatus } from './redux/features/backend/backendSlice';
import { Toaster } from 'react-hot-toast';

function Layout() {
  const dispatch = useDispatch();
  const backEndData = useSelector(state => state.backend.data)
  const userData = useSelector(state => state.auth.userData)

  const setStoreFoodData = (data) => {
    const allFoods = Object.values(data).flat();
    const trendingFoods = Object.keys(data).map((key) => {
      return data[key][0]
    })
    dispatch(setFoods(allFoods))
    dispatch(setTrendingFoods(trendingFoods))
  }

  const fetchData = () => {
    fetch("https://harshsinghlay.github.io/foodapi/db.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setStoreFoodData(data)
        } else {
          setStoreFoodData([])
        }
      })
  }

  const setStoreData = () => {
    const getBlogs = () => {
      let items = [];
      backEndData.forEach(obj => {
        const { allBlogs } = JSON.parse(obj.blogs)
        items = items.concat(allBlogs)
      });
      return items;
    }
    if (backEndData) {
      // setting all blogs
      dispatch(setAllBlogs(getBlogs()))
      // setting other items
      const currentUserData = backEndData?.find((user) => (
        user.userId === userData?.$id
      ))
      if (currentUserData) {
        const cart = JSON.parse(currentUserData?.cart)
        const orders = JSON.parse(currentUserData?.orders)
        const addresses = JSON.parse(currentUserData?.addresses)
        const paymentMethods = JSON.parse(currentUserData?.paymentMethods)
        const wishlist = JSON.parse(currentUserData?.wishlist)
        const blogs = JSON.parse(currentUserData?.blogs)
        const { myBlogs } = blogs;
        dispatch(setCart(cart))
        dispatch(setOrders(orders))
        dispatch(setPaymentMethods(paymentMethods))
        dispatch(setAddresses(addresses))
        dispatch(setMyBlogs(myBlogs))
        dispatch(setWishlist(wishlist))
        dispatch(changeUserBackendStatus())
      } else {
        console.log("User is not in backend");
        dispatch(setCart([]))
        dispatch(setOrders([]))
        dispatch(setPaymentMethods([]))
        dispatch(setAddresses([]))
        dispatch(setMyBlogs([]))
        dispatch(setAllBlogs([]))
        dispatch(setWishlist([]))
      }
    }
  }

  useEffect(() => {
    authService?.getCurrentUser().then((userData) => {
      if (userData) {
        authService.logout().then((res) => {
          if (res) {
            dispatch(storeLogout())
          }
        })
      }
    })
    fetchData()
  }, [])

  useEffect(() => {
    if (backEndData) {
      setStoreData()
    }
  }, [backEndData])


  return (
    <div className="w-full bg-white overflow-x-hidden flex flex-col ">
      <Header />
      <div className='pt-24 lg:pt-28' >
        <Outlet />
        <ScrollToTop />
        <Toaster position="top-center" />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
