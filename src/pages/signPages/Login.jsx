import { useState } from 'react';
import { auth, googleProvider } from '@/firebase';
import { signInWithEmailAndPassword , signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { NavLink, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";

function Login() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // login with userName and Password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
     
      setTimeout(()=>{navigate('/')}, 1000)

      setTimeout(()=>{toast.success(`Welcome, ${result.user?.displayName?.split(" ")[0]} 🥳`, {
        style: {
          background: "green",
          color: "white",
        },
      });}, 1100)

      console.log(result.user)
    }

    catch (error) {
      if(error.code === 'auth/invalid-credential'){
        toast.warning("Invalid account", {
        style: {
          background: "red",
          color: "white",
        },
      });

      setEmail('')
      setPassword('')
      }
    }
  };

  

  // sign in With google
  const signInWithGoogle = async () => {
    try {
     const result =  await signInWithPopup(auth, googleProvider);
     setTimeout(()=>{navigate('/')}, 1000)

      setTimeout(()=>{toast.success(`Welcome, ${result.user?.displayName?.split(" ")[0]} 🥳`, {
        style: {
          background: "green",
          color: "white",
        },
      });}, 1100)

    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  // logOut


  return (
    <div className='lg:w-1/3 text-black max-lg:w-[95%] py-7 px-2 mt-10  rounded-2xl m-auto bg-white mb-15'>
    <h1 className='font-bold text-2xl mb-5 text-center'>LogIn</h1>
    <form onSubmit={handleLogin} className='w-[90%] m-auto flex flex-col gap-5 *:rounded-2xl'>
      <input  type="email" value={email} className='border-black border-1 p-2 lg:p-3 focus:border-primary' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <div className='flex flex-col'>
      <input type="password" value={password} className='border-black rounded-2xl border-1 p-2 lg:p-3 focus:border-primary' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <div>{ password.length > 0 && ( password.length < 8? <span className='text-red-500 text-sm ml-2'>Password must be at least 8 characters</span>:<span className='text-green-600 text-sm ml-2'>Approved</span>)}</div>
      </div>

      <Button type="submit" className={`p-5 text-lg text-white cursor-pointer ${!email || !password || password.length < 8 ? 'bg-primary/40 pointer-events-none':'' }`}>Log In</Button>

      <div className='flex items-center justify-center gap-2 border p-1 cursor-pointer hover:bg-black/10 active:bg-black/10' onClick={signInWithGoogle}> 
        Sign In With Google 
        <FcGoogle  className='size-6'/>
    </div> 

      <div className='text-center'>You Don't Have An Account ? <NavLink to='/signUp' className='text-primary underline'>Sign Up</NavLink></div>
    </form>
    </div>
  )
}

export default Login