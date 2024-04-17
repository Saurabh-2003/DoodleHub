import { AiOutlineSelect} from "react-icons/ai";
import { RiRectangleLine } from "react-icons/ri";
import { IoRemoveOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { IoTextSharp } from "react-icons/io5";
import { BiCircle, BiEraser } from "react-icons/bi";
import { BsSuitDiamond } from "react-icons/bs";
import { useState } from "react";
import { FaTools } from "react-icons/fa";

 export const Tools = ({tool, setTool}) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div  
    className="flex max-md:flex-col-reverse max-md:bottom-2 max-md:top-auto max-md:left-2 max-md:right-auto border-2 border-zinc-600 items-center gap-4 top-2 bg-zinc-700 text-slate-200
     fixed z-[2] px-3 py-2 rounded-lg"
    >
      <FaTools 
      onClick={() => setShowMenu(prev => !prev)}
      size={40} 
      className="hidden border-t border-t-blue-500 max-md:block p-3" />
      <AiOutlineSelect
        id="selection"
        onClick={() => setTool('selection')}
        size={35}
        className={`cursor-pointer ${showMenu ? 'max-md:block' : 'max-md:hidden'}  rounded-lg p-2 ${tool === 'selection' && 'bg-emerald-600'}`}
      />
      <IoRemoveOutline
        size={35} 
        id="line" 
        onClick={() => setTool("line")} 
        className={`cursor-pointer ${showMenu ? 'max-md:block' : 'max-md:hidden'} rounded-lg p-2 ${tool === 'line' && 'bg-emerald-600'}`}
      />
      <RiRectangleLine
        size={35}
        id="rectangle"
        onClick={() => setTool("rectangle")}
        className={`cursor-pointer ${showMenu ? 'max-md:block' : 'max-md:hidden'} rounded-lg p-2 ${tool === 'rectangle' && 'bg-emerald-600'}`}
      />
      <BiCircle
        size={35}
        id="circle"
        onClick={() => setTool("circle")}
        className={`cursor-pointer ${showMenu ? 'max-md:block' : 'max-md:hidden'} rounded-lg p-2 ${tool === 'circle' && 'bg-emerald-600'}`}
      />
      <BsSuitDiamond 
        size={35}
        id="polygon"
        onClick={() => setTool("polygon")}
        className={`cursor-pointer ${showMenu ? 'max-md:block' : 'max-md:hidden'} rounded-lg p-2 ${tool === 'polygon' && 'bg-emerald-600'}`}
      />
      <LuPencil
        size={35}
        id="pencil"
        onClick={() => setTool("pencil")}
        className={`cursor-pointer ${showMenu ? 'max-md:block' : 'max-md:hidden'} rounded-lg p-2 ${tool === 'pencil' && 'bg-emerald-600'}`}
      />
      <BiEraser 
        size={40}
        id="eraser"
        onClick={() => setTool("eraser")}
        className={`cursor-pointer ${showMenu ? 'max-md:block' : 'max-md:hidden'} rounded-lg p-2 ${tool === 'eraser' && 'bg-emerald-600'}`}
      />
      <IoTextSharp
        size={35}
        id="text" 
        onClick={() => setTool("text")} 
        className={`cursor-pointer ${showMenu ? 'max-md:block' : 'max-md:hidden'} rounded-lg p-2 ${tool === 'text' && 'bg-emerald-600'}`}
      />

    </div>
  )
}
