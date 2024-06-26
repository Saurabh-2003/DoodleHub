import {useNavigate} from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Features from './features/Features'
export const  Home = () => {
  const navigate = useNavigate();
  return (
    <main >
      <section className="flex h-dvh flex-col items-center pt-10">
          <button
            className="text-slate-200 mb-10 text-sm gap-2 flex px-4 mt-10 py-2 rounded-full border border-gray-500 bg-slate-700"
          > 
            <span>See What's New</span> |
            <span
              className="text-blue-400 flex gap-2 items-center"
            > Diagrams <FaChevronRight size={12}/></span></button>
          <h1 className="text-7xl max-sm:text-5xl flex flex-col text-center text-slate-800 dark:text-stone-200 font-extrabold">
            <span className="text-[#5356ff]">DoodleHub</span> 
            <span>Where Creativity Runs Wild!</span>
          </h1>

          <h3 className="mt-10 max-sm:text-lg text-2xl text-center flex flex-col items-center text-slate-300">
            Create stunning diagrams, flowcharts, and more with ease!
            <span>Unlimited creativity at your fingertips.</span>
          </h3>
          <button
            onClick={() => navigate('/canvas')}
            className="flex group font-bold mt-10 bg-gray-100 hover:opacity-70 transition duration-300 py-3 px-6 rounded-md text-sm items-center gap-2">
            Let's Doodle  <FaArrowRightLong className='group-hover:translate-x-2 transition-transform duration-300 ease-in-out' />
          </button>
      </section>
        <Features />
    </main>
  );
}