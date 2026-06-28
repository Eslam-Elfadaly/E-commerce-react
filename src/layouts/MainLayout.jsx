import Navbar from "@/components/features/Navbar"
import { Outlet } from "react-router"
import Footer from "@/components/features/Footer"
import { useDispatch } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase"
import { useSelector } from "react-redux"
import { setCart } from "@/store/CartSlice"
import { setFavorite } from "@/store/FavoriteSlice"
import { useEffect } from "react"

function MainLayout() {

  const dispatch = useDispatch();
  const cart = useSelector((c)=> c.cartStore.cart);
  const favorite = useSelector((f)=> f.favoriteStore.favorite);

  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{

      const uid = currentUser?.uid || 'guest';

      const currentCart = JSON.parse(localStorage.getItem(`cart-${uid}`)) || [];

      const currentFavorite = JSON.parse(localStorage.getItem(`favorite-${uid}`)) || [];

      dispatch(setCart(currentCart));

      dispatch(setFavorite(currentFavorite));
    });

    return () => unsubscribe();
  }, [])

  useEffect(()=>{

    const uid = auth.currentUser?.uid || 'guest';
    localStorage.setItem(`cart-${uid}`,JSON.stringify(cart))

  },[cart])

  useEffect(()=>{

    const uid = auth.currentUser?.uid || 'guest';
    localStorage.setItem(`favorite-${uid}`,JSON.stringify(favorite))

  },[favorite])
  return (
    <>
    
    <div className='w-full'>
 
    <Navbar/>
    <Outlet />
    <Footer/>
    
    </div>
    </>
    
  )
}

export default MainLayout



// SmoothScroll.jsx

