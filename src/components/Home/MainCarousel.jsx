import React, { useState, useEffect } from 'react';
import { RxDotFilled } from '../../assets/icons/icons';
import slides from '../../assets/slides/slides'
import { Link } from 'react-router-dom';


function MainCarousel() {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        setCurrentIndex(prevIndex => {
            const isLastSlide = prevIndex === slides.length - 1;
            return isLastSlide ? 0 : prevIndex + 1;
        });
    };


    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <div className=' relative w-full h-[38vh] sm:h-[60vh] md:h-[80vh] lg:h-[90vh] xl:h-[95vh] bg-orange mx-auto group border-2 border-black bg-black'>

            {/*=================== HomePage Slider Content ===================*/}
            <section
                style={{ backgroundImage: `url(${slides[currentIndex].img})` }}
                className='w-full h-full bg-center bg-cover duration-500 '
            >
                <div className='max-w-[91%] mx-auto h-full flex items-center '>
                    <div className='w-[70%] sm:w-[60%] md:w-[50%] xl:w-[45%] h-full flex justify-center items-center  font-poppins text-white'>
                        <div className='flex flex-col lg:gap-1'>
                            <h1 className='font-semibold duration-500 sm:text-2xl xl:text-5xl text-xl md:text-4xl '>{slides[currentIndex].title1}<span className='block text-orange-400 duration-500'>{slides[currentIndex].title2}</span></h1>
                            <p className='xl:text-lg  text-gray-400 duration-500 text-xs sm:text-sm md:text-base lg:text-xl lg:leading-6 line-clamp-3 '>{slides[currentIndex].description}</p>
                            <div className=' mt-3 '>
                                <Link to={"/menu"} className=' px-3 md:px-6 lg:px-9 lg:py-2 py-1  bg-orange-400 rounded-sm md:text-lg xl:text-xl lg:hover:scale-95 active:text-black lg:hover:bg-orange-500'>Order Now</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/*=================== HomePage Slider Dot Buttons ===================*/}
            <section className='w-full mx-auto absolute bottom-2 flex justify-center '>
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-2xl sm:text-3xl lg:text-4xl cursor-pointer ${slideIndex === currentIndex ? 'text-blue-600' : 'text-gray-400'
                            }`}
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </section>

        </div>
    );
}

export default MainCarousel;
