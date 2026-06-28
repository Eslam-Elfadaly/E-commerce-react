import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase'; // Your initialized auth object
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from 'react-router';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [userName, setUserName] = useState({firstName:'', lastName:''})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // signUp
  const handleSignUp = async (e) => {

    e.preventDefault();
    setLoading(true);

    setTimeout(async ()=>{

    try {

       const userInfo =  await createUserWithEmailAndPassword(auth, email, password);

       await updateProfile (userInfo?.user,{
          displayName : `${userName?.firstName} ${userName?.lastName}`
       });

      setLoading(false);

      
      toast.success("SignUp Successful", {
        style: {
          background: "green",
          color: "white",
        },
      });
      navigate('/')

    } 
    
    catch (error) {

      setLoading(true);

      setLoading(false);
      setUserName({firstName:'', lastName:''});
      setEmail('')
      setPassword('')

      if(error.code === 'auth/email-already-in-use'){
          toast.warning("Email is already exist", {
        style: {
          background: "red",
          color: "white",
        },
      });
      }

      else{
          toast.warning("SomeThing Wrong", {
        style: {
          background: "red",
          color: "white",
        },
      });
      }
    } 
     }, 2000)
  };



  return (
    <div className='lg:w-1/3 max-lg:w-[95%] py-7 px-2 mt-10 text-black  rounded-2xl m-auto bg-white'>
        <div className='px-5 flex items-center mb-5'>
     <NavLink to='/logIn'><FaArrowLeft className='text-black size-5.5'/></NavLink>
    <h1 className='font-bold text-2xl text-end flex-1'>SignUp</h1>
        </div>
    <form onSubmit={handleSignUp} className='w-[90%] text-black m-auto flex flex-col gap-5 *:rounded-2xl'>
      <input type="text" value={userName.firstName} placeholder='FirstName' className={`border-black border-1 p-2 lg:p-3 focus:border-primary`} onChange={(e)=> setUserName((prev)=>({...prev, firstName: e.target.value}))}/>  
      <input type="text" value={userName.lastName} placeholder='LastName' className='border-black border-1 p-2 lg:p-3 focus:border-primary' onChange={(e)=> setUserName((prev)=>({...prev, lastName: e.target.value}))}/>  
      <input  type="email" value={email} className='border-black border-1 p-2 lg:p-3 focus:border-primary' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <div className='flex flex-col'>
      <input type="password" value={password} className='border-black rounded-2xl border-1 p-2 lg:p-3 focus:border-primary' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <div>{ password.length > 0 && ( password.length < 8? <span className='text-red-500 text-sm ml-2'>Password must be at least 8 characters</span>:<span className='text-green-600 text-sm ml-2'>Approved</span>)}</div>
      </div>
      <Button type="submit" disabled={!email || !password || password.length < 8 || !userName.firstName || !userName.lastName || loading}  className={`p-5 text-lg text-white cursor-pointer`}>
        {loading ? (<>Signing Up <Spinner/></>):'Sign Up'}
        </Button>
    </form>
    </div>
  );
};

export default SignUp