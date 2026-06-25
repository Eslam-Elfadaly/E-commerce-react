import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function handleName(value){
        setName(value)
    }

    function handleEmail(value){
        setEmail(value)
    }

    function handleMessage(value){
        setMessage(value)
    }


const sendEmail = async (e) => {
  e.preventDefault();
  
  setLoading(true);

  setTimeout( async ()=>{

      try {
          
          
          await emailjs.send(
              'service_vofr6mg',
              'template_h89qgzg',
              {
                  name: name,
                  email: email,
                  message: message,
                },
                'VL3E9mdxSLhptj_dB'
            );
            
            toast.success("Message Sent ✅",{style:{
                backgroundColor:'green',
                color:'white'
            }});
            setLoading(false);
            setEmail('');
            setName('');
            setMessage('');
        }
            
    catch (error) {
        console.log(error)
    toast.error("Failed To Send ❌",{style:{
        backgroundColor:'red',
        color:'white'
    }});
}
}, 1500)
};

  return (
    <div className="lg:max-w-1/3 m-auto lg:mt-10 mb-10 mt-5 max-lg:p-2">
        <h1 className="font-bold text-2xl mb-3">Contact Us</h1>
        <p className="mb-5">We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.</p>

        <form onSubmit={sendEmail} className="flex flex-col gap-3">
            <label htmlFor="name" className="flex flex-col ">
                <span className="font-bold text-lg">Name</span>
                <input type="text" value={name} onChange={(e)=> handleName(e.target.value)} id='name' className="rounded-2xl border-foreground border-1 p-2"/>
            </label>

            <label htmlFor="email" className="flex flex-col">
                <span className="font-bold text-lg">Email</span>
                <input type="email" value={email} onChange={(e)=> handleEmail(e.target.value)} id='email' className="rounded-2xl border-foreground border-1 p-2"/>
            </label>

            <label htmlFor="message" className="flex flex-col">
                <span className="font-bold text-lg">Message</span>
                <textarea type="text" value={message} onChange={(e)=> handleMessage(e.target.value)}  id='message' className="rounded-2xl border-foreground border-1 p-2 h-30"/>
            </label>

            <Button disabled={loading || !name || !email || !message} className='w-fit p-5 text-lg rounded-md cursor-pointer'>{loading? (<>Sending Message <Spinner/></>):'Send Message'}</Button>
        </form>
    </div>
  )
}

export default ContactUs