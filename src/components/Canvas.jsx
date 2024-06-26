import {CanvasControls, Menu, Tools} from "./index.js";
import { useMouseEvents,useTextInput,  useAppState, useRenderCanvas, useResizeCanvas, useUndoRedo, usePanFunctionEffect, useTextAreaEffect} 
        from "../hooks/index.js";
import { GrGithub } from "react-icons/gr";
import {useNavigate} from 'react-router-dom'

export const Canvas = () => {
    const navigate = useNavigate();
    // Customs Hooks for UseEffects and State Variables
    const {elements, setElements, undo, redo, action,setAction,
      tool, setTool, selectedElement, setSelectedElement, panOffset,
      setPanOffset, startPanMousePosition, setStartPanMousePosition,
      textAreaRef, pressedKeys, scale, setScale, scaleOffset, setScaleOffset,
      color, setColor, canvaRef, canvasSize, setCanvasSize,
      canvasBackground, setCanvasBackground} = useAppState();

    const {handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd} 
              = useMouseEvents({action, tool, elements, setElements,
                pressedKeys, selectedElement, setSelectedElement,
                panOffset, setPanOffset, startPanMousePosition,
                setAction, scale, scaleOffset, setStartPanMousePosition, color});

    useRenderCanvas({canvaRef, setScaleOffset,elements, action, 
      color, canvasSize, selectedElement,panOffset,scale,});
    
    useResizeCanvas({canvaRef, setCanvasSize});

    useUndoRedo({undo, redo});

    const {AddTextToCanvas} = useTextInput({selectedElement, setAction, color, elements, setElements, setSelectedElement});

    usePanFunctionEffect(setPanOffset);

    useTextAreaEffect(action, selectedElement, textAreaRef);
  

  return (
    <main className="flex overscroll-contain select-none justify-center">

      <Tools tool={tool} setTool={setTool} />

      <CanvasControls undo={undo} redo={redo} scale={scale} setScale={setScale} />

      {action === "writing" ? (
        <input
          type="text"
          ref={textAreaRef}
          onBlur={AddTextToCanvas}
          className=" bg-zinc-700 text-white px-4 py-2 rounded-lg border-2 border-zinc-500 fixed
                        outline-none overflow-hidden whitespace-pre z-[2]"
          style={{
            top: (selectedElement.y1 - 2)*scale + panOffset.y*scale - scaleOffset.y,
            left: selectedElement.x1*scale + panOffset.x * scale - scaleOffset.x,
          }}
        />
      ) : null}

      <Menu color={color} setColor={setColor} setCanvasBackground={setCanvasBackground} canvasBackground={canvasBackground} canvaRef={canvaRef} setElements={setElements} />

      <canvas
        ref ={canvaRef}
        id="canvas"
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`absolute z-[1] ${canvasBackground}`}
      >
        Canvas
      </canvas>

      <div className=" max-md:hidden flex gap-2 border-2 border-zinc-600 items-center py-2 px-4 fixed bottom-2 z-[2] right-2 text-slate-300  overflow-hidden bg-zinc-700 rounded-lg">
        <GrGithub size={30}/> 
        <a href="https://github.com/Saurabh-2003/DoodleHub" target="_blank" rel="noopener noreferrer"
         className="hover:underline cursor-pointer">Created by Saurabh  </a>    
      </div>

      <button 
        onClick={() => navigate('/')}
        className="fixed border border-zinc-500 max-md:px-2 max-md:right-auto max-md:left-2 top-2 right-2 z-[2] bg-zinc-700 text-slate-100 px-4 py-2 rounded-lg hover:opacity-80">
        Logout
      </button>
    </main>
  );
};

export default Canvas;
