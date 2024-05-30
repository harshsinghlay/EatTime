import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom'
import Layout from './Layout.jsx'
import store from './redux/store/store.js'
import { Provider } from 'react-redux'
import MyBlogs from './pages/MyBlogs.jsx'
import AllBlogs from './pages/AllBlogs.jsx'
import EditBlog from './pages/EditBlog.jsx'
import AddBlog from './pages/AddBlog.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Contact from './pages/Contact.jsx'
import FoodDetail from './pages/FoodDetail.jsx'
import Cart from './pages/Cart.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Wishlist from './pages/Wishlist.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SavedAddresses from './pages/SavedAddresses.jsx'
import SavedPaymentMethods from './pages/SavedPaymentMethods.jsx'
import OrderDetails from './pages/OrderDetails.jsx'
import Checkout from './pages/Checkout.jsx'
import Payment from './pages/Payment.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import CancelOrder from './pages/CancelOrder.jsx'


const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='menu' element={<Menu />} >
            <Route path=":selectedCat" element={<Menu />} />
        </Route >
        <Route path='contact' element={<Contact />} />
        <Route path="fooddetail/:id" element={<FoodDetail />} />
        <Route path='cart' element={<Cart />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} >
            <Route path='profile' element={<Profile />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='orders' element={<MyOrders />} />
            <Route path='addresses' element={<SavedAddresses />} />
            <Route path='paymentmethods' element={<SavedPaymentMethods />} />
        </Route>
        <Route path='ordersummary/:orderId' element={<OrderDetails />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='payment' element={<Payment />} />
        <Route path='paymentsuccess/:orderId' element={<PaymentSuccess />} />
        <Route path='cancelorder/:orderId' element={<CancelOrder />} />
        <Route path='blogs' element={<AllBlogs />} />
        <Route path='myblogs' element={<MyBlogs />} />
        <Route path='editblog/:blogId' element={<EditBlog />} />
        <Route path='addblog' element={<AddBlog />} />
        <Route path='blogDetails/:blogId' element={<BlogDetails />} />
    </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
