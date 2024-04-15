import { createContext, useContext, useState, useRef } from "react";

// Create a context for the shared state
const CanvasContext = createContext();

export const AppProvider = ({ children }) => {
  const [tool, setTool] = useState("rectangle");
  const [selectedElement, setSelectedElement] = useState(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = useState({ x: 0, y: 0 });
  const textAreaRef = useRef();
  const canvaRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState('#50C878');
  const [canvasBackground, setCanvasBackground] = useState('bg-zinc-900');
  
  return (
    <CanvasContext.Provider
      value={{
        elements,
        setElements,
        undo,
        setUndo,
        redo,
        setRedo,
        tool,
        setTool,
        selectedElement,
        setSelectedElement,
        panOffset,
        setPanOffset,
        scale,
        setScale,
        color,
        setColor,
        canvasBackground,
        setCanvasBackground
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => useContext(CanvasContext);
