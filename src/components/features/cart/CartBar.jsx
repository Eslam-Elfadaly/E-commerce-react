import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { auth } from "@/firebase";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { setCart } from "@/store/CartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function CartBar({openCart,setOpenCart}) {

const [loading, setLoading] = useState(false);

const cart = useSelector((p)=> p.cartStore.cart)

const totalPrice = cart.length !== 0 ? cart.map((p)=> p.amount * p.price).reduce((acc, curr)=> acc + curr).toFixed(1) : 0;

useEffect(() => {
        if(openCart){
            document.body.style.overflow = 'hidden';
        }else{
            
            document.body.style.overflow = 'auto';
        }
        console.log(cart)
        return ()=>{
            
            document.body.style.overflow = 'auto';
        }
    }, [openCart]);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function handleCheckout(){
        
    const user = auth?.currentUser;
     setLoading(true);
    setTimeout(()=>{
        if(user){
            toast.success(('Payment Successful ✅'), {style:{
                backgroundColor:'green',
                color:'white'
            }})
            setLoading(false);
            dispatch(setCart([]));
            navigate('/');
            setOpenCart(false);
            
        }else{
            setLoading(false);
            toast.error(('Please login first'), {style:{
                backgroundColor:'red',
                color:'white'
            }})
        }
    },2000)
}

    // if Cart Empty
    if(cart.length === 0){
        return(
            <div className={`CartBackGround  fixed ${openCart? 'opacity-100': 'opacity-0 pointer-events-none'} top-0 left-0 w-screen max-lg:h-lvh h-full z-20 bg-black/50`} onClick={()=>setOpenCart(false)}>
        <div className={`cart bg-sidebar overflow-y-scroll  scrollbar-thin lg:p-5 max-lg:p-4 lg:w-1/3 max-lg:w-full h-full z-50 absolute top-0 right-0 ${openCart? 'translate-x-0':'translate-x-full'} transition-transform duration-300 ease-in-out`} onClick={(e)=>e.stopPropagation()}>

        <div className="flex justify-between mb-8">
        <h1 className="lg:text-2xl text-2xl font-bold">Cart</h1>
        <IoClose className="size-7 cursor-pointer z-50" onClick={()=>setOpenCart(false)}/>
        </div>

        <div className="flex flex-col gap-3 h-full -translate-y-30 items-center justify-center">
            <h1 className="text-2xl font-bold ">Your Cart Is Empty</h1>
          <Link to='/shop' onClick={()=>{setOpenCart(false)}}><button className='cursor-pointer flex items-center gap-4 bg-foreground w-fit text-background font-bold rounded-md px-4 py-2 hover:bg-background hover:text-foreground select-none active:bg-background active:text-foreground transition-all duration-200'>Explore Shop  <FaArrowRight className='animate-pulse'/></button></Link>

        </div>

        </div>
            </div>
        )
    }

    // if Not Empty
   return(
       <div className={`CartBackGround  fixed ${openCart? 'opacity-100': 'opacity-0 pointer-events-none'} top-0 left-0 w-screen max-lg:h-lvh h-full z-20 bg-black/50`} onClick={()=>{setOpenCart(false)}}>

        <div className={`cart bg-sidebar overflow-y-scroll scrollbar-thin lg:p-5 max-lg:p-4 lg:w-1/3 max-lg:w-full h-full z-50 absolute top-0 right-0 ${openCart? 'translate-x-0':'translate-x-full'} transition-transform duration-300 ease-in-out`} onClick={(e)=>e.stopPropagation()}>

        <div className=" flex justify-between mb-8">
        <h1 className="lg:text-2xl text-2xl font-bold">Cart</h1>
        <IoClose className="size-7 cursor-pointer" onClick={()=>setOpenCart(false)}/>
        </div>

        <div className="productCards mb-5">
        {cart.map((p)=>{
            return(
        <CartProduct key={p.id} product={p}/> 
    )}
)}
        </div>

        <div className="checkout bg-primary   text-white p-8 rounded-2xl">

        <div className="total flex items-center justify-between p-3 pt-0 gap-3 text-xl font-bold">
            <h1>Total </h1>
            <span>{totalPrice} $</span>
        </div>
        <Button disabled={loading} onClick={handleCheckout} className='bg-white text-black text-xl font-bold rounded-md w-full p-6 hover:bg-background hover:text-foreground active:bg-background active:text-foreground cursor-pointer'>{loading? <>Checking Out <Spinner/></>: <>Checkout. {totalPrice} $</>}</Button>
        </div>

        </div>
    </div>
 
)
}

export default CartBar