import React, { useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "../../assets/icons/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from '../../assets/images/images';


function RelatedImageSlider({ setHeroImage, sliderImages = [] }) {
    const arrowRef = useRef();

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4.1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3.1,
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
        <section className="relative slick-container mx-auto py-4">
            <Slider ref={arrowRef} {...settings} >
                {sliderImages.map((img, index) => (
                    <div key={index} onClick={() => setHeroImage(img)} >
                        <img src={img} 
                        onError={(e) => {
                            e.target.src =
                            images?.fallbackimage;
                          }}
                        className="w-full h-full " alt="" />
                    </div>
                ))}
            </Slider>
            {/* <div className="pt-5 slick-arrows  flex justify-center">
                <button className="p-3 active:bg-red-500 active:text-white  bg-white mx-1 border-[1px] border-black" onClick={() => incrementAndDecrement("decrement")}>
                    <IoIosArrowBack />
                </button>
                <button className="p-3 active:bg-red-500 active:text-white  bg-white mx-1 border-[1px] border-black" onClick={() => incrementAndDecrement("increment")}>
                    <IoIosArrowForward />
                </button>
            </div> */}
        </section>
    );
}

export default RelatedImageSlider