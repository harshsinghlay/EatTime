import React from 'react'
import { FoodCard2, Bill } from '../index'
import ProgressBar from '../OrderProcess/ProgressBar'
import { addOrderProperty } from '../../redux/features/food/ordersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'


function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart.cart)
    const authStatus = useSelector(state => state.auth.status)

    const setOrderProperty = (key, value) => {
        dispatch(addOrderProperty({ key: key, value: value }));
    };

    const checkoutHandler = () => {
        if (cart.length > 0) {
            if (authStatus) {
                setOrderProperty("items", cart);
                navigate("/checkout")
            } else {
                toast.error("Please Login To Checkout", {
                    style: {
                        borderRadius: '30px'
                    }
                })
            }
        } else {
            toast.error("No items Yet", {
                style: {
                    borderRadius: '30px'
                }
            })
        }
    }

    const addMoreItemsHandler = () => {
        navigate('/menu')
    }

    return (
        <div className='bg-gray-100'>
            {/*======== Bar To show steps of Ordering Process =========*/}
            <section className='hidden md:block pt-10 max-w-[91%] mx-auto '>
                <div className='w-[80%] lg:w-[60%] mx-auto '><ProgressBar progressPercentage={0} /></div>
            </section>

            {/*============== Cart Items and Total Bill ==============*/}
            <section className='max-w-[91%] mx-auto gap-6 py-10 flex flex-col lg:flex-row font-poppins'>
                <div className='lg:w-[70%]'>
                    {cart.length > 0 ?
                        (<div className=' flex flex-col gap-5'>
                            {cart?.map((item) => (
                                <div key={item.id} className='shadow-lg rounded-lg lg:hover:border-[1px] border-black' >
                                    <FoodCard2 cart={true} {...item} />
                                </div>
                            ))}
                        </div>) :
                        <div className='min-h-[48vh] flex justify-center items-center text-2xl  text-gray-500 tracking-wider'>
                            No Items Yet
                        </div>}
                </div>
                <div className='max-h-[64vh] shadow-lg bg-white lg:w-[40%] lg:block px-6 rounded-lg overflow-hidden'>
                    <Bill btn2='Checkout Now' btn1='Continue Shopping' func1={addMoreItemsHandler} func2={checkoutHandler} />
                </div>
            </section>
        </div>
    )
}

export default Cart





