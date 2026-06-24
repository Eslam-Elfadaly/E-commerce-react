
import { useEffect, useState } from 'react';
import api from '@/services/apiContext';
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Link, useParams } from 'react-router';
import {  useDispatch } from 'react-redux'
import { addToCart } from '@/store/CartSlice';
import { addToFavorite, removeFromFavorite } from '@/store/FavoriteSlice';

function CategoryProducts() {
  const{name} = useParams();
    const [products, setProducts] = useState([]); 
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
    const getDate = async ()=>{
      try{
        setIsLoading(true)
        const res = await api.get(`${name}`)
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
},[name])

const dispatch = useDispatch();

// addToCart
function handleAddToCart(id, title, price, image ,discountPercentage, rating, availability){
    dispatch(addToCart({id, title, price, image, discountPercentage, rating, availability}))
  }


const favorite = useSelector((p)=> p.favoriteStore.favorite)

    function handleAddToFavorite(id, image, title, category, brand, status, price, rating){
      dispatch(addToFavorite({id, image, title, category, brand, status, price, rating}))
    } 
  
    // removeFromFavorite
    function handleRemoveFromFavorite(id){
        dispatch(removeFromFavorite({id}))
    }
   
if(isLoading){
  return (
    <div className='w-full h-full  bg-black/5'>
      <Button  size="lg" className='absolute top-1/2 left-1/2 -translate-1/2 bg-primary'>
        Loading Products
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
  )
}

if(products.length === 0){
  return(
    <div className='w-full h-full flex flex-col gap-2 text-center items-center justify-center bg-black/5'>
      <h1 className='text-xl  font-bold'>No Product Available</h1>
      <p className='text-lg'>We're sorry, but there are no products matching on <span className='text-red-500'>{name.toUpperCase()}</span> criteria at the moment.</p>
      <p className='flex gap-2 items-center text-red-500 text-lg animate-pulse'><Spinner data-icon="inline-start" />We're restocking shortly</p>
    </div>
  )
}
  return (
    <div>
      <ul className='grid lg:grid-cols-4 max-lg:grid-cols-2 lg:gap-9 max-lg:gap-4 lg:px-8 '>
        {products.map((p)=>{
          return(
            <li key={p?.id} className=' product-card lg:pt-3 shadow-xl  rounded-2xl flex flex-col group relative overflow-hidden  hover:shadow-xl active:shadow-xl hover:-translate-y-2 active:-translate-y-1 transition-all duration-300 cursor-pointer '>

              <div className='flex justify-center'>
              <Link to={`/product/${p?.id}`}><img src={p?.images[0]}  alt="" className='size-44 py-3 group-hover:scale-115 transition-all duration-300'/></Link>
              </div>

             <div className='love&view flex flex-col gap-1.5 absolute top-3 lg:right-3 right-3 transition-all duration-300'>
                                 <div className={`p-1 hover:text-primary transition-all duration-300 ${favorite.find((f)=> f.id === p.id)? 'text-primary':''} `}><FaHeart className='size-5' onClick={()=>favorite.find((f)=> f.id === p.id)? handleRemoveFromFavorite(p.id) : handleAddToFavorite(p.id, p.images[0], p.title, p.category, p.brand, p.availabilityStatus, p.price, p.rating )}/></div>
                                 <div className='max-lg:hidden p-1 hover:bg-primary hover:text-white transition-all duration-300'><FaEye className='size-5'/></div>
                   </div>

              <div className='p-3 flex flex-col'>
              <h1 className='text-xs font-bold text-gray-500 mb-2'>{p.category.toUpperCase()}</h1>

              <p className='font-bold'>{p.title}</p>

              <div className='description flex items-center justify-between'>
              <h1 className={` w-fit  p-1 flex items-center gap-2 ${p.availabilityStatus === 'In Stock'? 'text-green-700': p.availabilityStatus === 'Low Stock'?'text-yellow-500':'text-red-500'}`}>{p.availabilityStatus}</h1>
              <span className=' text-sm max-lg:text-xs text-foreground p-1.5 rounded-xl flex items-center w-fit gap-1 font-bold border-1 shadow-2xl'>{p.rating}<FaStar color='gold'/></span>
              </div>
              <span className='font-bold text-lg mb-2'>{p.price} $</span>
              <Button className={`text-white  ${p.availabilityStatus === 'Out of Stock'? 'cursor-not-allowed bg-primary/50':'cursor-pointer'}`} onClick={(e)=> {
                    if(p.availabilityStatus === 'Out of Stock'){
                      e.preventDefault() 
                    }else{
                      handleAddToCart(p.id, p.title, p.price, p.images[0], p.discountPercentage, p.rating, p.availabilityStatus);
                    } 
                  }}>Add To Cart <FaShoppingCart/></Button>
              </div>
              </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryProducts


