import { NavLink, useParams } from 'react-router';
import CategoryProducts from '@/components/CategoryProducts';
import { TbCategoryFilled } from "react-icons/tb";
import { useState } from 'react';


function Category() {
    
    const categories = ['Smartphones','Tablets','Mobile-Accessories','Laptops','Men\'s Watches','Women\'s Watches'];
    const {name} = useParams();
    const [openCategory, setOpenCategory] = useState(false)


  return (
    <div className='lg:max-w-10/12 m-auto items-center max-lg:px-3.5 mt-10 lg:mb-20'>

      <div className='title'>
        <h1 className='lg:text-2xl font-bold mb-8'>Products by Category: <span className='text-primary'>{name.toUpperCase()}</span></h1>
      </div>

    <div className='Content flex max-lg:flex-col max-lg:gap-5 max-lg:mb-10'>
{/* choose category */}
    <div className='category relative flex max-lg:flex-col max-lg:gap-10'>

    <div className='lg:hidden flex gap-2 items-center group cursor-pointer w-fit mb-2' onClick={()=> setOpenCategory(!openCategory)}>
    <h1 className='font-bold text-xl'>Category</h1>
    <TbCategoryFilled className='lg:hidden group-hover:rotate-180 group-active:rotate-180 transition-all duration-150' size='25'/>
    </div>

    {/* category in mobileScreen */}
    {openCategory &&
    <div className='lg:hidden w-screen h-screen bg-black/40 fixed z-40 top-0 left-0' onClick={()=> setOpenCategory(false)}>

    <ul className='absolute top-1/2 -translate-y-1/2 z-50 bg-background border w-full p-2 rounded-2xl'>
      {categories.map((p,index)=>{
        return(
          <NavLink to={`${p.toLocaleLowerCase()}`} className={({isActive})=>{return isActive? '*:bg-primary text-white':''}} key={index}>
          <li className='p-3 border-b-1 border-primary  bg-background hover:text-white hover:bg-primary hover:border-white rounded-lg hover:translate-x-1 transition-all duration-200 hover:border-b-primary' key={index}onClick={()=> setOpenCategory(false)} >{p}</li>
          </NavLink>
        )
      })}
      </ul>
      </div> 
      }

      {/* category in BigScreen */}

        <ul className=' bg-background p-2 rounded-2xl max-lg:hidden'>
      {categories.map((p,index)=>{
        return(
          <NavLink to={`${p.toLocaleLowerCase()}`} className={({isActive})=>{return isActive? '*:bg-primary text-white':''}} key={index}>
          <li className='p-3 border-b-1 border-primary mb-1  bg-background hover:text-white hover:bg-primary hover:border-white rounded-lg hover:translate-x-1 transition-all duration-200 hover:border-b-primary' key={index}onClick={()=> setOpenCategory(false)} >{p}</li>
          </NavLink>
        )
      })}
      </ul>

    </div>

    {/* products */}
      <div className='relative flex-1'>
      <CategoryProducts/>
      </div>

</div>
    </div>
  )
}

export default Category