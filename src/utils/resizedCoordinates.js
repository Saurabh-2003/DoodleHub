
export const resizedCoordinates = (clientX, clientY, position, coordinates) => {
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
        return { x1, y1, x2: clientX, y2: (clientY) };
      case "vertex_0":
        return { x1: clientX, y1, x2, y2 };
      case "vertex_1":
        return { x1, y1, x2, y2: clientY < y2 ? Math.abs(2 * y1 - clientY): clientY };
      case "vertex_2":
        return { x1, y1, x2:clientX, y2 };
      case "vertex_3":
        return { x1, y1, x2, y2:clientY > y1 ? clientY : Math.abs(2 * y1 - clientY)};
      case "perim":
        return {x1, y1, x2:clientX, y2:clientY};
      default:
        return null; 
    }
  };
