import { IoSearch } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import { Link } from "react-router";
import {ModeToggle} from '@/components/theme-toggle'
import Sidebar from '@/components/features/Sidebar'

import { FiSidebar } from "react-icons/fi";
import { useState } from "react";
import Cart from '@/components/features/cart/CartBar';

import Search from "@/components/features/Search";
import { useSelector } from "react-redux";

function Navbar() {
  const [OpenSideBar, setOpenSidebar] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

const cart = useSelector((p)=> p.cartStore.cart);

const favorite = useSelector((p)=> p.favoriteStore.favorite);

  return (
    <>
    <nav className=" sticky top-0 bg-background z-20 w-full shadow-xl">
    <div className="flex lg:max-w-10/12 m-auto items-center max-lg:px-3.5 justify-between lg:py-5 max-lg:py-5 sticky top-0 bg-background z-20">
      <FiSidebar className="size-5 lg:hidden" onClick={()=> setOpenSidebar(true)}/>

            <Link to='/' className="max-lg:flex-1 lg:text-start max-lg:ml-3">
            <h1 className="logo font-bold text-2xl text-start hover:text-primary hover:*:text-foreground transition-all duration-300 cursor-pointer">
                TECHNO
                <span className="text-primary transition-all duration-300">X</span>
            </h1>
            </Link>

                <ul className="navs max-lg:hidden max-md:text-red-50 flex items-center gap-5 **:text-[15px] font-bold **:hover:border-primary **:hover:text-primary ">
                   <NavLink to="/" className={({isActive})=>isActive ? '*:border-primary text-primary' : ''}><Button variant="outline" className='cursor-pointer'>Home</Button></NavLink>
                   <NavLink to='/shop' className={({isActive})=>isActive ? '*:border-primary text-primary' : ''}><Button variant="outline" className='cursor-pointer'>Shop</Button></NavLink>
                   <NavLink to='/blog' className={({isActive})=>isActive ? '*:border-primary text-primary' : ''}><Button variant="outline" className='cursor-pointer'>Blog</Button></NavLink>
                </ul>

                <div className="flex items-center gap-3 *:cursor-pointer">
                    <IoSearch className="size-6 max-md:size-5.5 hover:text-primary" onClick={()=>setOpenSearch(true)}/>

                    <div className="cart relative">
                    <AiOutlineShoppingCart className="size-6.5 max-md:size-5.5 hover:text-primary" onClick={()=>setOpenCart(true)}/>
                      <span className="absolute -top-2 -right-1.5 bg-primary font-normal text-white select-none max-lg:size-4 size-4.5 flex justify-center items-center rounded-full  text-sm">{cart.length}</span>
                    </div>

                    <div className="fav relative">
                    <NavLink to='/favorite' className={({isActive})=> isActive? 'text-primary':''} ><FaRegHeart className="size-6 max-md:size-5.5 hover:text-primary"/></NavLink>
                      <span className="absolute -top-2 -right-2 bg-primary font-normal text-white select-none max-lg:size-4 size-4.5 flex justify-center items-center rounded-full  text-sm">{favorite.length}</span>
                    </div>
                    <NavLink to='/logIn'><Button variant="outline" className='max-lg:hidden text-md hover:border-primary hover:text-primary'>Login</Button></NavLink>
                    
                    <div className=' cursor-pointer border-1 rounded-full'>
                    <ModeToggle />
                    </div>
                </div>

               </div>
    </nav>

    {/* sideBar */}
    {OpenSideBar && <Sidebar setOpenSidebar={setOpenSidebar}/>}

    {/* Cart */}
    <Cart setOpenCart={setOpenCart} openCart={openCart}/>

    {/* Search */}
    {openSearch && <Search setOpenSearch={setOpenSearch} openSearch={openSearch}/>}
    </>
  )
}

export default Navbar