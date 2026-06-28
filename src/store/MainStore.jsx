import { configureStore } from "@reduxjs/toolkit";

import CartSlice from '@/store/CartSlice'

import FavoriteSlice from '@/store/FavoriteSlice'



const MainStore = configureStore({
    reducer:{
        cartStore: CartSlice,
        favoriteStore: FavoriteSlice,
    }
});
export default MainStore