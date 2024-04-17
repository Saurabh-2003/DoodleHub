import { BiTrash } from "react-icons/bi"
import { FaFileImage } from "react-icons/fa"
import { BsFillBrushFill } from "react-icons/bs";
import { useState } from "react";
export const Menu = ({color, setColor, setCanvasBackground, canvasBackground, canvaRef, setElements}) => {
    const colors = ['bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-yellow-500', 'bg-red-500'];
    const canvasBg = ['bg-white', 'bg-gray-800', 'bg-zinc-900', 'bg-stone-800', 'bg-indigo-950'];
    const tailwindColors = {
        'bg-violet-500': '#7F00FF',
        'bg-sky-500': '#00BFFF',
        'bg-emerald-500': '#50C878',
        'bg-yellow-500': '#FFFF00',
        'bg-red-500': '#FF4500'
      };

    const canvasBgHex = {
        'bg-white': '#FFFFFF',
        'bg-gray-800': '#1F2937',
        'bg-zinc-900': '#18181b',
        'bg-stone-800': '#1c1917',
        'bg-indigo-950': '#1e1b4b'
      };

    const [showColorsMenu, setShowColorsMenu] = useState(false);
    
     const downloadCanvasImage = () => {
        const canvas = canvaRef.current;
        const link = document.createElement('a');
        link.download = 'canvas_image.png';
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = canvasBgHex[canvasBackground];
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
      };
    
     const handleClearCanvas = () => {
        const canvas = canvaRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setElements([])
      };

    return (
      <div className={`flex ${showColorsMenu && 'w-fit'} transition-all duration-500 max-md:flex-col-reverse max-md:top-auto max-md:bottom-2 max-md:left-auto max-md:right-2 border-2 border-zinc-600 flex-col gap-4 h-fit p-4 fixed w-48 bg-zinc-700 z-[2] top-2 rounded-xl left-2`}>
        
        <BsFillBrushFill 
        onClick={()=> setShowColorsMenu(prev => !prev)}
          className={`ml-auto rounded-lg  hidden max-md:block text-slate-200 `}
        size={25} />
          
      <div className={`flex flex-col gap-4 ${showColorsMenu && 'max-md:hidden'}`}>
        <label className="text-xs font-bold text-slate-200">Stroke</label>
            <div className="flex w-full gap-2 flex-wrap items-center justify-center">
            {
              colors.map((c) => (
                <span 
                  key={c} 
                  onClick={() => setColor(tailwindColors[c])}
                  className={`${c}  ${tailwindColors[c] === color && `border-2`} rounded-md size-6`}
                ></span>
              ))
            }
            </div>

            <label className="text-xs font-bold text-slate-200">Background</label>
            <div className="flex w-full gap-2 flex-wrap items-center justify-center">
            {
              canvasBg.map((c) => (
                <span key={c} 
                onClick={() => setCanvasBackground(c)}
                className={`${c} ${c === canvasBackground && "border-2"} rounded-md size-6`}></span>
              ))
            }
            </div>

            <button 
              onClick={() => handleClearCanvas({canvaRef, setElements})} 
              className="w-full flex items-center px-4 gap-2 rounded-lg text-xs py-1 border-2 border-slate-300 bg-white text-black hover:bg-slate-300">
              <BiTrash size={20} />Reset Canvas
            </button>

            <button 
              onClick={() =>downloadCanvasImage({canvaRef, canvasBackground})} 
              className="w-full flex items-center px-4 gap-2 rounded-lg text-xs py-1 border-2 border-blue-400 bg-blue-500 text-white hover:opacity-80">
                <FaFileImage size={20} />Save as Image
            </button>
      </div>
        
      </div>
  )
}
