import  { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import {CanvasControls, Menu, Tools} from "./components/index.js";
import { usePressedKeys, useResizeCanvas, useUndoRedo, useHistory} 
        from "./hooks/index.js";
import {adjustElementCoordinates, resizedCoordinates, drawElement, 
        cursorForPosition, getElementAtPosition, createElement} 
        from "./utils/index.js";
import { GrGithub } from "react-icons/gr";
const adjustmentRequired = type => ["line", "rectangle", "circle", "polygon"].includes(type);



const App = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("rectangle");
  const [selectedElement, setSelectedElement] = useState(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = useState({ x: 0, y: 0 });
  const textAreaRef = useRef();
  const pressedKeys = usePressedKeys();
  const [scale, setScale] = useState(1);
  const [scaleOffset, setScaleOffset] = useState({x:0, y:0});
  const [color, setColor] = useState('#50C878');
  const canvaRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [canvasBackground, setCanvasBackground] = useState('bg-zinc-900')

  useLayoutEffect(() => {
    const canvas = canvaRef.current;
    const context = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);

    const scaledWidth = canvas.width *scale;
    const scaledHeight = canvas.height *scale;
    const scaleOffsetX = (scaledWidth - canvas.width)/2;
    const scaleOffsetY = (scaledHeight - canvas.height)/2;
    setScaleOffset({x:scaleOffsetX, y:scaleOffsetY})
    context.save();
    context.translate(
      panOffset.x * scale - scaleOffsetX , 
      panOffset.y * scale - scaleOffsetY
    );
    context.scale(scale, scale);

    elements.forEach(element => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element, color);
    });
    context.restore();
  }, [elements, action, color, canvasSize, selectedElement, panOffset, scale]);

  useResizeCanvas({canvaRef, setCanvasSize});

  // UNdo and redo drawing on canvas with ctrl + z shortcut
  useUndoRedo({undo, redo});

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
  }, []);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing") {
      setTimeout(() => {
        textArea.focus();
        textArea.value = selectedElement.text;
      }, 0);
    }
  }, [action, selectedElement]);

  
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

  const getMouseCoordinates = event => {
    const clientX = (event.clientX - panOffset.x*scale + scaleOffset.x)/scale;
    const clientY = (event.clientY - panOffset.y*scale + scaleOffset.y)/scale;
    return { clientX, clientY };
  };

  const handleMouseDown = event => {
    if (action === "writing") return;

    const { clientX, clientY } = getMouseCoordinates(event);

    if (event.button === 1 || pressedKeys.has(" ")) {
      setAction("panning");
      setStartPanMousePosition({ x: clientX, y: clientY });
      document.body.style.cursor = "grabbing";
      return;
    }

    if (tool === "eraser") {
      const { clientX, clientY } = getMouseCoordinates(event);
      // Get the element at the mouse position
      const element = getElementAtPosition(clientX, clientY, elements);
      // If an element is found, remove it from the canvas
      if (element) {
        const updatedElements = elements.filter(el => el.id !== element.id);
        setElements(updatedElements);
      }
    } 
    else if (tool === "eraser") {
      setAction("erasing");
    }
    else if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        if (element.type === "pencil") {
          const xOffsets = element.points.map(point => clientX - point.x);
          const yOffsets = element.points.map(point => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements(prevState => prevState);

        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    }else if (tool === "circle") {
      const id = elements.length;
      const element = createElement(id, clientX, clientY, clientX, clientY, tool);
      setElements(prevState => [...prevState, element]);
      setSelectedElement(element);
      setAction("drawing");
    } else {
      const id = elements.length;
      const element = createElement(id, clientX, clientY, clientX, clientY, tool);
      setElements(prevState => [...prevState, element]);
      setSelectedElement(element);

      setAction(tool === "text" ? "writing" : "drawing");
    }
  };
  

  const handleMouseMove = event => {
    const { clientX, clientY } = getMouseCoordinates(event);

    if (tool === "eraser") {
      const element = getElementAtPosition(clientX, clientY, elements);
      // If the pointer is over an element, change cursor to indicate erasing
      if (element) {
        event.target.style.cursor = "no-drop"; // or any other suitable cursor style
      } else {
        event.target.style.cursor = "default"; // set default cursor if not over an element
      }
    }

    if (action === "panning") {
      const deltaX = clientX - startPanMousePosition.x;
      const deltaY = clientY - startPanMousePosition.y;
      setPanOffset({
        x: panOffset.x + deltaX,
        y: panOffset.y + deltaY,
      });
      return;
    }

    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element ? cursorForPosition(element.position) : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      // Update the second point (x2, y2) dynamically based on the mouse position
      updateElement(index, x1, y1, clientX, clientY, tool);
    }
     else if (action === "moving") {
      if (selectedElement.type === "pencil") {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const safeOffsetX = offsetX ?? 0;
        const safeOffsetY = offsetY ?? 0;
        const newX1 = clientX - safeOffsetX;
        const newY1 = clientY - safeOffsetY;
        // 🫐 Calculate the new position for x2 and y2 based on the original size
        const newX2 = newX1 + (x2 - x1);
        const newY2 = newY1 + (y2 - y1);
        const options =
          type === "text" && selectedElement.text
            ? { text: selectedElement.text }
            : undefined;
        updateElement(id, newX1, newY1, newX2, newY2, type, options);
      }
    } else if (action === "resizing") {
          const { id, type, position, ...coordinates } = selectedElement;
          const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, position, coordinates);
          updateElement(id, x1, y1, x2, y2, type);
  }
  };

  const handleMouseUp = event => {
    const { clientX, clientY } = getMouseCoordinates(event);

    if (selectedElement) {
      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (
        (action === "drawing" || action === "resizing") &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type);
      }

      const offsetX = selectedElement.offsetX || 0;
      const offsetY = selectedElement.offsetY || 0;

      if (
        selectedElement.type === "text" &&
        clientX - offsetX === selectedElement.x1 &&
        clientY - offsetY === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }
    }

    if (action === "writing") {
      return;
    }

    if (action === "panning") {
      document.body.style.cursor = "default";
    }

    setAction("none");
    setSelectedElement(null);
  };

  const AddTextToCanvas = event => {
    if (selectedElement) {
      const { id, x1, y1, type } = selectedElement;

      const x2 = selectedElement.x2 || x1;
      const y2 = selectedElement.y2 || y1;

      setAction("none");
      setSelectedElement(null);
      updateElement(id, x1, y1, x2, y2, type, { text: event.target.value });
    } else {
      console.error("No element selected when handleBlur was called");
    }
  };


  

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
