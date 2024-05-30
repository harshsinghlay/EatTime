import React, { useState , useEffect } from 'react'
import DashboardOptions from './DashboardOptions';
import { Outlet } from 'react-router';


function Dashboard() {
    const [showDashboardOptions, setShowDashboardOptions] = useState(false)

    const toggleDashboardOptions = () => {
        setShowDashboardOptions(!showDashboardOptions)
    }

    useEffect(() => {
        if (showDashboardOptions) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
        return () => {
          document.body.classList.remove('no-scroll');
        };
      }, [showDashboardOptions]);

    return (
        <section className='relative bg-gray-100'>

            <div className='max-w-[91%] mx-auto grid grid-cols-12 gap-7 py-10'>

                {/*========= DashBoard Options =========*/}
                <section className='hidden lg:block col-span-3 my-8 rounded-lg bg-white shadow-lg overflow-hidden' >
                    <DashboardOptions />
                </section>

                {/*========= Toggling Dashboard Options =========*/}
                < section className={`overflow-y-scroll border-[1px] border-gray-400  h-[100vh] w-[75%] sm:w-[50%] md:w-[40%] bg-gray-100 lg:rounded-lg lg:shadow-md duration-500 absolute top-0 ${showDashboardOptions ? "left-0 " : 'left-[-100%] '}`} >
                    <DashboardOptions  />
                </section>

                {/*========= Content Of Dashbord Links =========*/}
                <section className='col-span-12 lg:col-span-9 '>
                    <main>
                        <Outlet context={toggleDashboardOptions} />
                    </main>
                </section>
            </div>


        </section>
    )
}

export default Dashboard