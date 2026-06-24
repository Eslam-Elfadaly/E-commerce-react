import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import api from "@/services/apiContext";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import axios from "axios";
import {  useDispatch } from 'react-redux'
import { addToCart } from '@/store/CartSlice';
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router";
function Search({setOpenSearch}) {

    const [suggestProducts ,setSuggestProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    
    const [searchProducts, setSearchProducts] = useState([])


    const categories = ['smartphones', 'tablets', 'mobile-accessories', 'laptops'] 

    // Suggestion

    useEffect(()=>{
        async function getSuggestData(){
            try{
                setIsLoading(true)
                const res = await api.get('mobile-accessories?limit=5')
                
                setSuggestProducts(res.data.products);
            }
            catch(error){
                alert(error)
            }
            finally{
                setIsLoading(false)
            }
        };
        getSuggestData();
    },[])
    
    // search date
    useEffect(()=>{
        async function SearctDate(){
            try{
                setIsLoading(true)
                const res = await axios.get('https://dummyjson.com/products?limit=0')
                
                const filterdCategories = res.data.products.filter((p)=>{
                    return categories.includes(p.category)
                })
                
                const filterdProducts = filterdCategories.filter((p)=>{
                    return p.title.toLowerCase().includes(searchValue.toLowerCase());
                })
                
                setSearchProducts(filterdProducts);

            }catch(error){
                alert(error)
            }
            finally{
                setIsLoading(false)
            }
        };
        SearctDate();
    },[searchValue])


      const dispatch = useDispatch();

  function handleAddToCart(id, title, price, image ,discountPercentage, rating, availability){
    dispatch(addToCart({id, title, price, image, discountPercentage, rating, availability}))
  }


  return (

    <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-60 bg-black/70' onClick={()=>setOpenSearch(false)}>
        <div className="search bg-white text-black absolute top-12 lg:top-10 w-[90%] h-[80%] lg:h-[90%] lg:w-2/3 p-5 rounded-2xl" onClick={(e)=> e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
                <h1 className="font-bold text-lg">Product Searchbar</h1>
                <IoClose className="size-7 cursor-pointer" onClick={()=>setOpenSearch(false)}/>
            </div>

            <div className="relative mb-5">
                <input type="text" value={searchValue} autoFocus onChange={(e)=>setSearchValue(e.target.value)} placeholder="Search Your Product Here.." className="border-black border-1 p-1.5 lg:p-2 w-full"/>
                <div className="bg-primary cursor-pointer right-0 absolute p-2 lg:p-2.5 top-1/2 -translate-y-1/2 ">
                <IoSearch className="size-6 max-md:size-5.5  text-white "/>
                </div>
            </div>

                {isLoading?
                    <div className='w-full h-full flex items-start mt-30 justify-center my-15'>
                       <Button  size="lg" className=' bg-primary'>
                          Loading Products
                          <Spinner data-icon="inline-start" />
                       </Button>
                    </div>
                 : 
                 searchValue.trim() === '' ?
                <div>
                <div className="flex items-center bg-primary/30 p-3"> 
                    <IoSearch className="size-6 max-md:size-5.5 text-black mr-1"/>
                    <p>Search products from</p>
                    <h1 className="logo ml-0.5 font-bold text-start hover:text-primary hover:*:text-foreground transition-all duration-300 cursor-pointer">
                    TECHNO
                   <span className="text-primary transition-all duration-300">X</span>
                    </h1>
                </div>

                <div className=" pt-3 border-1">
                {suggestProducts.map((p)=>{
                    return(
                        <div key={p.id} className="flex pl-3 cursor-pointer items-center py-2 gap-1 active:bg-black/5 hover:bg-black/5" onClick={()=>setSearchValue(p.title)}>
                        <IoSearch className="size-5 max-md:size-4.5 text-black mr-1"/>
                        <div key={p.id}>{p?.title}</div>
                        </div>
                    )
                })}
                </div>
            </div>
            
            : searchProducts.length > 0?
            
            <div className="max-h-[70%] overflow-y-scroll">
                {searchProducts.map((p)=>{
                    return(
                        <div key={p.id} className="border-b-black border-b-1 mb-3 pb-4 pl-3 flex items-center gap-3 lg:gap-5">
                            <NavLink to={`/product/${p.id}`} onClick={()=>setOpenSearch(false)}><img src={p?.images?.[0]} alt="" className="size-25 shadow-2xl cursor-pointer hover:-translate-y-1 active:-translate-y-1"/></NavLink>

                            <div className="flex-1">
                                <div className="info lg:flex justify-between lg:pr-5">
                                <h1 className="font-bold lg:text-xl max-lg:mb-1">{p.title}</h1>
                                <div className="price lg:text-xl font-bold mb-1 lg:mb-3"><span className="text-primary line-through">${p?.price}</span> <span>${((p?.price) - (p?.price * p?.discountPercentage/100)).toFixed(2)}</span></div>
                                </div>

                                <Button className={`text-white rounded-sm lg:w-1/3 ${p.availabilityStatus === 'Out of Stock'? ' cursor-not-allowed bg-primary/50':'cursor-pointer'}`} onClick={(e)=> {
                                                if(p.availabilityStatus === 'Out of Stock'){
                                                    e.preventDefault() 
                                                }else{
                                                    handleAddToCart(p.id, p.title, p.price, p.images[0], p.discountPercentage, p.rating, p.availabilityStatus);
                                                }
                                            }}>Add To Cart <FaShoppingCart/>
                                </Button>
                            </div>

                        </div>
                    )
                })}
            </div> 
            
            :
            <div className="h-full flex justify-center mt-50">
                <h1 className="font-bold text-xl">No Products</h1>
            </div>
            }
        </div>
    </div>
  )
}

export default Search