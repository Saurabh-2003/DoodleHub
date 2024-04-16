// useTextInput.js
import { updateElement } from "../utils";

export const useTextInput = ({ selectedElement, color, elements, setElements, setAction, setSelectedElement }) => {

  const AddTextToCanvas = event => {
    if (selectedElement) {
      const { id, x1, y1, type } = selectedElement;

      const x2 = selectedElement.x2 || x1;
      const y2 = selectedElement.y2 || y1;

      setAction("none");
      setSelectedElement(null);
      updateElement(elements, setElements,id, x1, y1, x2, y2, type, color, { text: event.target.value });
    } else {
      console.error("No element selected when handleBlur was called");
    }
  };

  return { AddTextToCanvas };
};

