export const cursorForPosition = position => {
    switch (position) {
      case "tl":
      case "br":
      case "start":
      case "end":
        return "nwse-resize";
      case "tr":
      case "bl":
        return "nesw-resize";
      case "vertex_0":
      case "vertex_1":
      case "vertex_2":
      case "vertex_3":
        return "nesw-resize"; 
      case "perim":
        return "nesw-resize"; 
      default:
        return "move";
    }
  };