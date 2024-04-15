// useMouseEvents.js
import { getElementAtPosition, adjustElementCoordinates, resizedCoordinates, cursorForPosition, createElement } from "../utils/index.js";

const adjustmentRequired = type => ["line", "rectangle", "circle", "polygon"].includes(type);

export const useMouseEvents = ({
  action,
  tool,
  elements,
  setElements,
  pressedKeys,
  selectedElement,
  setSelectedElement,
  panOffset,
  setPanOffset,
  startPanMousePosition,
  setAction,
  scale,
  scaleOffset,
  setStartPanMousePosition,
  updateElement
}) => {

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
          const element = getElementAtPosition(clientX, clientY, elements);
          if (element) {
            const updatedElements = elements.filter(el => el.id !== element.id);
            setElements(updatedElements);
          }
          setAction("erasing");
        } else if (tool === "selection") {
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
        } else if (tool === "circle") {
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
          if (element) {
            event.target.style.cursor = "no-drop";
          } else {
            event.target.style.cursor = "default";
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
          updateElement(index, x1, y1, clientX, clientY, tool);
        } else if (action === "moving") {
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

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};
