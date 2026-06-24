import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase'; // Your initialized auth object
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from 'react-router';

const SignUp = () => {
  const [userName, setUserName] = useState({firstName:'', lastName:''})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {

     const userInfo =  await createUserWithEmailAndPassword(auth, email, password);

     await updateProfile (userInfo.user,{
        displayName : `${userName.firstName} ${userName.lastName}`
     });

     toast.success("SignUp Successful", {
        style: {
          background: "green",
          color: "white",
        },
      });

    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        toast.warning("Email is already exist", {
        style: {
          background: "red",
          color: "white",
        },
      });

      setUserName({firstName:'', lastName:''});
      setEmail('')
      setPassword('')
      }
    }
  };

  return (
    <div className='lg:w-1/3 max-lg:w-[95%] py-7 px-2 mt-10  rounded-2xl m-auto bg-white'>
        <div className='px-5 flex items-center mb-5'>
     <NavLink to='/logIn'><FaArrowLeft className='text-foreground size-5.5'/></NavLink>
    <h1 className='font-bold text-2xl text-end flex-1'>SignUp</h1>
        </div>
    <form onSubmit={handleSignUp} className='w-[90%] m-auto flex flex-col gap-5 *:rounded-2xl'>
      <input type="text" value={userName.firstName} placeholder='FirstName' className={`border-black border-1 p-2 lg:p-3 focus:border-primary`} onChange={(e)=> setUserName((prev)=>({...prev, firstName: e.target.value}))}/>  
      <input type="text" value={userName.lastName} placeholder='LastName' className='border-black border-1 p-2 lg:p-3 focus:border-primary' onChange={(e)=> setUserName((prev)=>({...prev, lastName: e.target.value}))}/>  
      <input  type="email" value={email} className='border-black border-1 p-2 lg:p-3 focus:border-primary' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <div className='flex flex-col'>
      <input type="password" value={password} className='border-black rounded-2xl border-1 p-2 lg:p-3 focus:border-primary' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <div>{ password.length > 0 && ( password.length < 8? <span className='text-red-500 text-sm ml-2'>Password must be at least 8 characters</span>:<span className='text-green-600 text-sm ml-2'>Approved</span>)}</div>
      </div>
      <Button type="submit"  className={`p-5 text-lg cursor-pointer ${!email || !password || password.length < 8 || !userName.firstName || !userName.lastName ? 'bg-primary/40 pointer-events-none':'' }`}>Sign Up</Button>
    </form>
    </div>
  );
};

export default SignUp