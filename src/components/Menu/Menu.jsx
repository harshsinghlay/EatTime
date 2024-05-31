import React, { useEffect, useState } from 'react'
import img from '../../assets/images/images'
import { Link } from 'react-router-dom'
import Filter from './Filters';
import TogglingFilter from './TogglingFilter';
import ListFoods from './ListFoods';


function Menu() {
  const [showToggleFilter, setShowToggleFilter] = useState(false)

  const toggleFilter = () => {
    setShowToggleFilter(!showToggleFilter)
  }

  useEffect(() => {
    if (showToggleFilter) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showToggleFilter]);

  return (
    <section className='relative overflow-hidden py-6'>

      <div className='max-w-[91%] mx-auto grid grid-cols-12 gap-7'>
        {/*============== Filter Options ==============*/}
        <section className='hidden lg:block  col-span-3 ' >
          <Filter />
        </section>

        {/*============== Foods Banner ==============*/}
        <section className='col-span-12 lg:col-span-9 '>

          <div >
            <div className='py-6 font-poppins break-all'>
              <h2 className='text-3xl pb-3'>Delicious</h2>
              <p className='line-clamp-3 text-gray-500 '>Welcome to Foodie's Paradise, where your cravings meet convenience. Our curated menu offers a delightful range of cuisines, prepared with the freshest ingredients and delivered right to your doorstep. Whether you're in the mood for a hearty meal or a light snack, we've got you covered.</p>
              <p className='pt-5 line-clamp-2 text-gray-500 '>Our mission is to bring the joy of dining to your home with just a few clicks. Browse through our extensive selection, customize your order, and enjoy exclusive deals and discounts. Your next delicious meal is just a tap away!</p>
            </div>
            <div className='bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${img.img8})` }}>
              <div className=' flex flex-col items-center justify-center gap-3  min-w-40 w-[90%] min-h-48 font-poppins'>
                <span className='text-orange-400 border-[1px] border-orange-400  px-5 py-1 tracking-widest'>GET DISCOUNT</span>
                <span className='text-white text-3xl'>Weekend Offer</span>
                <span><Link className='px-3 py-1 bg-orange-400 text-white text-sm rounded-full'>ORDER NOW</Link></span>
              </div>
            </div>
          </div>

          <div >
            <ListFoods toggleFilter={toggleFilter} />
          </div>

        </section>
      </div>

      {/*============== Toggling Filter ==============*/}
      < div className={`overflow-scroll  border-y-[1px] border-gray-400  h-screen w-[80%] sm:w-[50%] md:w-[40%] bg-white px-4 pt-28 pb-14 duration-500 fixed overflow-y-auto top-0 ${showToggleFilter ? "right-0" : 'right-[-100%] '}`} >
        <TogglingFilter toggleFilter={toggleFilter} />
      </div>


    </section>
  )
}

export default React.memo(Menu)