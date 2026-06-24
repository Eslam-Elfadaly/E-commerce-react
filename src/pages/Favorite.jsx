
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import { Button } from '@/components/ui/button';
import { useSelector } from "react-redux";
import {  useDispatch } from 'react-redux'
import { addToCart } from '@/store/CartSlice';
import { removeAllFavorites, removeFromFavorite } from "@/store/FavoriteSlice";

function Favorite() {

    const dispatch = useDispatch();

    // addToCart
function handleAddToCart(id, title, price, image ,discountPercentage, rating, availability){
    dispatch(addToCart({id, title, price, image, discountPercentage, rating, availability}))
  }

//   removeFromFavorite
function handleRemoveFromFavorite(id){
    dispatch(removeFromFavorite({id}))
}

// removeAllFavorites
function handleRemoveAllFavorites(){
  dispatch(removeAllFavorites())
}

// favorite List
    const favorite = useSelector((p)=> p.favoriteStore.favorite)


    if(favorite.length === 0){
        return(
            <div className="flex items-center justify-center h-90">
                <h1 className="text-xl font-bold text-red-500"> No Favorites</h1>
            </div>
        )
    }
  return (
    <div className="lg:mt-15 mt-8 lg:max-w-10/12 m-auto max-lg:px-3.5">
      <h1 className="font-bold text-2xl lg:mb-3">Favorites</h1>

  {/* favorite in desktop */}
<div className='products max-lg:hidden max-h-[500px] overflow-y-scroll scrollbar-thumb-foreground mb-3'>
<table className=" w-full">
    <thead className="sticky -top-1 z-10 bg-background">
    <tr className=" *:text-star *:p-3 *:text-lg *:text-primary *:border-2">
        <th>Image</th>
        <th>Title</th>
        <th>Category</th>
        <th>Brand</th>
        <th>Status</th>
        <th>Price</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>

            {favorite.map((p)=>{
              return(
                <tr key={p.id} className="*:text-center border-b-2 relative *:px-7 *:border-l-1 *:last:border-r-1">
                        <td className="w-1/7"><img src={p.image} alt="" className="size-30"/> </td>
                        <td>{p.title}</td>
                        <td>{p.category}</td>
                        <td>{p.brand}</td>
                        <td className={`w-1/9 ${p.status === 'In Stock'? 'text-green-700': p.status === 'Low Stock'?'text-yellow-500':'text-red-500'}`}>{p.status}</td>
                        <td className="font-bold">EG {p.price}</td>
                        <td>
                            <Button className={`text-white mb-1 ${p.status === 'Out of Stock'? 'cursor-not-allowed bg-primary/50':'cursor-pointer'} w-full`} onClick={(e)=> {
                            if(p.status === 'Out of Stock'){
                              e.preventDefault() 
                            }else{
                              handleAddToCart(p.id, p.title, p.price, p.image, p.discountPercentage, p.rating, p.status);
                              } 
                            }}>Add To Cart <FaShoppingCart/></Button>

                            <Button className='bg-red-500 w-full hover:bg-red-500/50 cursor-pointer text-white' onClick={()=>handleRemoveFromFavorite(p.id)}>Delete</Button>
                           </td>   
                    </tr>
                )
            })}
            </tbody>
</table>
</div>

{/* favorite in mobile */}

<div className="products lg:hidden overflow-y-scroll max-h-[450px] scrollbar-thumb-foreground mb-3">
  {favorite.map((p)=>{
    return(
    <div key={p.id} className="flex items-center border-b-1  py-5 py-2 border-gray-400">
            <img src={p.image} alt="" className="lg:size-30 max-lg:size-27 shadow-xl bg-card mr-4"/>
    
            <div className="flex-1 flex flex-col gap-4">
    
            <div className="flex items-start justify-between">
    
                <div className="w-full">
                <h1 className="font-bold mb-1 ">{p.title}</h1>
    
                <div className="flex justify-between">
    
                <div className="flex gap-3">
                <span className={` ${p.status === 'In Stock'? 'text-green-700': p.status === 'Low Stock'?'text-yellow-500':'text-red-500'}`}>{p.status}</span>
                </div>
  
                </div>
                </div>
            </div>

            <div className="flex items-center justify-between">

                <span className="text-foreground font-bold select-none text-lg">EG {p?.price.toFixed(1)}</span>

                <div className="butons flex gap-3 items-center mr-2">
                  <FaShoppingCart className={`text-primary size-5.5 active:-translate-y-1 transition-all duration-300 ${p.status === 'Out of Stock'? 'cursor-not-allowed bg-primary/50':'cursor-pointer'}`} onClick={(e)=> {
                            if(p.status === 'Out of Stock'){
                              e.preventDefault() 
                            }else{
                              handleAddToCart(p.id, p.title, p.price, p.image, p.discountPercentage, p.rating, p.status);
                              } 
                            }}/>

                <FaTrash className="cursor-pointer size-5 text-red-600" onClick={()=>handleRemoveFromFavorite(p.id)}/>
                </div>
            </div>
    
            </div>
        </div>
    )
  })}
</div>
<Button className=' p-4 cursor-pointer text-md mb-10' onClick={()=>handleRemoveAllFavorites()}>Reset Favorites</Button>
    </div>
)}


export default Favorite