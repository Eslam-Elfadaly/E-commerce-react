import blog1 from '@/assets/46337e7fdcb85e58ec7f05bda7f6cba6fd9bb806-820x580.webp'
import blog2 from '@/assets/467c6b11b2b22d1d3823289b3e3c498097c0fe66-820x580.webp'
import blog3 from '@/assets/155da172677166e565ec4aad95efb3855769d293-820x580.webp'
import blog4 from '@/assets/07d0227deaebc8aca5dca95f2eb917ba73e329b5-820x580.webp'
import { Calendar } from 'lucide-react';
import { NavLink } from 'react-router';

function CompanyNews() {
  return (
    <div className='blog lg:max-w-10/12 m-auto max-lg:px-2 flex max-lg:flex-col gap-5 lg:gap-7 max-lg:items-center mb-10 mt-2 lg:mt-15'>

            <div className='flex-2'>
            <img src={blog3} alt="" className='w-full lg:h-130 mb-5'/>

            <div className='flex items-center gap-5  lg:text-sm font-bold *:transition-all *:duration-200 mb-5'>
              <span className='text-primary border-b-2 border-gray-400 hover:border-primary active:border-primary'>Company News</span>
              <span className='flex items-center gap-1 border-b-2 border-gray-400 text-gray-400 hover:text-primary hover:border-primary active:text-primary active:border-primary'><Calendar className='size-4'/>February 19, 2025</span>
            </div>

            <h1 className='text-xl lg:text-2xl font-bold mb-3'>We Invite You to These Wonderful Wine Tasting Events</h1>

            <p className='flex flex-col gap-3'> 
              <span>Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships named “Enterprise.”</span>
              <span>The game’s not big enough unless it scares you a little. Wait a minute – you’ve been declared dead. You can’t give orders around here. I’ll alert the crew. What? We’re not at all alike! Flair is what marks the difference between artistry and mere competence.</span> 
            </p>
            </div>



            <div className='flex-1'>
                <div className="blogCategory border-2 p-6 mb-4">
                    <h1 className='font-bold text-xl mb-2'>Blog Categories</h1>
                    <ul className='flex flex-col gap-1 list-disc pl-3'>
                        <li>Lifestyle</li>
                        <li>Social Media</li>
                        <li>Company News</li>
                        <li>Electronics</li>
                    </ul>
                </div>

                <div className="latestBlog border-2 p-6">
                    <h1 className='font-bold text-xl mb-4'>Latest Blogs</h1>

                    <ul className='flex flex-col gap-5 *:not-last:border-b-1 *:not-last:pb-5'>

                        <NavLink to='/blog/Lifestyle'>
                        <li className='flex items-center gap-3 group hover:text-primary *:transition-all *:duration-300'>
                            <img src={blog1} alt="" className='group-hover:border-primary group-hover:border-1 lg:size-18 max-lg:size-16 rounded-full'/>
                            <p>Office rental agency or direct? Which is best when renting an...</p>
                        </li>
                        </NavLink>

                        <NavLink to='/blog/SocialMedia'>
                        <li className='flex items-center gap-3 group hover:text-primary *:transition-all *:duration-300'>
                            <img src={blog2} alt="" className='group-hover:border-primary group-hover:border-1 size-18 max-lg:size-16 rounded-full'/>
                            <p>Lotus Electronics – New Store Launch in Bhilai, Chhattisgarh</p>
                        </li>
                        </NavLink>

                        <NavLink to='/blog/Electronics'>
                        <li className='flex items-center gap-3 group hover:text-primary *:transition-all *:duration-300'>
                            <img src={blog4} alt="" className='group-hover:border-primary group-hover:border-1 size-18 max-lg:size-16 rounded-full' />
                            <p>10 French Wine Regions to Visit for Amazing Views and Del...</p>
                        </li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
  )
}

export default CompanyNews