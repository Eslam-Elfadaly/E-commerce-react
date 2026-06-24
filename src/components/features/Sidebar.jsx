import { Link } from "react-router"
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router";
import { MdLogin } from "react-icons/md";
import { Button } from "../ui/button";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { toast } from "sonner"

function Sidebar({setOpenSidebar}) {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
      setIsLoading(false)
      console.log(currentUser)
    });
    return () => unsubscribe();
  }, [])

  // logOut

  const logOut = async ()=>{
    setTimeout(async ()=>{
      await signOut(auth);
      await setOpenSidebar(false);
    }, 1500)

    setTimeout(async ()=>{
      await toast.success(`Log Out !`, {
        style: {
          background: "red",
          color: "white",
        },
      })
    }, 1500)


  }
  return (
    <div className="fixed top-0 left-0 lg:hidden w-screen bg-black/50 z-50 " onClick={()=> setOpenSidebar(false)}>

    <div className="min-h-screen  w-3/4 bg-sidebar text-sidebar-foreground p-5" onClick={(e)=> e.stopPropagation()}>

    <div className="logo flex justify-between items-center mb-10">
        <Link to='/'><h1 className="logo font-bold text-2xl cursor-pointer "  onClick={()=>setOpenSidebar(false)}>TECHNO<span className="text-primary">X</span></h1></Link>
        <IoClose className="size-7" onClick={()=>setOpenSidebar(false)}/>
    </div>

    {!isLoading &&  user?
    user.photoURL?
    <div className="flex items-center gap-4">
      <img src={user?.photoURL} alt="" className="size-19 rounded-full"/>
      <h1 className="font-bold text-foreground text-lg w-fit p-2 rounded-2xl">Hi, {user.displayName?.split(' ')[0].toUpperCase()} 👋</h1>
    </div>
    :
    <div className="flex items-center gap-4">
      <div className="bg-black text-white rounded-full size-15 text-xl font-bold cursor-poiter flex items-center justify-center">{user.displayName?.split('')[0].toUpperCase()}</div>
      <h1 className="font-bold text-foreground text-lg w-fit p-2 rounded-2xl">Hi, {user.displayName?.split(' ')[0].toUpperCase()} 👋</h1>
    </div>
    :''}
    <ul className="flex  flex-col gap-4 **:text-lg font-bold **:p-0.5 my-10">
      <NavLink to="/" className={({isActive})=>isActive ? '*:border-b-primary border-b-2 text-primary' : ''} onClick={()=>{setOpenSidebar(false) }}><li>Home</li></NavLink>
      <NavLink to='/shop' className={({isActive})=>isActive ? '*:border-b-primary border-b-2 text-primary' : ''} onClick={()=>{setOpenSidebar(false) }}><li>Shop</li></NavLink>
      <NavLink to='/blog' className={({isActive})=>isActive ? '*:border-b-primary border-b-2 text-primary' : ''} onClick={()=>{setOpenSidebar(false) }}><li>Blog</li></NavLink>
    </ul>

    { user ? 
    <NavLink to='/' onClick={()=>{logOut()}}><Button className={`flex items-center gap-2 w-full p-5 text-lg font-bold `}>
    LogOut
    <MdLogin className=" size-5"/>
    </Button>
    </NavLink>
    : 
    <NavLink to='/logIn' onClick={()=>setOpenSidebar(false)}><Button className="flex items-center gap-2 w-full p-5 text-lg font-bold">
      Login
      <MdLogin className=" size-5"/>
    </Button>
    </NavLink>}


    </div>
    </div>
  )
}

export default Sidebar