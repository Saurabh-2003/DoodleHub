import { FaChevronDown } from "react-icons/fa";
import { FaArrowRightLong, FaChevronUp } from "react-icons/fa6";
import { BsDiagram3Fill } from "react-icons/bs";
import { SlDocs } from "react-icons/sl";
import { FiArrowUpRight, FiUsers } from "react-icons/fi";
import { useState } from 'react';
import { TbScribble } from "react-icons/tb";
import {useLocation, useNavigate} from "react-router-dom"

const UseCaseMenu = () => {
  return (
    <div className="flex flex-shrink bg-zinc-900 p-8 gap-10 rounded-xl border border-stone-600">
      <div className="flex flex-shrink w-48 flex-col items-start gap-8">
          <h3 className="flex items-center gap-2">
            <BsDiagram3Fill className="text-red-500 bg-red-600/40 p-[4px] rounded-[4px]" size={24}/> 
            <span className="text-stone-500 font-semibold">Diagrams</span>
          </h3>
          <p className="flex flex-col text-stone-300">
            <h4 className=" font-bold text-[16px]">Architechture Designs</h4>
            <h5>Create diagrams at the speed of thoughts.</h5>
          </p>
          <p className="flex flex-col text-stone-300">
            <h4 className=" font-bold text-[16px]">Data Flow Diagrams</h4>
            <h5>Express data flow using diagram-as-code</h5>
          </p>
      </div>
      <div className="flex max-sm:hidden flex-shrink w-48 flex-col items-start gap-8">
          <h3 className="flex  items-center gap-2">
            <SlDocs className="text-sky-500 bg-sky-600/40 p-[4px] rounded-[4px]" size={24}/> 
            <span className="text-stone-500 font-semibold">Docs</span>
          </h3>
          <p className="flex flex-col text-stone-300">
            <h4 className=" font-bold text-[16px]">Design Docs</h4>
            <h5>Collaborate on technical design docs</h5>
          </p>
          <p className="flex flex-col text-stone-300">
            <h4 className=" font-bold text-[16px]">Documentation</h4>
            <h5>Create highly consumable visual docs</h5>
          </p>
      </div>
      <div className="flex max-sm:hidden  flex-shrink  w-48 flex-col items-start gap-8">
          <h3 className="flex items-center gap-2">
            <FiUsers className="text-green-500 bg-green-600/40 p-[4px] rounded-[4px]" size={24}/> 
            <span className="text-stone-500 font-semibold">Collaboration</span>
          </h3>
          <p className="flex flex-col text-stone-300">
            <h4 className=" font-bold text-[16px]">Brainstorming</h4>
            <h5>Hold high-bandwidth visula conversations</h5>
          </p>
          <p className="flex flex-col text-stone-300">
            <h4 className=" font-bold text-[16px]">Wireframes</h4>
            <h5>Create beautiful lo-fi wireframes</h5>
          </p>
      </div>
    </div>
  )
}



const AboutMenu = () => {
  

  return (
    <div className="flex flex-col gap-1 hover:[&>button]:bg-white/10 font-semibold w-60 p-2 rounded-xl border border-stone-700 bg-zinc-900">
      <a href="https://github.com/Saurabh-2003/DoodleHub" target="_blank" rel="noopener noreferrer" className="py-2 px-2 transition duration-300 flex w-full items-center justify-between">
        Github<FiArrowUpRight />
      </a>
    </div>
  );
  
}


export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  if(pathname.includes('canvas') || pathname.includes('features')){
    return null;
  }


  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleMenuHover = (menu) => {
    setOpenMenu(menu);
  };

  const handleMenuLeave = () => {
    setOpenMenu(null);
  };

  return (
        <div className="flex justify-between max-sm:px-2 px-16 text-sm py-4 backdrop-blur-md items-center  text-stone-100">
            <div className="flex gap-[4vw] items-center">
               <h1 className="text-[#5356FF]"><TbScribble size={40}/></h1>
              <div className="flex text-stone-300 items-center gap-[2vw]">
                  
                  <span
                    className="flex flex-col relative group cursor-pointer items-center gap-2"
                    onClick={() => handleMenuClick('useCases')}
                    onMouseEnter={() => handleMenuHover('useCases')}
                  >
                    <div className="flex gap-2 group-hover:text-stone-400 items-center">
                      Use Cases
                      <FaChevronUp
                        className={` transition duration-300 ${
                          openMenu === 'useCases' ? 'rotate-180' : ''
                        }`}
                        size={12}
                      />
                    </div>
                    {openMenu === 'useCases' && (
                      <div onMouseLeave={handleMenuLeave} className="absolute top-10 -left-10 w-max">
                        <UseCaseMenu />
                      </div>
                    )}
                  </span>


                  <span
                    className="flex relative group cursor-pointer items-center gap-2"
                    onClick={() => handleMenuClick('about')}
                    onMouseEnter={() => handleMenuHover('about')}
                    
                  >
                    <div className="flex group-hover:text-stone-400 gap-2 items-center">
                      About
                      <FaChevronUp
                        className={` transition duration-300 ${
                          openMenu === 'about' ? 'rotate-180' : ''
                        }`}
                        size={12}
                      />
                    </div>
                    {openMenu === 'about' && (
                      <div onMouseLeave={handleMenuLeave} className="absolute top-10 -left-10 h-fit w-max">
                        <AboutMenu />
                      </div>
                    )}
                  </span>
                  
              </div>
            </div>
            <div className="flex items-center gap-[2vw]">
              <button
               onClick={() => navigate('/canvas')}
               className="flex bg-gray-100 font-bold hover:opacity-70 transition duration-300 group text-gray-700 py-2 px-4 rounded-md text-sm items-center gap-2">
                Get Started <FaArrowRightLong className='group-hover:translate-x-2 transition-transform duration-300 ease-in-out' />
              </button>
            </div>
       </div>
  )
}