import { useState, useEffect } from 'react';
import { auth, googleProvider } from '@/firebase';
import { signInWithEmailAndPassword , signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { NavLink } from 'react-router';
// import { FcGoogle } from "react-icons/fc";

function Login() {

const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {


    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("LogIn Successful", {
        style: {
          background: "green",
          color: "white",
        },
      });

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

   const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setTimeout(()=>{
          console.log(user)
      }, 1000)
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div className='lg:w-1/3 text-black max-lg:w-[95%] py-7 px-2 mt-10  rounded-2xl m-auto bg-white'>
    <h1 className='font-bold text-2xl mb-5 text-center'>LogIn</h1>
    <form onSubmit={handleLogin} className='w-[90%] m-auto flex flex-col gap-5 *:rounded-2xl'>
      <input  type="email" value={email} className='border-black border-1 p-2 lg:p-3 focus:border-primary' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <div className='flex flex-col'>
      <input type="password" value={password} className='border-black rounded-2xl border-1 p-2 lg:p-3 focus:border-primary' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <div>{ password.length > 0 && ( password.length < 8? <span className='text-red-500 text-sm ml-2'>Password must be at least 8 characters</span>:<span className='text-green-600 text-sm ml-2'>Approved</span>)}</div>
      </div>

      <Button type="submit" className={`p-5 text-lg text-white cursor-pointer ${!email || !password || password.length < 8 ? 'bg-primary/40 pointer-events-none':'' }`}>Log In</Button>

      {/* <div>
      {user ? (
        <div>
          <p>Signed in as {user.email}</p>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div> */}

      <div className='text-center'>You Don't Have An Account ? <NavLink to='/signUp' className='text-primary underline'>Sign Up</NavLink></div>
    </form>
    </div>
  )
}

export default Login