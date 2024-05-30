import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from '../../assets/icons/icons'
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/features/food/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/features/food/foodsSlice';
import { Rating } from '../index'
import toast from 'react-hot-toast';
import RelatedImageSlider from './RelatedImageSlider';
import { FoodCard1 } from '../index'

function FoodDetail() {
  const { id } = useParams()
  const authStatus = useSelector(state => state.auth.status)
  const [quantity, setQuantity] = useState(1);
  const foods = useSelector(state => state.foods.foods)
  const wishlist = useSelector(state => state.foods.wishlist)
  const [sliderImages, setSliderImages] = useState([])
  const [food, setFood] = useState(null)
  const [mainImage, setHeroImage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [relatedFoods, setRelatedFoods] = useState([])

  useEffect(() => {
    if (foods.length > 0) {
      const foodToFind = foods?.find(food => food.id === id);
      setFood(foodToFind);
      setQuantity(1);
      setHeroImage(foodToFind?.img)
      setIsInWishlist(wishlist.some(food => food.id === foodToFind?.id));
      setRelatedFoods(foods?.filter(food => food.category === foodToFind?.category))
    }
  }, [foods, id, wishlist]);


  // This is a temporarily way to set related images because we don't have multiple images of same food
  useEffect(() => {
    const img = relatedFoods?.slice(0, 5)?.map(food => food.img)
    setSliderImages(img)
    setIsLoading(false)
  }, [relatedFoods])



  const toggleWishlist = () => {
    if (authStatus) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(food.id));
      } else {
        dispatch(addToWishlist(food));
      }
      setIsInWishlist(prev => !prev);
    } else {
      toast.error("Please Login To Add To Wishlist", {
        style: {
          borderRadius: '30px'
        }
      })
    }
  };


  const orderFood = () => {
    dispatch(addToCart({ ...food, quantity: quantity }))
    navigate("/cart")
  }

  const addItemToCart = () => {
    dispatch(addToCart({ ...food, quantity: quantity }))
    toast.success("Added To Cart!", {
      style: {
        borderRadius: '30px'
      }
    })
  }

  const increaseItemQuantiy = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseItemQuantiy = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    !isLoading ?
      <section className='py-10'>

        {/*============== Main Food ==============*/}
        <section className='max-w-[91%] mx-auto font-poppins grid grid-cols-1 md:grid-cols-2'>
          {/*======== Food Images  ========*/}
          <div>
            <div className='h-[80vw] md:h-[35vw]  bg-black bg-cover rounded-md' style={{ backgroundImage: `url(${mainImage})` }}>
            </div>
            <div >
              <RelatedImageSlider
                setHeroImage={setHeroImage} sliderImages={sliderImages} />
            </div>
          </div>

          {/*======== Food Details  ========*/}
          <div className='md:px-5 py-1 '>
            <div className=' pb-3 lg:pb-4 border-b-2 border-gray-300'>
              <h2 className='font-semibold text-xl lg:text-2xl xl:text-3xl line-clamp-1'>{food?.name}</h2>
              <p className='text-gray-600 text-sm lg:text-base xl:text-lg text-leading-3 pt-3'>{food?.dsc}</p>
            </div>

            <div className=' py-3 lg:py-4 border-b-2 border-gray-300 flex flex-col gap-2'>
              <div className='flex items-center text-lg xl:text-xl'>
                <Rating rate={food?.rate} />
                <span className='pl-4'>
                  142 customer reviews
                </span>
              </div>
              <div className='flex items-center text-lg xl:text-xl'>
                <span className='font-semibold'>${food?.price && food?.price.toFixed(2)}</span>
                <span className=' pl-1 text-sm'>${food?.price && (food?.price + 20).toFixed(2)}</span>
              </div>
            </div>

            <div className='border-b-2  border-gray-300  py-3 lg:py-4 flex flex-col gap-4'>
              <div>
                <button onClick={toggleWishlist} className='flex items-center  gap-1 text-gray-800 xl:text-lg'>
                  <span>{isInWishlist ? <FaHeart className='text-red-500' /> : <FaRegHeart />}</span>
                  {isInWishlist ? "remove from wishlist" : "add to wishlist"}</button>
              </div>
              <div >
                <div className='flex items-center  gap-1 text-gray-800 text-lg xl:text-xl w-full'>
                  Qty.<div className='pl-2 flex items-center'>
                    <div>
                      <button onClick={decreaseItemQuantiy} className='active:bg-gray-100 border-[1px] border-gray-400 px-3 py-[3px] '>-</button>
                    </div>
                    <div className='w-10 text-center select-none'>
                      {quantity}
                    </div>
                    <div>
                      <button onClick={increaseItemQuantiy} className='active:bg-gray-100 border-[1px] border-gray-400 px-3 py-[3px] '>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='border-b-2 md:border-b-0 border-gray-300  py-3 lg:py-4 flex flex-col gap-3 md:flex-row'>
              <div className='lg:w-[50%]'>
                <button onClick={orderFood} className='bg-red-500  text-white text-lg font-semibold w-full  md:px-7 md:text-base py-3 rounded-md lg:hover:bg-white lg:hover:border-2 lg:hover:border-red-500 lg:hover:text-red-500 active:bg-gray-200'>Order Now</button>
              </div>
              <div className='lg:w-[50%]'>
                <button onClick={addItemToCart} className='border-2 border-red-500 text-red-500 text-lg font-semibold w-full md:px-7 md:text-base  py-3 rounded-md lg:hover:bg-red-500 lg:hover:text-white lg:hover:border-red-500 active:bg-red-600'>Add To Cart</button>
              </div>
            </div>

          </div>
        </section>

        {/*============== Related Foods ==============*/}
        <section className='max-w-[91%] mx-auto font-poppins'>
          <div className='py-6'>
            <h1 className='text-center text-2xl md:text-3xl xl:text-4xl pb-6'>Related Foods</h1>
            <div className=" grid relative  py-5  mx-auto  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden gap-3">
              {relatedFoods.slice(0, 10).map((food) => (
                <div key={food.id} className="rounded-lg h-[68vw] sm:h-[44vw] md:h-[38vw] lg:max-h-[34vw] xl:max-h-[25vw] ">
                  <FoodCard1 food={food} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </section> : null
  )
}

export default FoodDetail