import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {  useDispatch } from 'react-redux'
import { addToCart } from '@/store/CartSlice';
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '@/store/FavoriteSlice';
import { Link } from "react-router";

function ProductCard({product}) {

  const dispatch = useDispatch();

  function handleAddToCart(id, title, price, image ,discountPercentage, rating, availability){
    dispatch(addToCart({id, title, price, image, discountPercentage, rating, availability}))
  }

const favorite = useSelector((p)=> p.favoriteStore.favorite)

    //addToFavorite
    function handleAddToFavorite(id, image, title, category, brand, status, price, rating){
      dispatch(addToFavorite({id, image, title, category, brand, status, price, rating}))
    } 
  
    // removeFromFavorite
    function handleRemoveFromFavorite(id){
        dispatch(removeFromFavorite({id}))
    }

    

    
  return (
    <li className=' rounded-2xl flex flex-col group relative overflow-hidden shadow-primary shadow-xl hover:shadow-2xl active:shadow-2xl hover:-translate-y-2 active:-translate-y-1 transition-all duration-300 cursor-pointer'>

              <Link to={`/product/${product.id}`}  className='flex justify-center'>
              <img src={product?.images[0]} alt={product?.title} className='size-44 py-3 group-hover:scale-115 transition-all duration-300'/>
              </Link>

               <div className='love&view flex flex-col gap-1.5 absolute top-3 lg:right-3 right-3 transition-all duration-300'>
                    <div className={`p-1 hover:text-primary transition-all duration-300 ${favorite.find((f)=> f.id === product.id)? 'text-primary':''} `}><FaHeart className='size-5' onClick={()=>favorite.find((f)=> f.id === product.id)? handleRemoveFromFavorite(product.id) : handleAddToFavorite(product.id, product.images[0], product.title, product.category, product.brand, product.availabilityStatus, product.price, product.rating )}/></div>
                    <div className='max-lg:hidden p-1 hover:text-primary transition-all duration-300'><FaEye className='size-5'/></div>
                </div>
    
              <div className='p-3 flex flex-col'>
              <h1 className='text-xs font-bold text-gray-500 mb-2'>{product.category.toUpperCase()}</h1>

              <p className='font-bold'>{product?.title}</p>

              <div className='description flex items-center justify-between'>
              <h1 className={` w-fit  p-1 flex items-center gap-2 ${product.availabilityStatus === 'In Stock'? 'text-green-700': product.availabilityStatus === 'Low Stock'?'text-yellow-500':'text-red-500'}`}>{product.availabilityStatus}</h1>
              <span className=' text-sm max-lg:text-xs text-foreground p-1.5 rounded-xl flex items-center w-fit gap-1 font-bold border-1 shadow-2xl'>{product?.rating}<FaStar color='gold'/></span>
              </div>
              <span className='font-bold text-lg mb-2'>{product?.price} $</span>

              <Button className={`text-white  ${product.availabilityStatus === 'Out of Stock'? ' cursor-not-allowed bg-primary/50':'cursor-pointer'}`} onClick={(e)=> {
                    if(product.availabilityStatus === 'Out of Stock'){
                      e.preventDefault() 
                    }else{
                      handleAddToCart(product.id, product.title, product.price, product.images[0], product.discountPercentage, product.rating, product.availabilityStatus);
                    }
                  }}>Add To Cart <FaShoppingCart/></Button>
              </div>
              </li>
  )
}

export default ProductCard