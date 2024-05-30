import React from 'react'
import { RxCross1 } from '../../assets/icons/icons'
import Filter from './Filters'

function TogglingFilter({ toggleFilter }) {
    return (
        <div>

            {/*=========== Button To toggle Filters ===========*/}
            <section className='flex items-center font-poppins'>
                <div className='text-center grow'>
                    <p>Filter Products</p>
                    <p className='text-sm'>Showing 19 of 19 products</p>
                </div>
                <div >
                    <button onClick={toggleFilter} className='text-2xl'><RxCross1 /></button>
                </div>
            </section>

            {/*=========== All Filters ===========*/}
            <section>
                <Filter />
            </section>

        </div>


    )
}

export default React.memo(TogglingFilter)