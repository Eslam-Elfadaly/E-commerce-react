import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    favorite:JSON.parse(localStorage.getItem(`favorite`)) || []
}

const FavoriteSlice = createSlice({
    name:'favorite',
    initialState:initialState,

    reducers:{
        addToFavorite : (state, action)=>{
            const exist = state.favorite.find((p)=> p.id === action.payload.id)

            if(!exist){
                const newFav = {id: action.payload.id, image:action.payload.image, title: action.payload.title,category:action.payload.category,brand:action.payload.brand, status: action.payload.status, price: action.payload.price, rating:action.payload.rating}
                state.favorite.push(newFav);
            }
        },

        removeFromFavorite: (state, action) =>{
            state.favorite = state.favorite.filter((p)=> p.id !== action.payload.id)
        },

        removeAllFavorites : (state) =>{
            state.favorite = []
        }
    }
})

export const {addToFavorite,removeFromFavorite, removeAllFavorites} = FavoriteSlice.actions
export default FavoriteSlice.reducer
