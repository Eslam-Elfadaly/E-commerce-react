import homeImage1 from '@/assets/MGF94.png'
import { FaArrowRight } from "react-icons/fa";
import { Link, NavLink } from 'react-router';
import { TbCarFilled } from "react-icons/tb";
import { FaCodeCompare } from "react-icons/fa6";

import { Calendar } from 'lucide-react';
import { BiSupport } from "react-icons/bi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useState, useEffect } from 'react';
import api from '@/services/apiContext';
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';

// brands
import apple from '@/assets/bcb3220b05dedafc17cd1a1531ccec1abcdfbd75-920x920.webp'
import sumsung from '@/assets/Samsung-Logo-2-500x281.png'
import lenovo from '@/assets/lenovo-logo-png_seeklogo-83310.png'
import huawei from '@/assets/77af7df4b4e9b3500115d1abfd120c0180f047fe-300x168.webp'

// blogs
import blog1 from '@/assets/46337e7fdcb85e58ec7f05bda7f6cba6fd9bb806-820x580.webp'
import blog2 from '@/assets/467c6b11b2b22d1d3823289b3e3c498097c0fe66-820x580.webp'
import blog3 from '@/assets/155da172677166e565ec4aad95efb3855769d293-820x580.webp'
import blog4 from '@/assets/07d0227deaebc8aca5dca95f2eb917ba73e329b5-820x580.webp'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ProductCard from '@/components/ProductCard';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";


gsap.registerPlugin(useGSAP, ScrollTrigger);

function Home() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const homeCategories = ['SmartPhones', 'Tablets', 'Mobile-Accessories', 'Laptops'] 
    const [categoryName, setCategoryName] = useState('Mobile-Accessories');

    // const [username, setuseName] = useState('');

    useEffect(()=>{
    const getDate = async ()=>{
      try{
        setIsLoading(true)
        const res = await api.get(`${categoryName}`)
        setProducts(res.data.products)
      }
      catch(error){
        console.log(error)
      }finally{
        setIsLoading(false)
      }

    };
    getDate();
},[categoryName])


