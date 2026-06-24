import { FaTrash } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { removeFromCart } from "@/store/CartSlice";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "@/store/CartSlice";

function CartProduct({product}) {


    const dispatch = useDispatch();

    function handleRemoveFromCart(id){
        dispatch(removeFromCart({id}))
    }

    function handlePlus(id){
        dispatch(increaseQuantity({id}))
    }

    function handleMinus(id){
            dispatch(decreaseQuantity({id}))
    }



   
  return (
    <div className="flex items-center border-b-1 py-5 py-2 border-gray-400">
        <img src={product.image} alt="" className="lg:size-30 max-lg:size-27 shadow-xl mr-4"/>

        <div className="flex-1 flex flex-col gap-4">

        <div className="flex items-start justify-between">

            <div className="w-full">
            <h1 className="font-bold mb-1 ">{product.title}</h1>

            <div className="flex justify-between">

            <div className="flex gap-3">
            <span className={`${product.availability === 'In Stock'? 'text-green-700': 'text-yellow-600'}`}>{product.availability}</span>
             <span className=' text-xs  text-foreground flex items-center gap-1 font-bold '>{(product?.rating ?? 0 ).toFixed(1)}<FaStar color='gold'/></span>
            </div>

            <FaTrash className="mt-1 cursor-pointer shadow-2xl" onClick={()=>handleRemoveFromCart(product.id)}/>
            </div>
            </div>
        </div>

        <div className="flex items-center justify-between">
            <span className="text-foreground font-bold select-none text-lg">EG {((product?.price ?? 0) * product.amount).toFixed(1)}</span>

            <ul className="flex items-center *:border-foreground *:select-none">
                <li onClick={()=>handleMinus(product.id)} className="p-1 border-2 cursor-pointer active:-translate-y-1 lg:active:-translate-y-2 transition-all duration-300 ease-in-out"><FaMinus className="size-3"/></li>
                <li className="flex items-center justify-center  size-7 font-bold">{product.amount}</li>
                <li onClick={()=>handlePlus(product.id)} className="p-1 border-2 cursor-pointer active:-translate-y-1 lg:active:-translate-y-2 transition-all duration-300 ease-in-out"><FaPlus className="size-3"/></li>
            </ul>
        </div>

        </div>
    </div>
  )
}

export default CartProduct