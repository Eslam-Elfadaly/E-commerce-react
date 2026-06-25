import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:JSON.parse(localStorage.getItem(`cart`)) || []
}
const CartSlice = createSlice({
    
    name:'cart',
    
    initialState:initialState,
    
    reducers:{
        addToCart : (state, action)=>{
        const exist = state.cart.find((p)=> p.id === action.payload.id)

        if(exist){
            exist.amount += 1;
        }
        else{
            const newProduct = {id: action.payload.id, title: action.payload.title, price: action.payload.price, image:action.payload.image , discount:action.payload.discountPercentage, rating:action.payload.rating, availability:action.payload.availability, amount:1};
            state.cart.push(newProduct);
        }
    },
    
        removeFromCart : (state, action)=> {
            state.cart = state.cart.filter((p)=> p.id !== action.payload.id)
        },
        
        increaseQuantity : (state, action)=>{
            const item = state.cart.find((p)=> p.id === action.payload.id);
            if(item){
                item.amount +=1
            }
        },
        
        decreaseQuantity : (state, action)=>{
        const item = state.cart.find((p)=> p.id === action.payload.id);
            if(item){

                if(item.amount <= 1){
                    item.amount = 1;
                } else{
                    item.amount -= 1;
                }
            }
        }
    }


})

export const {addToCart,removeFromCart, increaseQuantity, decreaseQuantity} = CartSlice.actions;

export default CartSlice.reducer

