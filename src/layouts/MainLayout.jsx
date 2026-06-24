import Navbar from "@/components/features/Navbar"
import { Outlet } from "react-router"
import Footer from "@/components/features/Footer"

function MainLayout() {

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

