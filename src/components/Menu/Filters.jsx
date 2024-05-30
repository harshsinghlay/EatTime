import React, { useEffect, useState, useMemo } from 'react'
import { IoIosArrowDown, IoStarSharp, LiaRupeeSignSolid } from '../../assets/icons/icons';
import { applyFilters } from '../../redux/features/food/foodsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

function Filters() {
  const { selectedCat } = useParams();
  const sortingOrder = useSelector(state => state.foods.sortingOrder);
  const dispatch = useDispatch();
  const categories = useMemo(() => [
    {
      Head: "Veg",
      foodCategories: [
        "burger",
        "pizza",
        "bread",
        "chocolate",
        "dessert",
        "drink",
        "sandwich",
        "ice cream"
      ],
    },
    {
      Head: "Non-Veg",
      foodCategories: [
        "bbq",
        "sausage",
        "steak",
        "pork",
        "fried chicken"
      ],
    },
  ], []);

  const initialCategories = [
    "burger",
    "pizza",
    "bread",
    "chocolate",
    "dessert",
    "drink",
    "sandwich",
    "ice cream",
    "bbq",
    "sausage",
    "steak",
    "pork",
    "fried chicken"
  ];

  const [filteredCategories, setFilteredCategories] = useState(initialCategories);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [priceRange, setPriceRange] = useState({
    minimum: 0,
    maximum: 1000,
  });

  const resetFilters = () => {
    setFilteredCategories(initialCategories);
    setFilteredRatings([]);
    setPriceRange({
      minimum: 0,
      maximum: 1000,
    });
  };

  useEffect(() => {
    setFilteredCategories(
      selectedCat ?
        [selectedCat] :
        initialCategories
    );
  }, [selectedCat]);

  useEffect(() => {
    dispatch(applyFilters({
      priceRange: priceRange,
      categories: filteredCategories,
      minimumRate: filteredRatings.length > 0 ? Number(Math.max(...filteredRatings)) : 0,
    }));
    console.log("Filtered categories are ", filteredCategories);
  }, [priceRange, filteredCategories, filteredRatings, sortingOrder]);

  const handleCategoriesCheck = (checked, category) => {
    if (checked) {
      setFilteredCategories(previousCategories => [...previousCategories, category]);
    } else {
      setFilteredCategories(previousCategories => previousCategories.filter(catValue => catValue !== category));
    }
  };

  const handleRatingsCheck = (checked, rating) => {
    if (checked) {
      setFilteredRatings(previousRatings => [...previousRatings, rating]);
    } else {
      setFilteredRatings(previousRatings => previousRatings.filter(ratValue => ratValue !== rating));
    }
  };

  const handlePriceRange = (type, value) => {
    if (type === 'max') {
      setPriceRange(previousPriceRange => ({
        minimum: previousPriceRange.minimum,
        maximum: value
      }));
    }
    if (type === 'min') {
      setPriceRange(previousPriceRange => ({
        minimum: value,
        maximum: previousPriceRange.maximum
      }));
    }
  };

  const [openIndex, setOpenIndex] = useState(null);
  const toggleSubmenu = index => {
    setOpenIndex(index === openIndex ? null : index);
  };


  return (
    <section className='py-4 lg:py-6'>

      <div className=' flex flex-col gap-5 lg:gap-7 '>

        {/*=========== Filter By Category ===========*/}
        <section className='font-poppins border-[1px] border-gray-200'>
          <div className='bg-gray-100 text-base xl:text-lg  py-3 px-4 '>Shop By Categories</div>
          <ul className='bg-white py-2'>
            {categories.map((item, index) => (
              <li key={index}>
                {/*======== Categories Heading ========*/}
                <div className=' flex justify-between items-center py-1 px-4'
                  onClick={() => toggleSubmenu(index)}>
                  <h1 className='cursor-pointer text-gray-700 font-poppins select-none'>{item.Head}</h1>
                  {item.foodCategories && <span className={`${openIndex === index ? 'rotate-180 duration-300' : ''}`}><IoIosArrowDown /></span>}
                </div>
                {/*======== Categories Subheading ========*/}
                {openIndex === index && (
                  <div >
                    <ul className='flex flex-col gap-1 py-2 px-6'>
                      {item.foodCategories.map((category, index) => (
                        <li className='font-poppins active:font-semibold text-gray-600 flex items-center gap-2' key={index}>
                          <input type="checkbox"
                            value={category}
                            id={category}
                            checked={filteredCategories.includes(category)}
                            defaultChecked
                            onChange={(e) => handleCategoriesCheck(e.target.checked, category)
                            }
                          />
                          <label className='select-none' htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                        </li>
                      ))}
                    </ul>
                  </div>)}
              </li>
            ))}
          </ul>
        </section>

        {/*=========== Other Filter Options ===========*/}
        <section className='font-poppins bg-white border-[1px] border-gray-200 '>
          <div className='bg-gray-100 text-base xl:text-lg py-3 px-4'>Filter By</div>

          <section className='px-4 py-3 border-b-2 border-gray-200'>
            {/* <div>
              <p className='text-sm font-semibold pb-1'>Availability</p>
            </div>
            <div>
              <ul >
                <li className='flex items-center gap-2'><input type="checkbox" name="" id="" /><span>In Stock</span></li>
                <li className='flex items-center gap-2'><input type="checkbox" name="" id="" /><span>Out of Stock</span></li>
              </ul>
            </div> */}
            <div>
              <p className='text-sm font-semibold pb-1'>Rating</p>
            </div>
            <div>
              <ul >
                {[4, 3, 2, 1].map((value) => (
                  <li key={value} className='flex items-center gap-2 '><input type="checkbox" id={`${value}star`}
                    checked={filteredRatings.includes(value)}
                    onChange={(e) => handleRatingsCheck(e.target.checked, value)} /><label htmlFor={`${value}star`} className='flex items-center select-none'>{value} <span><IoStarSharp className='text-xs mx-1' /></span> & above</label></li>
                ))}
              </ul>
            </div>
          </section>

          <section className='px-4 py-3 border-b-2 border-gray-200'>
            <div>
              <p className='text-sm font-semibold pb-1'>Price</p>
            </div>
            <div>
              <div className='flex gap-1 w-full'>
                <div className='flex items-center gap-1 w-[50%]'>
                  <span><LiaRupeeSignSolid className='inline text-xl'/></span >
                  <span>
                    <input className='border-[1px] borer-gray-100 w-[85%] p-1' type="number" name="" id="" placeholder='From'
                      value={priceRange.minimum} onChange={(e) => handlePriceRange("min", e.target.value)}
                    />
                  </span>
                </div>
                <div className='flex items-center gap-1 w-[50%]'>
                <span><LiaRupeeSignSolid className='inline text-xl'/></span >
                  <span>
                    <input className='border-[1px] borer-gray-100 w-[85%] p-1' type="number" name="" id="" placeholder='To'
                      value={priceRange.maximum} onChange={(e) => handlePriceRange("max", e.target.value)}
                    />
                  </span>
                </div>
              </div>
              {/* <div className='w-[90%] mx-auto pt-4'>
                <input className='w-full' type="range" name="" id="" />
              </div> */}
            </div>
          </section>

          <section className='px-4 py-3 border-b-2 border-gray-200'>
            <section className='font-poppins flex gap-6'>
              {/* <button className=' px-4 py-1 text-sm xl:px-7  xl:py-2 bg-gray-300 rounded-sm '>Apply</button> */}
              <button onClick={resetFilters} className=' px-4 py-1 text-sm xl:px-7  xl:py-2 bg-gray-300 rounded-sm '>Reset </button>
            </section>
          </section>

        </section>

      </div>

    </section>
  )
}

export default React.memo(Filters)