// scroll To Top

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log("USER:", user);
  });

  return unsubscribe;
}, []);
  return (
<>
{/* mainPhoto */}

<div className='landPart relative overflow-hidden lg:flex max-lg:h-[230px] h-[500px] max-lg:relative mb-10 bg-black shadow-2xl'>  
      <StarsBackground />
    <img src={homeImage1} alt="" className=' max-lg:size-80 max-lg:scale-95 absolute lg:top-1/3 lg:right-20 max-lg:-right-20 max-lg:top-3/7 '/>

 <div className='absolute  lg:h-[500px] lg:p-20 lg:w-1/2  inset-0  p-4  flex lg:justify-center flex-col'>
          <p className='font-extrabold lg:font-bold text-[21px] lg:text-4xl  text-white lg:mt-9  mt-5  mb-4'>From Smartphones to Smart Homes, Everything Tech in One Place.</p>
          <Link to='/shop'><button className='cursor-pointer flex items-center gap-4 bg-white w-fit text-black font-bold rounded-md lg:px-4 lg:py-2 px-3 py-1 hover:bg-black hover:text-white active:bg-black active:text-white transition-all duration-200'>Explore Shop  <FaArrowRight className='animate-pulse'/></button></Link>
          </div>
</div>

{/* ChooseCategory */}
<ul className='ChooseCategory lg:flex max-lg:grid max-lg:grid-cols-2 justify-center lg:max-w-10/12 m-auto max-lg:px-3.5 flex-wrap items-center gap-4 max-lg:mb-5'>
  {homeCategories.map((p, index)=>{
    return(
      <li key={index} onClick={()=>setCategoryName(p)}><Button variant='outline' className={`border-black max-lg:w-full hover:bg-foreground dark:hover:bg-foreground ${categoryName === p? 'bg-foreground dark:bg-foreground text-background':''} hover:text-background p-4 text-md cursor-pointer`}>{p}</Button></li>
    )
  })}
    </ul>

{/* home Content */}

<div className='w-full py-5 lg:py-15'>

{/*Loading & products */}
    {isLoading? 
    <div className='w-full h-full flex items-center justify-center my-15'>
      <Button  size="lg" className=' bg-primary'>
        Loading Products
        <Spinner data-icon="inline-start" />
      </Button>
    </div> :

     <ul className='products lg:max-w-10/12 m-auto max-lg:px-3.5 grid lg:grid-cols-4 max-lg:grid-cols-2 lg:gap-7 max-lg:gap-4 mb-20'>
            {products.map((p)=>{
              return(
                <ProductCard key={p?.id} product={p}/>
              )
            })}
      </ul>
     }

{/* Brands */}

     <div className='Brands lg:max-w-10/12 m-auto max-lg:px-3.5 mb-20 '>

      <div className=' flex items-center justify-between mb-7'>
        <h1 className='text-3xl max-lg:text-2xl font-bold text-foreground'>Shop By Brands</h1>
        <Link to='/shop'><span className='text-primary text-xl max-lg:text-lg font-bold cursor-pointer hover:text-primary'>View all</span></Link>
      </div>
      <div className='rounded-2xl lg:flex flex-wrap bg-card lg:py-5 max-lg:p-5 max-lg:grid max-lg:grid-cols-2 max-lg:**:w-full max-lg:gap-3 lg:justify-around'>
        <NavLink to='/shop' state={{brand:'Sumsung'}}><img src={sumsung} alt="sumsung" className='rounded-xl hover:shadow-xl hover:-translate-y-1 active:-translate-y-1  active:shadow-xl transition-all duration-200 size-40 max-lg:size-30 bg-background p-5'/></NavLink>
        <NavLink to='/shop' state={{brand:'Apple'}}><img src={apple} alt="apple" className='rounded-xl hover:shadow-xl hover:-translate-y-1 active:-translate-y-1  active:shadow-xl transition-all duration-200 size-40 max-lg:size-30 bg-background p-5'/></NavLink>
        <NavLink to='/shop' state={{brand:'Lenovo'}}><img src={lenovo} alt="lenovo" className='rounded-xl hover:shadow-xl hover:-translate-y-1 active:-translate-y-1  active:shadow-xl transition-all duration-200 size-40 max-lg:size-30 bg-background p-5'/></NavLink>
        <NavLink to='/shop' state={{brand:'Huawei'}}><img src={huawei} alt="huawei" className='rounded-xl hover:shadow-xl hover:-translate-y-1 active:-translate-y-1  active:shadow-xl transition-all duration-200 size-40 max-lg:size-30 bg-background p-5'/></NavLink>
      </div>

     </div>

{/* LatestBlog */}

     <div className="LatestBlog lg:max-w-10/12 m-auto max-lg:px-3.5">

      <h1 className='text-3xl max-lg:text-2xl font-bold text-foreground mb-7'>Latest Blog</h1>

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

</div>



    <ul className='lg:max-w-10/12 m-auto max-lg:px-3.5 grid grid-cols-4 max-lg:grid-cols-2 gap-6 *:p-1 mb-15 mt-15'>
      
      <li className='text-foreground flex items-center gap-4'>
        <TbCarFilled className='size-12'/>
        <div>
          <h1 className='font-bold'>Free Delivery</h1>
          <p>Free shipping over $100</p>
        </div>
      </li>

      <li className='text-foreground flex items-center gap-4'>
        <FaCodeCompare className='size-9'/>
        <div>
          <h1 className='font-bold'>Free Return</h1>
          <p>Free shipping over $100</p>
        </div>
      </li>

      <li className='text-foreground flex items-center gap-4'>
        <BiSupport className='size-12'/>
        <div>
          <h1 className='font-bold'>Customer Support</h1>
          <p>Friendly 27/7 customer support</p>
        </div>
      </li>

      <li className='text-foreground flex items-center gap-4'>
        <AiFillSafetyCertificate className='size-12'/>
        <div>
          <h1 className='font-bold'>Money Back </h1>
          <p>Quality checked by our team</p>
        </div>
      </li>
      
      
    </ul>

</>
  )
}


export default Home