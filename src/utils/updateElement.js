// updateElement.js
import { createElement } from "./createElement";

export const updateElement = (elements, setElements, id, x1, y1, x2, y2, type, color, options) => {
  const elementsCopy = [...elements];
  const c = elementsCopy[id].coll ? elementsCopy[id].coll : color;
  switch (type) {
    case "line":
    case "rectangle":
    case "polygon":
      elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, c);
      break;
    case "pencil":
      elementsCopy[id].coll = c;
      elementsCopy[id].points = [...elementsCopy[id].points, { x: x2, y: y2 }];
      break;
    case "circle":
      elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, c);
      break;
    case "text":
      elementsCopy[id].coll = c;
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
