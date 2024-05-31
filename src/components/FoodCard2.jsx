import React from 'react'
import { itemQuantityDown, itemQuantityUp, removeFromCart } from '../redux/features/food/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { LiaRupeeSignSolid , MdDeleteForever} from '../assets/icons/icons'

function FoodCard2({ id, name, price, img, quantity, cart = false }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const increaseItemQuantiy = (e) => {
        e.stopPropagation();
        dispatch(itemQuantityUp(id))
    }

    const decreaseItemQuantiy = (e) => {
        e.stopPropagation();
        dispatch(itemQuantityDown(id))
    }

    const removeItemFromCart = (e) => {
        e.stopPropagation();
        dispatch(removeFromCart(id))
    }

    const foodDetails = () => {
        navigate(`/fooddetail/${id}`)
    }


    return (
        <div onClick={foodDetails} className='rounded-lg w-full bg-white p-1 h-full  flex justify-between max-h-32 sm:max-h-36 '>
            {/*============== Card Content ==============*/}
            <section className='flex gap-2 '>
                <div >
                    <img className='w-full h-full rounded-md' src={img} alt="" />
                </div>
                <div className='py-2 sm:py-3  px-2 flex flex-col justify-between'>
                    <h2 className='line-clamp-1 font-semibold text-lg '>{name}</h2>
                    <div className='text-sm pt-1 md:text-base'>
                        <span className='pr-1 '><LiaRupeeSignSolid className='inline' />{`${price} x ${quantity}`}</span>
                        <span className='text-red-500 pl-2 '><LiaRupeeSignSolid className='inline' />{Number(price * quantity)}</span>
                    </div>
                    <div>
                        {cart ? (
                            <div className='flex items-center  gap-1 text-gray-800  w-full pt-2 '>
                                <button onClick={decreaseItemQuantiy} className='border-[1px] border-gray-400 px-2  text-2xl md:text-3xl text-gray-400'><span>-</span></button>
                                <span className='px-2 font-semibold md:text-lg'>{quantity}</span>
                                <button onClick={increaseItemQuantiy} className='border-[1px] border-red-500 px-2 text-red-500 text-2xl md:text-3xl'><span>+</span></button>
                            </div>) :
                            <div className='flex items-center gap-2'>
                                <span>Qty.</span><span>{quantity}</span>
                            </div>
                        }
                    </div>
                </div>
            </section>

            {/*============== Delete Button ==============*/}
            <section>
                {cart && <div className='p-2 pr-3'>
                    <button className='text-2xl' onClick={removeItemFromCart}>
                        <MdDeleteForever />
                    </button>
                </div>}
            </section>
        </div>
    )
}

export default FoodCard2


// This is a multipurpose card because when it used on cart page it will show del button otherwise not 