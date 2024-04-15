// useAppState.js
import { useState, useRef } from "react";
import { useHistory } from "./index.js";
import { usePressedKeys } from "./index.js";


export const useAppState = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("rectangle");
  const [selectedElement, setSelectedElement] = useState(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = useState({ x: 0, y: 0 });
  const textAreaRef = useRef();
  const pressedKeys = usePressedKeys();
  const [scale, setScale] = useState(1);
  const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#50C878");
  const canvaRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [canvasBackground, setCanvasBackground] = useState("bg-zinc-900");


  return {
    elements,
    setElements,
    undo,
    redo,
    action,
    setAction,
    tool,
    setTool,
    selectedElement,
    setSelectedElement,
    panOffset,
    setPanOffset,
    startPanMousePosition,
    setStartPanMousePosition,
    textAreaRef,
    pressedKeys,
    scale,
    setScale,
    scaleOffset,
    setScaleOffset,
    color,
    setColor,
    canvaRef,
    canvasSize,
    setCanvasSize,
    canvasBackground,
    setCanvasBackground,
  };
};