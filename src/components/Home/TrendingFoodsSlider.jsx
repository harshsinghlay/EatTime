import React, { useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "../../assets/icons/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FoodCard1 } from '../index'
import { useSelector } from "react-redux";


function TrendingFoodsSlider() {
    const trendingFoods = useSelector(state => state.foods.trendingFoods)
    console.log("TrendingFoods length", trendingFoods.length);

    const arrowRef = useRef();

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3.1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
        ],
    };


    const incrementAndDecrement = (btn) => {
        if (btn === "increment") {
            arrowRef.current.slickNext();
        } else {
            arrowRef.current.slickPrev();
        }
    };

    return (
        <div className="slick-container max-w-[91%] mx-auto py-1 pb-3">
            {/*============= Food Cards Slide =============*/}
            <div className="py-3">
                <Slider ref={arrowRef} {...settings} >
                    {trendingFoods.map((food, index) => (
                        <div key={food.id} className="h-[68vw] sm:h-[42vw] md:h-[38vw] w-full ">
                            <FoodCard1 key={index} food={food} />
                        </div>
                    ))}
                </Slider>
            </div>

            {/*============= Slider Buttons =============*/}
            <div className="pt-5 slick-arrows  flex justify-center gap-1">
                <button className="p-3 active:bg-gray-200  bg-white mx-1 " onClick={() => incrementAndDecrement("decrement")}>
                    <IoIosArrowBack />
                </button>
                <button className="p-3 active:bg-gray-200  bg-white mx-1 " onClick={() => incrementAndDecrement("increment")}>
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
}

export default TrendingFoodsSlider