import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import { LuMinus, LuPlus } from "react-icons/lu";

export const CanvasControls = ({scale, setScale, undo, redo}) => {
  return (
    <div className="fixed z-[2] select-none left-2 flex gap-4 bottom-2">
          <div 
            className=" flex gap-2 border-2 border-zinc-600 items-center text-slate-300 overflow-hidden  bg-zinc-700 rounded-lg"
          >
            <span 
              onClick={() => setScale(prev => (prev - .1) < .1 ? .1 : (prev - .1))}
              className="p-3 hover:bg-zinc-600 cursor-pointer"
            >
            <LuMinus /></span>

            <span 
              onClick={() => setScale(1)}
            >
              { (scale * 100).toFixed(0) }%
            </span>

            <span 
            onClick={() => setScale(prev => (prev + .1) > 2 ? 2 : (prev+.1))}
              className="p-3 hover:bg-zinc-600 cursor-pointer"
            >
            <LuPlus /></span>
          </div>

          <div 
            className=" flex border-2 border-zinc-600 text-slate-300  overflow-hidden bg-zinc-700 rounded-lg"
          >
            <span 
              onClick={undo} 
              className="p-3 hover:bg-zinc-600 cursor-pointer"
            >
              <IoArrowUndo /></span>
            <span 
              onClick={redo} 
              className="p-3 hover:bg-zinc-600 cursor-pointer"
            >
            <IoArrowRedo /></span>
          </div>
      </div>
  )
}
