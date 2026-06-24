import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "@/store/CartSlice";
import { useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { addToFavorite, removeFromFavorite } from '@/store/FavoriteSlice';
import { useSelector } from "react-redux";
import { FaCommentDots } from "react-icons/fa6";

function ProductPage() {

    const {id} = useParams();
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [openFAQ, setOpenFAQ] = useState(true)

    const [lastInfo, setLastInfo] = useState('Description')
    useEffect(()=>{
        async function getDate(){
            try{
                setIsLoading(true);
                const res = await axios.get(`https://dummyjson.com/products/${id}`)
                setProduct(res.data);
            }
            catch(error){
                alert(error)
            }
            finally{
                setIsLoading(false)
            }
        };
        getDate();
    },[id])


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


    if(isLoading){
        return(
            <div className='w-full h-full flex relative my-20'>
      <Button  size="lg" className='absolute top-1/2 left-1/2 -translate-1/2 bg-primary'>
        Loading Products
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
        )
    }

  return ( 
    
    <div className='products lg:max-w-10/12 m-auto max-lg:px-3.5 flex flex-col max-lg:items-center mb-10 mt-2 lg:mt-15'>
 {/* product */}
<div className="flex lg:gap-20 gap-3  max-lg:flex-col max-lg:items-center lg:mb-2">
        {/* image */}
        <div className="productImage lg:w-2/3 flex justify-center">
        <img src={product?.images?.[0]} alt={product.title} className="size-100 max-lg:size-60"/>
        </div>

        {/* info */}
        <div className="info">

            <h1 className="text-4xl max-lg:text-2xl font-bold mb-3">{product?.title}</h1>
            <div className="price text-xl max-lg:text-lg font-bold mb-5"><span className="text-primary line-through">${product?.price}</span> <span>${((product?.price) - (product?.price * product?.discountPercentage/100)).toFixed(2)}</span></div>
            <span className={`px-3 py-2 rounded-[8px] font-bold ${product.availabilityStatus === 'In Stock'? 'text-green-700 bg-green-100': product.availabilityStatus === 'Low Stock'?'text-yellow-500 bg-yellow-100':'text-red-500 bg-red-100'}`}>{product?.availabilityStatus}</span>
            <p className="mt-5">{product?.description}</p>


            <div className="buttons flex items-center max-lg:justify-center gap-2">

            <Button className={`flex-1 mt-5 py-5 text-lg  mb-3 text-white rounded-sm ${product.availabilityStatus === 'Out of Stock'? ' cursor-not-allowed bg-primary/50':'cursor-pointer'}`} onClick={(e)=> {
                if(product.availabilityStatus === 'Out of Stock'){
                    e.preventDefault() 
                }else{
                    handleAddToCart(product.id, product.title, product.price, product.images[0], product.discountPercentage, product.rating, product.availabilityStatus);
                }
            }}>Add To Cart <FaShoppingCart/></Button>

            <div className={`mt-1.5 hover:text-primary transition-all duration-300 ${favorite.find((f)=> f.id === product.id)? 'text-primary':''} `}><FaHeart className='size-5' onClick={()=>favorite.find((f)=> f.id === product.id)? handleRemoveFromFavorite(product.id) : handleAddToFavorite(product.id, product.images[0], product.title, product.category, product.brand, product.availabilityStatus, product.price, product.rating )}/></div>
            
            </div>

                <div className="flex items-center justify-between cursor-pointer mb-1 group" onClick={()=>setOpenFAQ(!openFAQ)}>
                <h1 className="font-bold underline">{product.title}</h1>
                <IoIosArrowDown className={`text-xl animate-bounce ${openFAQ? '-rotate-180': ''} transition-all duration-300`}/>
                </div>

                <div className={`FAQ overflow-hidden lg:mb-3 mb-7 ${openFAQ? 'max-h-50':'max-h-0'} transition-all duration-300 mb-5`}>
                <div className={`bg-primary/10 p-3  flex flex-col gap-1  ${openFAQ? 'translate-0': '-translate-y-50'} transition-all duration-300`}>
                    <span className="flex justify-between">Brand: <span className="font-bold">{product?.brand}</span></span>
                    <span className="flex justify-between">Stock: <span className={`font-bold ${product.availabilityStatus === 'In Stock'? 'text-green-700': product.availabilityStatus === 'Low Stock'?'text-yellow-500':'text-red-500'}`}>{product?.availabilityStatus}</span></span>
                    <span className="flex justify-between">Rating: <span className=" flex items-center gap-1 font-bold">{product?.rating} <FaStar color='gold' size='15'/></span></span>
                    <span className="flex justify-between">ReturnPolicy: <span className="font-bold">{product?.returnPolicy}</span></span>
                </div>
                </div>

                <div className="flex  justify-center *:border-1 gap-2 *:p-2.5 lg:gap-4 lg:*:p-5 max-lg:mb-5">
                    <div className="freeShipping flex flex-col text-center">
                        <h1 className="font-bold text-lg">Free Shipping</h1>
                        <p>Free shipping over order $120</p>
                    </div>

                    <div className="FlexiblePayment flex flex-col text-center">
                        <h1 className="font-bold text-lg">Flexible Payment</h1>
                        <p>Pay with Multiple Credit Cards</p>
                    </div>
                </div>
        </div>

  </div>

{/* Last Info */}

  <div className="mt-3 lg:w-1/2">
    <ul className="grid grid-cols-3 items-center justify-center gap-6 *:text-center p-1 rounded-2xl bg-primary/30 font-bold *:p-1.5 *:cursor-pointer mb-3">
        <li className={` rounded-2xl ${lastInfo === 'Description'? 'bg-white text-black':'hover:bg-white/20'} transition-all duration-300`} onClick={()=>setLastInfo('Description')}>Description</li>
        <li className={` rounded-2xl ${lastInfo === 'Inforamtion'? 'bg-white text-black':'hover:bg-white/20'} transition-all duration-300`} onClick={()=>setLastInfo('Inforamtion')}>Inforamtion</li>
        <li className={` rounded-2xl ${lastInfo === 'Reviews'? 'bg-white text-black':'hover:bg-white/20'} transition-all duration-300`} onClick={()=>setLastInfo('Reviews')}>Reviews</li>
    </ul>

    <div className="px-2.5">
    {lastInfo === 'Description' && <p className="max-lg:text-center">{product?.description}</p>}
    {lastInfo === 'Inforamtion' &&
     <div>
        <div className="weight flex items-center justify-between border-b-2 py-3"><span>Weight</span>  <span className="font-bold">{product?.weight} KG</span> </div>

        <div className="weight flex items-center justify-between border-b-2 py-3"><span>Dimensions</span>  <span className="font-bold">{product?.dimensions.width.toFixed(0)} * {product?.dimensions.height.toFixed(0)} * {product?.dimensions.depth.toFixed(0)} cm</span> </div>
    </div>}
    {lastInfo === 'Reviews' && <ul>
        {product?.reviews.map((r, index)=>{
            return(
                <li key={index} className="border-b-2 p-4">
                <div className="flex gap-2 mb-2">
                 <span className=" flex items-center gap-0.5 font-bold">{r?.rating.toFixed(1)} <FaStar color='gold' size='15' className="mb-1"/></span>
                 <span className="font-bold">{r.reviewerName}</span> - <span>{r.date.slice(0, 7)}</span> </div>
                <p className="flex items-center gap-2"><FaCommentDots className="text-primary"/> {r.comment}</p>
                </li>
            )
        })}
        </ul>}
    </div>

  </div>

</div>
  )
}

export default ProductPage


                // <p className={`overflow-hidden bg-red-300 ${openFAQ? 'h-50': 'h-0'} transition-all duration-300`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur exercitationem dolorem praesentium doloribus similique sunt, ullam, eveniet aliquam, nisi dignissimos adipisci quibusdam a deserunt saepe optio ab odio magni.</p>
