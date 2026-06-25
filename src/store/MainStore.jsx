import { configureStore } from "@reduxjs/toolkit";

import CartSlice from '@/store/CartSlice'
import FavoriteSlice from '@/store/FavoriteSlice'

const MainStore = configureStore({
    reducer:{
        cartStore: CartSlice,
        favoriteStore: FavoriteSlice,
    }
});

MainStore.subscribe(() => {
  localStorage.setItem(
    'cart',JSON.stringify(MainStore.getState().cartStore.cart)
  );
  localStorage.setItem(
    'favorite', JSON.stringify(MainStore.getState().favoriteStore.favorite) 
  )
});

export default MainStore