  import getStroke from "perfect-freehand";

  const getSvgPathFromStroke = stroke => {
    if (!stroke.length) return "";
  
    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ["M", ...stroke[0], "Q"]
    );
  
    d.push("Z");
    return d.join(" ");
  };

  
  export const drawElement = (roughCanvas, context, element, color) => {

    switch (element.type) {
      case "line":
      case "rectangle":
      case "circle":
      case "polygon": 
        roughCanvas.draw(element.roughElement);
        break;
      case "pencil":
          const stroke = getSvgPathFromStroke(getStroke(element.points));
          context.fillStyle = element.coll !== undefined ? element.coll : color;
          context.fill(new Path2D(stroke));
          break;        
      case "text":
        context.textBaseline = "top";
        context.font = "24px sans-serif";
        context.fillStyle = element.coll !== undefined ? element.coll : color;
        context.fillText(element.text, element.x1, element.y1);
        break;
      default:
        throw new Error(`Type not recognised: ${element.type}`);
    }
  };
