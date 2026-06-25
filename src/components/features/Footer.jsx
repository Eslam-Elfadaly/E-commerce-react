import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { CiLinkedin  } from "react-icons/ci";
import { CiFacebook  } from "react-icons/ci";

import { Link } from "react-router";
function Footer() {
const categories = ['Smartphones','Tablets','Mobile-Accessories','Laptops','Men\'s Watches','Women\'s Watches'];
  return (
    
    <div className=" bg-background mt-5">
        <div className="lg:max-w-10/12 m-auto">
        <ul className="grid lg:grid-cols-4 max-lg:grid-cols-2 lg:gap-2.5 lg:*:flex lg:*:items-center lg:*:gap-3 border-b-2 *:p-5 *:hover:bg-secondary *:flex *:flex-col *:items-center text-center">
            <li>
                <IoLocationOutline className="size-6"/>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-bold">Visit Us</h1>
                    <span>New Orlean, USA</span>
                </div>
            </li>
            <li>
                    <FaPhoneAlt className="size-5.5"/>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-bold">Call Us</h1>
                    <span>+20 1095198247</span>
                </div>
            </li>
            <li>
                    <FaRegClock className="size-5.5"/>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-bold">Working Hours</h1>
                    <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                </div>
            </li>
            <li>
                <a href="mailto:eslamelfadaly2@gmail.com" target="_self" className="flex flex-col items-center cursor-pointer">
                    <MdOutlineMail className="size-6"/>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-bold">Email Us</h1>
                    <span>eslam2@gmail.com</span>
                </div>
                </a>
            </li>
        </ul>

        <div className=" grid grid-cols-4 max-lg:grid-cols-1 max-lg:p-3 gap-7 mt-15 border-b-2 lg:pb-15">
            <div className="info max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center">
                <Link to='/' className="max-lg:flex-1 w-fit lg:text-start max-lg:ml-3 ">
            <h1 className="logo font-bold text-2xl w-fit text-start hover:text-primary hover:*:text-foreground transition-all duration-300 cursor-pointer" onClick={()=>{
          window.scrollTo({
            top:0,
            right:0,
            behavior:'smooth'
          })
        }}>
                TECHNO
                <span className="text-primary transition-all duration-300">X</span>
            </h1>
            </Link>
            
            <p>Discover curated furniture collections at Tulos, blending style and comfort to elevate your living spaces.</p>

            <ul className="flex gap-2 **:size-6.5 mt-2 **:hover:text-primary ">
                <li><a href="www.linkedin.com/in/eslam-elfadaly-b40a02286"><CiLinkedin/></a></li>
                <li><a href="https://www.facebook.com/ESLAM.ELFADALY95"><CiFacebook /></a></li>
            </ul>
            </div>

            <div className="links border-b-1 pb-5">
                <h1 className="text-[17px] font-bold mb-5">Quick Links</h1>

                <ul className="flex flex-col gap-3 **:hover:text-primary">
                    <Link to='/about'><li>About us</li></Link>
                    <Link to='/contactUs'><li>Contact us</li></Link>
                    <Link to='/terms'><li>Terms & Conditions</li></Link>
                </ul>
            </div>

            <div className="Categories border-b-1 pb-5">
                <h1 className="text-[17px] font-bold mb-5">Categories</h1>

                <ul className="flex flex-col gap-3 **:hover:text-primary">
                    {categories.map((p,index)=>{
                        return(
                            <Link key={index} to={`/category/${p.toLocaleLowerCase()}`} onClick={()=>{
                                window.scrollTo({
                                    top:0,
                                    left:0,
                                    behavior:'smooth'
                                })
                            }}><li >{p}</li></Link>
                        )
                    })}
                </ul>

            </div>

            <div className="Newsletter ">
                <h1 className="text-[17px] font-bold mb-5">Newsletter</h1>
                <p className="mb-4">Subscribe to our newsletter to receive updates and exclusive offers.</p>

                <input type="email" placeholder="Enter Your Email" className="border-foreground border-2 rounded-lg text-foreground py-2 px-3 w-full mb-4 cursor-pointer"/>
                <button className="w-full bg-foreground text-background text-lg font-bold p-1 rounded-lg hover:bg-foreground/80 cursor-pointer">Subscribe</button>
            </div>
        </div>

        <div className=" flex justify-center items-center gap-1 lg:py-7 max-lg:py-5">
             &copy; 2026
            <Link to='/' className="w-fit lg:text-start">
            <h1 className="logo font-bold  w-fit text-start hover:text-primary hover:*:text-foreground transition-all duration-300 cursor-pointer" onClick={()=>{
          window.scrollTo({
            top:0,
            right:0,
            behavior:'smooth'
          })
        }}>
                TECHNO
                <span className="text-primary transition-all duration-300">X. </span>
            </h1>
            </Link>
            All rights reserved.
            </div>
        </div>
    </div>
  )
}

export default Footer