import { Link } from "react-router"
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router";
import { MdLogin } from "react-icons/md";
import { Button } from "../ui/button";

function Sidebar({setOpenSidebar}) {

  return (
    <div className="fixed top-0 left-0 md:hidden w-screen bg-black/50 z-50 " onClick={()=> setOpenSidebar(false)}>

    <div className="min-h-screen  w-3/4 bg-sidebar text-sidebar-foreground p-5" onClick={(e)=> e.stopPropagation()}>

    <div className="logo flex justify-between items-center">
        <Link to='/'><h1 className="logo font-bold text-2xl cursor-pointer "  onClick={()=>setOpenSidebar(false)}>TECHNO<span className="text-primary">X</span></h1></Link>
        <IoClose className="size-7" onClick={()=>setOpenSidebar(false)}/>
    </div>

    <ul className="flex  flex-col gap-4 **:text-lg font-bold **:p-0.5 my-10">
      <NavLink to="/" className={({isActive})=>isActive ? '*:border-b-primary border-b-2 text-primary' : ''} onClick={()=>{setOpenSidebar(false) }}><li>Home</li></NavLink>
      <NavLink to='/shop' className={({isActive})=>isActive ? '*:border-b-primary border-b-2 text-primary' : ''} onClick={()=>{setOpenSidebar(false) }}><li>Shop</li></NavLink>
      <NavLink to='/blog' className={({isActive})=>isActive ? '*:border-b-primary border-b-2 text-primary' : ''} onClick={()=>{setOpenSidebar(false) }}><li>Blog</li></NavLink>
    </ul>
<NavLink to='/logIn' onClick={()=>setOpenSidebar(false)}><Button className="flex items-center gap-2 w-full p-5 text-lg font-bold">
  Login
    <MdLogin className=" size-5"/>
</Button></NavLink>

    </div>
    </div>
  )
}

export default Sidebar