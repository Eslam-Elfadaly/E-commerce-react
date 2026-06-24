// blogs
import blog1 from '@/assets/46337e7fdcb85e58ec7f05bda7f6cba6fd9bb806-820x580.webp'
import blog2 from '@/assets/467c6b11b2b22d1d3823289b3e3c498097c0fe66-820x580.webp'
import blog3 from '@/assets/155da172677166e565ec4aad95efb3855769d293-820x580.webp'
import blog4 from '@/assets/07d0227deaebc8aca5dca95f2eb917ba73e329b5-820x580.webp'

import { NavLink } from 'react-router'
import { Calendar } from 'lucide-react';


function Blog() {

  return (
    <>
    <div className='lg:max-w-10/12 m-auto items-center max-lg:px-3.5 mt-10 lg:mb-20'>
    <h1 className='lg:text-3xl text-2xl font-bold mb-8'>Our Blogs</h1>

    <ul className='grid lg:grid-cols-4 gap-4 justify-center max-lg:mb-10'>
        <NavLink to='/blog/Lifestyle' className='hover:border-primary bg-background active:border-primary border-2 rounded-xl transition-all duration-300'>
          <li >
            <img src={blog1} alt="" className='rounded-t-xl'/>
            <div className='lg:p-4  max-lg:p-4'>
            <div className='flex items-center gap-5  lg:text-sm font-bold *:transition-all *:duration-200 mb-4'>
              <span className='text-primary border-b-2 border-gray-400 hover:border-primary active:border-primary'>Lifestyle</span>
              <span className='flex items-center gap-1 border-b-2 border-gray-400 text-gray-400 hover:text-primary hover:border-primary active:text-primary active:border-primary'><Calendar className='size-4'/>February 19, 2025</span>
            </div>
            <p className='font-bold max-lg:text-lg text-lg hover:text-primary active:text-primary transition-all duration-200'>Office rental agency or direct? Which is best when renting an...</p>
            </div>
          </li>
          </NavLink>

        <NavLink to='/blog/SocialMedia' className='hover:border-primary bg-background active:border-primary border-2 rounded-xl transition-all duration-300'>
          <li >
            <img src={blog2} alt="" className='rounded-t-xl'/>
            <div className='lg:p-4 max-lg:p-4'>
            <div className='flex items-center lg:text-sm gap-5 font-bold *:transition-all *:duration-200 mb-4'>
              <span className='text-primary border-b-2 border-gray-400 hover:border-primary active:border-primary'>Social Media</span>
              <span className='flex items-center gap-1 border-b-2 border-gray-400 text-gray-400 hover:text-primary hover:border-primary active:text-primary active:border-primary'><Calendar className='size-4'/>February 19, 2025</span>
            </div>
            <p className='font-bold max-lg:text-lg text-lg hover:text-primary active:text-primary transition-all duration-200'>Lotus Electronics – New Store Launch in Bhilai, Chhattisgarh</p>
            </div>
          </li>
          </NavLink>

        <NavLink to='/blog/CompanyNews' className='hover:border-primary bg-background active:border-primary border-2 rounded-xl transition-all duration-300'>
          <li >
            <img src={blog3} alt="" className='rounded-t-xl'/>
            <div className='lg:p-4 max-lg:p-4'>
            <div className='flex items-center lg:text-sm gap-5 font-bold  *:transition-all *:duration-200 mb-4'>
              <span className='text-primary border-b-2 border-gray-400 hover:border-primary active:border-primary'>Company News</span>
              <span className='flex items-center gap-1 border-b-2 border-gray-400 text-gray-400 hover:text-primary hover:border-primary active:text-primary active:border-primary'><Calendar className='size-4'/>February 19, 2025</span>
            </div>
            <p className='font-bold max-lg:text-lg text-lg hover:text-primary active:text-primary transition-all duration-200'>We Invite You to These Wonderful Wine Tasting Events</p>
            </div>
          </li>
          </NavLink>

        <NavLink to='/blog/Electronics' className='hover:border-primary bg-background active:border-primary border-2 rounded-xl transition-all duration-300'>
          <li >
            <img src={blog4} alt="" className='rounded-t-xl'/>
            <div className='lg:p-4 max-lg:p-4'>
            <div className='flex items-center lg:text-sm gap-5 font-bold *:transition-all *:duration-200 mb-4'>
              <span className='text-primary border-b-2 border-gray-400 hover:border-primary active:border-primary'>Electronics</span>
              <span className='flex items-center gap-1 border-b-2 border-gray-400 text-gray-400 hover:text-primary hover:border-primary active:text-primary active:border-primary'><Calendar className='size-4'/>February 19, 2025</span>
            </div>
            <p className='font-bold max-lg:text-lg text-lg hover:text-primary active:text-primary transition-all duration-200'>10 French Wine Regions to Visit for Amazing Views and Del...</p>
            </div>
          </li>
          </NavLink>

      </ul>
    </div>
    </>
  )
}

export default Blog