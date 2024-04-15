import { AiOutlineSelect} from "react-icons/ai";
import { RiRectangleLine } from "react-icons/ri";
import { IoRemoveOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { IoTextSharp } from "react-icons/io5";
import { BiCircle, BiEraser } from "react-icons/bi";
import { BsSuitDiamond } from "react-icons/bs";

 export const Tools = ({tool, setTool}) => {

  return (
    <div  
    className="flex border-2 border-zinc-600 items-center gap-4 top-2 bg-zinc-700 text-slate-200
     fixed z-[2] px-3 py-2 rounded-lg"
    >
      <AiOutlineSelect
        id="selection"
        onClick={() => setTool('selection')}
        size={35}
        className={`cursor-pointer rounded-lg p-2 ${tool === 'selection' && 'bg-emerald-600'}`}
      />
      <IoRemoveOutline
        size={35} 
        id="line" 
        onClick={() => setTool("line")} 
        className={`cursor-pointer rounded-lg p-2 ${tool === 'line' && 'bg-emerald-600'}`}
      />
      <RiRectangleLine
        size={35}
        id="rectangle"
        onClick={() => setTool("rectangle")}
        className={`cursor-pointer rounded-lg p-2 ${tool === 'rectangle' && 'bg-emerald-600'}`}
      />
      <BiCircle
        size={35}
        id="circle"
        onClick={() => setTool("circle")}
        className={`cursor-pointer rounded-lg p-2 ${tool === 'circle' && 'bg-emerald-600'}`}
      />
      <BsSuitDiamond 
        size={35}
        id="polygon"
        onClick={() => setTool("polygon")}
        className={`cursor-pointer rounded-lg p-2 ${tool === 'polygon' && 'bg-emerald-600'}`}
      />
      <LuPencil
        size={35}
        id="pencil"
        onClick={() => setTool("pencil")}
        className={`cursor-pointer rounded-lg p-2 ${tool === 'pencil' && 'bg-emerald-600'}`}
      />
      <BiEraser 
        size={40}
        id="eraser"
        onClick={() => setTool("eraser")}
        className={`cursor-pointer rounded-lg p-2 ${tool === 'eraser' && 'bg-emerald-600'}`}
      />
      <IoTextSharp
        size={35}
        id="text" 
        onClick={() => setTool("text")} 
        className={`cursor-pointer rounded-lg p-2 ${tool === 'text' && 'bg-emerald-600'}`}
      />

    </div>
  )
}
