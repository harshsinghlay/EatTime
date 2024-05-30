import React, { useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "../../assets/icons/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from '../../assets/images/images'

function Card({ img, domain, name, about }) {
    return (
        <section className='relative w-full py-7 text-center text-[3.5vw] sm:text-[2.3vw] md:text-[1.9vw] lg:text-[1.5vw] xl:text-[1.2vw]'>
            <div className='flex flex-col items-center font-poppins md:px-[8em]' >
                <div className='h-[5.5em] w-[5.5em]  rounded-full overflow-hidden mb-2'>
                    <img src={img} alt="" />
                </div>
                <h2 className='text-[1.5em] mb-1'>{name}</h2>
                <h3 className='text-[1em]  text-gray-500 mb-3'>{domain}</h3>
                <p className='text-[.9em] text-gray-500 line-clamp-4 lg:pt-3'>{about}</p>
            </div>
        </section>
    )
}

function TestimonialSlider() {

    const data = [
        {
            img: img.client1,
            name: "Rachel Allen",
            domain: "Pastry Chef",
            about: 'Experienced chef with more than 10 years of experience in the Food industry. Skilled in providing excellent customer service, maintaining high standards of food safety and sanitation, and creating innovative and delicious desserts..'
        },
        {
            img: img.client2,
            name: "Bobby Flay",
            domain: "Head Chef",
            about: 'I am well-versed in a range of culinary techniques and familiar with the latest trends in cuisine. I have a proven track record of leading a team of chefs and other kitchen staff.'
        },
        {
            img: img.client3,
            name: "Luies Charls",
            domain: "Executive Chef",
            about: ' Experienced Executive Chef with 10+ years of culinary experience in high-end restaurants. Skilled in menu development, cost control, and team leadership. Proven record of success in reducing food costs by 20% while increasing customer satisfaction by 30%'
        },
    ]

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    const arrowRef = useRef();


    const incrementAndDecrement = (btn) => {
        if (btn === "increment") {
            arrowRef.current.slickNext();
        } else {
            arrowRef.current.slickPrev();
        }
    };
    return (
        <div className="slick-container relative max-w-[91%] mx-auto  py-14">

            {/*================= Slider Heading =================*/}
            <section className="w-full mx-auto font-poppins pb-12">
                <p className="text-orange-400 text-center text-xl md:text-2xl tracking-widest">Client Say</p>
                <h2 className="text-center text-3xl md:text-4xl font-semibold pt-1 ">Our Testimonial</h2>
            </section>

            {/*================= Slider Cards =================*/}
            <section>
                <Slider ref={arrowRef} {...settings} >
                    {data.map((item, index) => (
                        <div key={index} >
                            <Card {...item} />
                        </div>
                    ))}
                </Slider>
            </section>

            {/*================= Slider Buttons =================*/}
            <section className="pt-5 slick-arrows gap-2 md:gap-0 flex justify-center">
                <button className="md:absolute top-[55%] left-[5%] p-4 bg-orange-400  rounded-full  mx-1  border-black active:text-white" onClick={() => incrementAndDecrement("decrement")}>
                    <IoIosArrowBack />
                </button>
                <button className="md:absolute top-[55%] right-[5%] p-4  bg-orange-400  rounded-full  border-black active:text-white" onClick={() => incrementAndDecrement("increment")}>
                    <IoIosArrowForward />
                </button>
            </section>

        </div>
    );
}

export default TestimonialSlider