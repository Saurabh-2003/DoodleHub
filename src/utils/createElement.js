import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

export const createElement = (id, x1, y1, x2, y2, type, color) => {
  switch (type) {
    case "line":
      return { id, x1, y1, x2, y2, coll:color, type, roughElement: generator.line(x1, y1, x2, y2, { stroke: color , strokeWidth:3}) };
    case "rectangle":
      return { id, x1, y1, x2, y2, type, coll:color, roughElement: generator.rectangle(x1, y1, x2 - x1, y2 - y1, { stroke: color, strokeWidth:3 }) };
    case "circle":
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return { id, x1, y1, x2, y2, type, coll:color, roughElement: generator.circle((x1+x2)/2 ,(y1+y2)/2, radius, { stroke: color , strokeWidth:3}) };
    case "polygon": 
      const vertices = [[x1, y1], [(x1 + x2) / 2, y2], [x2, y1], [(x1 + x2) / 2, y1 - (y2 - y1)]];
      return { id, x1, y1, x2, y2, type, coll:color, roughElement: generator.polygon(vertices, { stroke: color , strokeWidth:3}) }; // Fixed typo here
    case "pencil":
      return { id, type, coll:color, points: [{ x: x1, y: y1 }]};
    case "text":
      return { id, type, coll:color, x1, y1, x2, y2, text: "" };
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};