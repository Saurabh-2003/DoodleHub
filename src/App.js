import  { useEffect} from "react";
import {CanvasControls, Menu, Tools} from "./components/index.js";
import { useMouseEvents,  useAppState, useRenderCanvas, useResizeCanvas, useUndoRedo} 
        from "./hooks/index.js";
import { createElement} 
        from "./utils/index.js";
import { GrGithub } from "react-icons/gr";
import useTextInput from "./hooks/useTextInput.jsx";


const App = () => {
    const {elements, setElements, undo, redo, action,setAction,
      tool, setTool, selectedElement, setSelectedElement, panOffset,
      setPanOffset, startPanMousePosition, setStartPanMousePosition,
      textAreaRef, pressedKeys, scale, setScale, scaleOffset, setScaleOffset,
      color, setColor, canvaRef, canvasSize, setCanvasSize,
      canvasBackground, setCanvasBackground} = useAppState();
    
      const updateElement = (id, x1, y1, x2, y2, type, options) => {
        const elementsCopy = [...elements];
        const c = elementsCopy[id].coll ? elementsCopy[id].coll : color
        switch (type) {
          case "line":
          case "rectangle":
          case "polygon":
            elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, c);
            break;
          case "pencil":
            elementsCopy[id].coll = c
            elementsCopy[id].points = [...elementsCopy[id].points, { x: x2, y: y2 }];
            break;
          case "circle":
              elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, c);
              break;
          case "text":
            elementsCopy[id].coll = c
            const textWidth = document
              .getElementById("canvas")
              .getContext("2d")
              .measureText(options.text).width;
            const textHeight = 24;
            elementsCopy[id] = {
              ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type, c),
              text: options.text,
            };
            break;
          default:
            throw new Error(`Type not recognised: ${type}`);
        }
    
        setElements(elementsCopy, true);
      };

    const {handleMouseDown, handleMouseMove, handleMouseUp} 
              = useMouseEvents({action, tool, elements, setElements,
                pressedKeys, selectedElement, setSelectedElement,
                panOffset, setPanOffset, startPanMousePosition,
                setAction, scale, scaleOffset, setStartPanMousePosition, updateElement});

    useRenderCanvas({canvaRef, setScaleOffset,elements, action, 
      color, canvasSize, selectedElement,panOffset,scale,});
    
    useResizeCanvas({canvaRef, setCanvasSize});

    useUndoRedo({undo, redo});

    const {AddTextToCanvas} = useTextInput({selectedElement, updateElement, setAction, setSelectedElement});



  useEffect(() => {
    const panFunction = event => {
      setPanOffset(prevState => ({
        x: prevState.x - event.deltaX,
        y: prevState.y - event.deltaY,
      }));
    };

    document.addEventListener("wheel", panFunction);
    return () => {
      document.removeEventListener("wheel", panFunction);
    };
  }, [setPanOffset]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing") {
      setTimeout(() => {
        textArea.focus();
        textArea.value = selectedElement.text;
      }, 0);
    }
  }, [action, selectedElement, textAreaRef]);
  

  return (
    <main className="flex select-none justify-center">

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
        className={`absolute z-[1] ${canvasBackground}`}
      >
        Canvas
      </canvas>

      <div className=" flex gap-2 border-2 border-zinc-600 items-center py-2 px-4 fixed bottom-2 z-[2] right-2 text-slate-300  overflow-hidden bg-zinc-700 rounded-lg">
        <GrGithub size={30}/> Created by Saurabh      
      </div>

    </main>
  );
};

export default App;
