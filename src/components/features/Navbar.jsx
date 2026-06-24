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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { signOut } from "firebase/auth";



import { LogOutIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Navbar() {
  const [OpenSideBar, setOpenSidebar] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

const cart = useSelector((p)=> p.cartStore.cart);

const favorite = useSelector((p)=> p.favoriteStore.favorite);


  const [user, setUser] = useState(null);
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setIsLoading(false)
      setUser(currentUser)
    // console.log("USER:", user);
  });

  return unsubscribe;
}, []);


const logOut = async ()=>{
  await signOut(auth)
}
  return (
    <>
    <nav className=" sticky top-0 bg-background z-20 w-full shadow-xl">
    <div className="flex lg:max-w-10/12 m-auto items-center max-lg:px-3.5 justify-between lg:py-5 max-lg:py-5 sticky top-0 bg-background z-20">

    <div className="flex items-center">
      <FiSidebar className="size-5 lg:hidden" onClick={()=> setOpenSidebar(true)}/>
        <div className="flex items-center gap-5">
            <Link to='/' className="max-lg:flex-1 lg:text-start max-lg:ml-3">
            <h1 className="logo font-bold text-2xl text-start hover:text-primary hover:*:text-foreground transition-all duration-300 cursor-pointer">
                TECHNO
                <span className="text-primary transition-all duration-300">X</span>
            </h1>
            </Link>
            {!isLoading && user && <span className="max-lg:hidden font-bold bg-primary p-2 rounded-2xl text-white">Hello, {(user?.displayName)?.split(' ')[0]?.toUpperCase()}👋</span>}
        </div>
    </ div>


                <ul className="navs max-lg:hidden max-md:text-red-50 flex items-center gap-5 **:text-[15px] font-bold **:hover:border-primary **:hover:text-primary ">
                   <NavLink to="/" className={({isActive})=>isActive ? '*:border-primary text-primary' : ''}><Button variant="outline" className='cursor-pointer'>Home</Button></NavLink>
                   <NavLink to='/shop' className={({isActive})=>isActive ? '*:border-primary text-primary' : ''}><Button variant="outline" className='cursor-pointer'>Shop</Button></NavLink>
                   <NavLink to='/blog' className={({isActive})=>isActive ? '*:border-primary text-primary' : ''}><Button variant="outline" className='cursor-pointer'>Blog</Button></NavLink>
                </ul>

                <div className="flex items-center gap-3 *:cursor-pointer">
                    <IoSearch className="size-6 max-md:size-5.5 hover:text-primary" onClick={()=>setOpenSearch(true)}/>

                    <div className="cart relative" onClick={()=>setOpenCart(true)}>
                    <AiOutlineShoppingCart className="size-6.5 max-md:size-5.5 hover:text-primary" />
                      <span className="absolute -top-2 -right-1.5 bg-primary font-normal text-white select-none max-lg:size-4 size-4.5 flex justify-center items-center rounded-full  text-sm">{cart.length}</span>
                    </div>

                    <div className="fav relative" onClick={()=>navigate('favorite')}>
                    <NavLink to='/favorite' className={({isActive})=> isActive? 'text-primary':''} ><FaRegHeart className="size-6 max-md:size-5.5 hover:text-primary"/></NavLink>
                      <span className="absolute -top-2 -right-2 bg-primary font-normal text-white select-none max-lg:size-4 size-4.5 flex justify-center items-center rounded-full  text-sm">{favorite.length}</span>
                    </div>


{/* user exist or no ??  */}
                    {!isLoading &&  user ?  

                    // use has photo ??
                    user?.photoURL?
                     <DropdownMenu className='max-lg:hidden'>
                       <DropdownMenuTrigger asChild className='max-lg:hidden'>
                         <Button variant="ghost" size="icon" className="rounded-full">
                           <Avatar>
                             <AvatarImage src={user?.photoURL} alt="shadcn" />
                             <AvatarFallback>LR</AvatarFallback>
                           </Avatar>
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end" className='w-72 p-5'>
                        <div className="flex flex-col mb-2">
                          <img src={user.photoURL} alt="" className="self-center rounded-full mb-5"/>
                          <div><span className="font-bold">Full Name : </span> <span className="text-sm">{user.displayName}</span></div>
                          <div><span className="font-bold">Email : </span> <span className="text-sm">{user.email}</span></div>
                        </div>
                         <DropdownMenuSeparator className='mb-2'/>
                         <DropdownMenuItem className='bg-primary text-white flex justify-center p-2 hover:bg-primary/80 cursor-pointer' onClick={logOut}>
                           <LogOutIcon/>
                           Sign Out
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                      </DropdownMenu>

                     :

                    //  user hasNot photo
                     <DropdownMenu className='max-lg:hidden'>
                       <DropdownMenuTrigger asChild className='max-lg:hidden'>
                         <Button variant="ghost" size="icon" className="rounded-full">
                           <div className="bg-black text-white rounded-full size-7 font-bold cursor-poiter flex items-center justify-center max-lg:hidden">{user.displayName?.split('')[0].toUpperCase()}</div>
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end" className='w-72 p-5'>
                        <div className="flex flex-col mb-2">
                         <div className="bg-black text-white size-15 font-bold flex items-center justify-center text-xl self-center rounded-full mb-5">{user.displayName?.split('')[0].toUpperCase()}</div>
                          <div><span className="font-bold">Full Name : </span> <span className="text-sm">{user?.displayName}</span></div>
                          <div><span className="font-bold">Email : </span> <span className="text-sm">{user?.email}</span></div>
                        </div>
                         <DropdownMenuSeparator className='mb-2'/>
                         <DropdownMenuItem className='bg-primary text-white flex justify-center p-2 hover:bg-primary/80 cursor-pointer' onClick={logOut}>
                           <LogOutIcon/>
                           Sign Out
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                      </DropdownMenu>

                     :
                    //  no user
                     <NavLink to='/logIn'><Button variant="outline" className='max-lg:hidden text-md hover:border-primary hover:text-primary cursor-pointer'>Login</Button></NavLink>
                     }


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