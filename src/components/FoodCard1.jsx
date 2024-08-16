import React from "react";
import { FaStar, MdCurrencyRupee } from "../assets/icons/icons";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/features/food/cartSlice";
import { useDispatch } from "react-redux";
import images from '../assets/images/images'

function FoodCard1({ food }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderBtnHandler = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...food, quantity: 1 }));
    navigate("/cart");
  };

  const foodDetails = () => {
    navigate(`/fooddetail/${food.id}`);
  };

  return (
    <div
      onClick={foodDetails}
      className=" w-full h-full bg-white rounded-lg font-poppins flex flex-col justify-between  shadow-md text-[3.7vw] sm:text-[2.1vw] md:text-[1.9vw] lg:p-0  lg:shadow-lg lg:border-0 lg:text-[1.3vw] xl:text-[1.1vw] group  lg:hover:border-[1px] lg:hover:border-black lg:hover:scale-100 lg:scale-95 transition-transform duration-300"
    >
      {/*========== Card Image ==========*/}
      <section className="h-[45%] bg-black rounded-t-lg overflow-hidden">
        <img
          src={food?.img}
          onError={(e) => {
            e.target.src = images?.fallbackimage;
          }} // Set fallback image on error
          className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-300"
          alt={food?.name}
        />
      </section>

      {/*========== Card Details ==========*/}
      <section className="relative p-2 sm:p-3 h-[55%] gap-1 sm:gap-2 flex flex-col justify-between">
        <div className="flex justify-between items-center text-[1em] sm:text-[.9em] md:text-[1em] lg:text-[1.1em]">
          <span className="font-semibold text-gray-700 line-clamp-1 break-all">
            {food?.name}
          </span>
          <span className="hidden md:flex px-1 sm:px-1 py-[1px] bg-green-600  items-center gap-1 rounded-sm text-white text-[.8em] ">
            <span>{food?.rate}</span>
            <FaStar />
          </span>
        </div>
        <div className="font-semibold text-gray-700 text-[1em] sm:text-[.9em] md:text-[1em] lg:text-[1.1em] flex items-center">
          <span>
            <MdCurrencyRupee />
          </span>
          <span>{food?.price}</span>
        </div>
        <div className="pb-2 text-[.8em] sm:p-0 line-clamp-3 lg:line-clamp-2 xl:line-clamp-3 text-gray-500 break-all overflow-hidden">
          {food?.dsc}
        </div>
        <div class="relative lg:group duration-500 transform lg:group-hover:-translate-y-3 text-center justify-center items-center">
          <button
            onClick={orderBtnHandler}
            href="/order"
            class="py-1 px-3  sm:py-2 sm:px-3 md:px-4 lg:px-5 md:font-semibold bg-red-500  rounded-full text-white lg:text-sm"
          >
            Order Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default FoodCard1;
