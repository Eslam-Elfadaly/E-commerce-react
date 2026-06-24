import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { BiSolidDownArrow } from "react-icons/bi";
import { Button } from "@/components/ui/button"
import ProductCard from '@/components/ProductCard';
import api from '@/services/apiContext';
import { useLocation } from 'react-router';

function Shop() {
  const categories = ['Smartphones','Tablets','Mobile-Accessories','Laptops','Men\'s Watches','Women\'s Watches'];
  const brands = ['Samsung', 'Apple', 'Realme', 'Vivo','Amazon',"SnapTech","ProVision","Huawei","Lenovo"];
  
  const [products, setProducts] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [asNeed, setAsNeed] = useState({category:'Mobile-Accessories', brand:''});
  
  const [openCategory, setOpenCategory] = useState(false)
  
     const [openBrand, setOpenBrand] = useState(false)
    
     const location = useLocation();
     
  useEffect(()=>{
    if(location.state?.brand){
      setAsNeed((prev)=> ({...prev, brand:location.state.brand}))
    };
  
  },[location.state])

    useEffect(()=>{
    const getDate = async ()=>{
      try{
        setIsLoading(true)
        const res = await api.get(`${asNeed.category === '' && asNeed.brand === ''? 'tablets': `${asNeed.category.toLowerCase()}`}`)
        setProducts(res.data.products)
        console.log(res.data)
      }
      catch(error){
        console.log(error)
      }finally{
        setIsLoading(false)
      }

    };
    getDate();
},[asNeed.category, asNeed.brand]);





  return (
    <>
  <div className='w-full py-5 lg:py-10'>

    <div className='lg:max-w-10/12 m-auto max-lg:px-3.5'>
    
    <h1 className='lg:text-2xl max-lg:text-xl text-primary font-bold mb-5 underline'>Get the products as your needs</h1>

{/* choose category & brand */}

    <div className='flex max-lg:flex-col gap-5'>

      <div className='flex lg:flex-col gap-5'>
        {/* catogires */}

        {/* catogires on Desktop */}
        <div className='max-lg:hidden flex flex-col gap-2 bg-background  p-5 rounded-2xl shadow'>
          <h1 className='text-xl font-bold mb-2'>Product Categories</h1>
          <RadioGroup value={asNeed.category} onValueChange={(value)=> {setAsNeed((prev)=> ({...prev,category:value})); console.log(value)}} className="w-fit">
          {categories.map((p, index)=>{
            return(
                <div key={index} className="flex items-center gap-3">
                   <RadioGroupItem value={p} className='border-foreground border-2' id={`r${index}`} />
                   <Label className='text-lg font-normal' htmlFor={`r${index}`}>{p}</Label>
                 </div>
            )
          })}
          </RadioGroup>
        <h1 className='font-bold underline' onClick={()=> setAsNeed({...asNeed, category:''})}>Reset Selection</h1>
        </div>

        {/* catogires on Mobile */}
        
        <div className='lg:hidden flex gap-1 items-center group cursor-pointer w-fit mb-2' onClick={()=> setOpenCategory(!openCategory)}>
            <h1 className='font-bold text-xl'>Categories</h1>
            <BiSolidDownArrow className='lg:hidden animate-pulse group-hover:rotate-180 group-active:rotate-180 transition-all duration-700' size='20'/>
        </div>
        
        {openCategory && <div className='lg:hidden w-screen h-screen bg-black/40 fixed z-40 top-0 left-0' onClick={()=> setOpenCategory(false)}>
         <div className='absolute top-1/4 z-50 bg-background border w-full p-3 rounded-2xl' onClick={(e)=>e.stopPropagation()}>
        <RadioGroup value={asNeed.category} onValueChange={(value)=> {setAsNeed((prev)=> ({...prev,category:value})); setTimeout(()=>{setOpenCategory(false)},100)}} className="w-full mb-3 flex flex-col gap-4">
          {categories.map((p, index)=>{
            return(
                <div key={index} className="flex items-center gap-3 w-full" >
                   <RadioGroupItem value={p} className='border-foreground border-2' id={`r${index}`} />
                   <Label className='text-lg font-normal flex-1' htmlFor={`r${index}`}>
                    {p}
                    </Label>
                 </div>
            )
          })}
          </RadioGroup>
        <h1 className='font-bold text-lg underline' onClick={()=> setAsNeed({...asNeed, category:''})}>Reset Selection</h1>
          </div>
        </div>}

        {/* brands */}

        {/* brands on desktop */}
        <div className='max-lg:hidden flex flex-col gap-2 bg-background  p-5 rounded-2xl shadow'>
          <h1 className='text-xl font-bold mb-2'>Brands</h1>
          <RadioGroup value={asNeed.brand} onValueChange={(value)=> {setAsNeed((prev)=> ({...prev,brand:value})); console.log(value)}} className="w-fit">
          {brands.map((p, i)=>{
            return(
                <div key={i} className="flex items-center gap-3">
                   <RadioGroupItem value={p} className='border-foreground border-2' id={`n${i}`} />
                   <Label className='text-lg font-normal' htmlFor={`n${i}`}>{p}</Label>
                 </div>
            )
          })}
          </RadioGroup>
        <h1 className='font-bold underline' onClick={()=> setAsNeed({...asNeed, brand:''})}>Reset Selection</h1>
        </div>

        {/* brands on mobile */}

        <div className='lg:hidden flex gap-1 items-center group cursor-pointer w-fit mb-2' onClick={()=> setOpenBrand(!openCategory)}>
            <h1 className='font-bold text-xl'>Brands</h1>
            <BiSolidDownArrow className='lg:hidden animate-pulse group-hover:rotate-180 group-active:rotate-180 transition-all duration-700' size='20'/>
        </div>
        
        {openBrand &&<div className='lg:hidden w-screen h-screen bg-black/40 fixed z-40 top-0 left-0' onClick={()=>setOpenBrand(false)}>
         <div className='absolute top-1/4 z-50 bg-background border w-full p-3 rounded-2xl' onClick={(e)=>e.stopPropagation()}>
        <RadioGroup value={asNeed.brand} onValueChange={(value)=> {setAsNeed((prev)=> ({...prev,brand:value})); setTimeout(()=>{setOpenBrand(false)},100)}} className="w-full mb-3 flex flex-col gap-3">
          {brands.map((p, index)=>{
            return(
                <div key={index} className="flex items-center gap-3 w-full" >
                   <RadioGroupItem value={p} className='border-foreground border-2' id={`n${index}`} />
                   <Label className='text-lg font-normal flex-1' htmlFor={`n${index}`}>
                    {p}
                    </Label>
                 </div>
            )
          })}
          </RadioGroup>
        <h1 className='font-bold text-lg underline' onClick={()=> setAsNeed({...asNeed, brand:''})}>Reset Selection</h1>
          </div>
        </div>}



      </div>

{/* products */}

<div className='flex-1 '>
        { isLoading ? 
        <div className='w-full h-full flex relative'>
      <Button  size="lg" className='absolute top-1/2 left-1/2 -translate-1/2 bg-primary'>
        Loading Products
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
    : products.length === 0?
    <div className='w-full h-full flex flex-col gap-2 text-center items-center justify-center'>
      <h1 className='text-xl  font-bold'>No Product Available</h1>
      <p className='text-lg'>We're sorry, but there are no products matching on <span className='text-red-500'>{name.toUpperCase()}</span> criteria at the moment.</p>
      <p className='flex gap-2 items-center text-red-500 text-lg animate-pulse'><Spinner data-icon="inline-start" />We're restocking shortly</p>
    </div>
    :
      <ul className='grid lg:grid-cols-3 relative max-lg:grid-cols-2 lg:gap-10 max-lg:gap-4 lg:px-8'>
            
            {asNeed.brand !== ''?
            
            products.find((e)=> e.brand === asNeed.brand)?

            products.filter((e)=> e.brand === asNeed.brand).map((p)=>
              (
                <ProductCard key={p?.id} product={p}/>
              ))
              :
      <div className=' col-start-1 col-end-4 flex flex-col text-center lg:h-150 justify-center items-center  '>
      <h1 className='text-xl  font-bold'>No Product Available In This Brand</h1>
      <p className='text-lg'>We're sorry, but there are no products matching on <span className='text-red-500'>{name.toUpperCase()}</span> criteria at the moment.</p>
      <p className='flex gap-2 items-center text-red-500 text-lg animate-pulse'><Spinner data-icon="inline-start" />We're restocking shortly</p>
       </div>
       :
       products.map((p)=>
            (
              <ProductCard key={p?.id} product={p}/>
            )
            )
        }
      </ul>
      }
    </div>

    </div>
    </div>
    </div>
    </>
  )
}

export default Shop


    

