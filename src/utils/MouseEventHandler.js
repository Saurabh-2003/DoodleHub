import { positionWithinElement } from "./index";
import { createElement } from "./createElement";
import { adjustElementCoordinates } from "./adjustElementCoordinates";
import { updateElement } from "./updateElement";

// Utility functions for handling mouse events

const getElementAtPosition = (x, y, elements) => {
  return elements
    .map(element => ({ ...element, position: positionWithinElement(x, y, element) }))
    .find(element => element.position !== null);
};

const cursorForPosition = position => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null; //should not really get here...
  }
};

const adjustmentRequired = type => ["line", "rectangle", "circle", "polygon"].includes(type);

// Function to get mouse coordinates accounting for pan and scale

const getMouseCoordinates = (event, panOffset, scaleOffset, scale) => {
  const clientX = (event.clientX - panOffset.x * scale + scaleOffset.x) / scale;
  const clientY = (event.clientY - panOffset.y * scale + scaleOffset.y) / scale;
  return { clientX, clientY };
};

// Event handlers
  
  export const handleMouseDown = (event, action, tool, elements, setElements, selectedElement, setSelectedElement, setAction, setStartPanMousePosition, setPanOffset, pressedKeys, panOffset, scale, scaleOffset) => {
    if (action === "writing") return;

    const { clientX, clientY } = getMouseCoordinates(event, panOffset, scaleOffset, scale);

    if (event.button === 1 || pressedKeys.has(" ")) {
      setAction("panning");
      setStartPanMousePosition({ x: clientX, y: clientY });
      document.body.style.cursor = "grabbing";
      return;
    }

    if (tool === "selection") {
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

  export const handleMouseUp = (event, action, tool, elements, setElements, selectedElement, setSelectedElement, setAction, panOffset, scale, scaleOffset, color) => {
    const { clientX, clientY } = getMouseCoordinates(event, panOffset, scaleOffset, scale);

    if (selectedElement) {
      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (
        (action === "drawing" || action === "resizing") &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type, color, elements, setElements);
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
  
  export const handleMouseMove = (event, action, tool, elements, setElements, selectedElement, setSelectedElement, setAction, panOffset, scale, scaleOffset, color, startPanMousePosition, setPanOffset) => {
    const { clientX, clientY } = getMouseCoordinates(event, panOffset, scaleOffset, scale);

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
      updateElement(index, x1, y1, clientX, clientY, tool, color, elements, setElements);
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
        updateElement(id, newX1, newY1, newX2, newY2, type, options, color, elements, setElements);
      }
    } else if (action === "resizing") {
      if (selectedElement.type === "circle" || selectedElement.type === 'polygon') {
          const deltaX = clientX - selectedElement.x1;
          const deltaY = clientY - selectedElement.y1;
          const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const id = selectedElement.id;
          const type = selectedElement.type;
          const x1 = selectedElement.x1;
          const y1 = selectedElement.y1;
          const x2 = x1 + radius;
          const y2 = y1;
          updateElement(id, x1, y1, x2, y2, type, color, elements, setElements);
      } else {
          const { id, type, position, ...coordinates } = selectedElement;
          const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, position, coordinates);
          updateElement(id, x1, y1, x2, y2, type, color, elements, setElements);
      }
  }
  };
  